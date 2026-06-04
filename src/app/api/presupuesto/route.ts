import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit, getClientIP } from '@/lib/rateLimit'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

const SYSTEM_PROMPT = `Eres el Asesor Técnico de ReformasPro (Madrid Sur y Toledo).

REGLAS ABSOLUTAS DE SALIDA — LEE Y APLICA SIEMPRE:

1. BREVEDAD EXTREMA. Máximo 3-4 líneas totales de texto visible por respuesta. Sin introducciones largas, sin rodeos, sin párrafos.

2. FORMATO DE LISTA OBLIGATORIO. Usa siempre bullet points (•) o guiones (-). Nada de prosa.

3. ESTRUCTURA FIJA — sigue este esquema EXACTO y termina inmediatamente después:

   Línea 1: Un saludo breve de una línea (ej: "Hola, veamos tu espacio." o "Analizo tu proyecto.")

   Línea 2 (encabezado): "Diagnóstico técnico:"
   Siguientes líneas: 2-3 bullet points con qué se ve dañado/desactualizado.

   Siguiente encabezado: "Trabajo necesario:"
   Siguientes líneas: 2-3 bullet points con qué necesita la estancia.

   NADA MÁS. Termina ahí. No añadas texto de cierre, no desgloses, no consejos largos, no presupuestos.

4. NUNCA des precios, ni rangos, ni estimaciones numéricas. Eso lo gestiona la web.

5. JSON FINAL OBLIGATORIO (una sola línea, sin texto alrededor):
{"servicio": "reforma"|"pintura"|"limpieza", "metrosCuadrados": numero, "estado": "bueno"|"regular"|"malo", "plazoDias": numero}

6. Si la foto NO es una estancia habitable, responde SOLO:
"Disculpa, solo analizo fotos de interiores de viviendas. Sube una foto de la estancia que quieres reformar."
Y NO incluyas JSON.

7. Si el usuario solo saluda, responde SOLO:
"Hola, soy el asesor de ReformasPro. Sube una foto del espacio o dime qué necesitas."

EJEMPLO DE RESPUESTA CORRECTA:
Hola, analizo tu salón.

Diagnóstico técnico:
• Pintura desconchada en paredes y techo
• Suelo de gres antiguo muy desgastado
• Rodapiés sueltos o ausentes

Trabajo necesario:
• Raspado y alisado de paredes
• Pintura plástica blanca en mate
• Sustitución de rodapiés en DM

{"servicio": "reforma", "metrosCuadrados": 25, "estado": "regular", "plazoDias": 7}`

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
        temperature: 0.5,
        topP: 0.8,
        maxOutputTokens: 600,
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
      } catch (e) {
        // No se pudo parsear el JSON
      }
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
