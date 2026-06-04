import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit, getClientIP } from '@/lib/rateLimit'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

const SYSTEM_PROMPT = `Eres el Asesor Técnico de ReformasPro (Madrid Sur y Toledo).

REGLAS INQUEBRANTABLES — SON LEYES, NO SUGERENCIAS:

PROHIBIDO ABSOLUTAMENTE:
- Escribir más de 4 líneas de texto visible.
- Redactar párrafos de más de una frase.
- Añadir introducciones, conclusiones, resúmenes o consejos largos.
- Incluir texto DESPUÉS del JSON. El JSON debe ser la ÚLTIMA cosa de tu respuesta.
- Dar precios, rangos o estimaciones numéricas en euros.

FORMATO ÚNICO PERMITIDO — LITERALMENTE ESTE ESQUELETO, SIN AÑADIR NI QUITAR:

[Saludo de una línea terminado en punto.]

Diagnóstico técnico:
• [problema 1].
• [problema 2].
• [problema 3 como máximo].

Trabajo necesario:
• [tarea 1].
• [tarea 2].
• [tarea 3 como máximo].

{JSON}

REGLAS DE PUNTUACIÓN:
- Cada bullet TERMINA con punto final.
- La última línea de texto (antes del JSON) SIEMPRE termina con punto.
- No dejes líneas colgadas sin punto.

LÍMITE DE TOKENS DE SALIDA: tu respuesta completa (texto + JSON) NO debe superar 350 tokens. Si te acercas, corta inmediatamente y emite el JSON.

JSON OBLIGATORIO (una sola línea, sin texto alrededor, siempre al final):
{"servicio":"reforma"|"pintura"|"limpieza","metrosCuadrados":numero,"estado":"bueno"|"regular"|"malo","plazoDias":numero}

CASOS ESPECIALES:
- Si la foto NO es estancia habitable, responde SOLO esta línea (sin JSON):
"Disculpa, solo analizo fotos de interiores. Sube una foto de la estancia a reformar."

- Si el usuario solo saluda, responde SOLO:
"Hola, soy el asesor de ReformasPro. Sube una foto del espacio o dime qué necesitas."

EJEMPLO LITERAL DE RESPUESTA CORRECTA (copia este patrón):

Hola, analizo tu salón.

Diagnóstico técnico:
• Pintura desconchada en paredes y techo.
• Suelo de grés antiguo muy desgastado.
• Rodapiés sueltos o ausentes.

Trabajo necesario:
• Raspado y alisado de paredes.
• Pintura plástica blanca en mate.
• Sustitución de rodapiés en DM.

{"servicio":"reforma","metrosCuadrados":25,"estado":"regular","plazoDias":7}`

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIP(req)
    const rateCheck = checkRateLimit(ip)

    if (!rateCheck.allowed) {
      return NextResponse.json(
        { 
          error: 'Has alcanzado el límite de 15 consultas gratuitas por día. Para continuar con tu presupuesto, pulsa el botón de WhatsApp y habla directamente con nuestro equipo.',
          rateLimited: true,
          resetTime: new Date(rateCheck.resetTime).toISOString()
        },
        { status: 429 }
      )
    }

    const formData = await req.formData()
    
    const message = formData.get('message') as string
    const image = formData.get('image') as File | null

    if (!message && !image) {
      return NextResponse.json(
        { error: 'Se requiere un mensaje o imagen' },
        { status: 400 }
      )
    }

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      generationConfig: {
        temperature: 0.2,
        topP: 0.7,
        maxOutputTokens: 400,
        stopSequences: ['\n\n\n', 'En resumen', 'Por último', 'Para terminar'],
      }
    })

    let prompt = ''
    let media: any[] = []

    if (image) {
      const bytes = await image.arrayBuffer()
      const base64 = Buffer.from(bytes).toString('base64')
      
      prompt = `${SYSTEM_PROMPT}

El usuario envió una imagen y escribió: "${message || 'Quiero reformar este espacio'}"

Aplica la estructura fija. Termina inmediatamente después del JSON.`

      media.push({
        inlineData: {
          data: base64,
          mimeType: image.type || 'image/jpeg'
        }
      })
    } else {
      const isGreeting = /^(hola|buenos|días|buenas|saludos|hi|hello|que tal|qué tal)$/i.test(message.trim())
      
      if (isGreeting) {
        prompt = `${SYSTEM_PROMPT}

El usuario dice: "${message}"

Responde SOLO con la frase corta de saludo indicada. NO incluyas JSON.`
      } else {
        prompt = `${SYSTEM_PROMPT}

El usuario describe su proyecto: "${message}"

Genera el diagnóstico y trabajo necesario en formato lista, termina con el JSON.`
      }
    }

    const result = await model.generateContent([
      { text: prompt },
      ...media
    ])

    const responseText = result.response.text()
    
    const jsonMatch = responseText.match(/\{[\s\S]*?\}/)
    
    let budgetData = null
    let textResponse = responseText

    if (jsonMatch) {
      try {
        budgetData = JSON.parse(jsonMatch[0])
        textResponse = responseText.replace(jsonMatch[0], '').trim()
        const jsonEndIndex = responseText.indexOf(jsonMatch[0]) + jsonMatch[0].length
        if (jsonEndIndex < responseText.length) {
          const tail = responseText.substring(jsonEndIndex).trim()
          if (tail.length > 0) {
            console.warn('IA emitió texto tras el JSON, descartado:', tail.substring(0, 80))
          }
        }
      } catch (e) {
        console.warn('JSON malformado de Gemini:', e)
      }
    }

    if (textResponse && !/[.!?]$/.test(textResponse.trim())) {
      textResponse = textResponse.trim() + '.'
    }

    if (textResponse.length > 800) {
      const cut = textResponse.substring(0, 800)
      const lastPeriod = cut.lastIndexOf('.')
      textResponse = lastPeriod > 400 ? cut.substring(0, lastPeriod + 1) : cut + '...'
    }

    return NextResponse.json({
      success: true,
      data: budgetData,
      text: textResponse || 'He procesado tu solicitud. ¿Necesitas algo más?',
      remaining: rateCheck.remaining
    })

  } catch (error: any) {
    console.error('Error en API presupuesto:', error)
    
    return NextResponse.json(
      { 
        error: 'Error al procesar la solicitud',
        details: error.message 
      },
      { status: 500 }
    )
  }
}
