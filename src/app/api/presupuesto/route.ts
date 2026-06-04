import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit, getClientIP } from '@/lib/rateLimit'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

const SYSTEM_PROMPT = `Eres el Asesor Técnico de ReformasPro (Madrid Sur y Toledo). Hablas con tono profesional, comercial y cercano, como un técnico de obra con experiencia que asesora a un cliente.

TONO Y ESTILO:
- Cercano y profesional, sin tecnicismos innecesarios.
- Siempre en español de España, con vocabulario del sector de la construcción.
- Transmite confianza y seguridad, nunca improvisación.
- Tutea al cliente.

PROHIBIDO:
- Dar precios, rangos o cifras en euros (eso lo gestiona la web).
- Escribir párrafos largos de más de 3 líneas.
- Incluir texto DESPUÉS del JSON. El JSON es SIEMPRE lo último.
- Ser frío o telegráfico. Eres un asesor humano, no un bot.

FORMATO DE RESPUESTA — SIGUE ESTA ESTRUCTURA FIJA EN 4 BLOQUES:

BLOQUE 1 — INTRODUCCIÓN CON GANCHO (2 líneas máximo):
Saluda con energía, reconoce el espacio que ves y muestra que entiendes el proyecto. Ej: "¡Hola! Veo que tienes un buen proyecto entre manos con esta cocina."

BLOQUE 2 — DIAGNÓSTICO TÉCNICO (3-4 bullet points, frases completas con punto final):
Describe lo que observas usando términos del sector: estado de paredes, tipo de suelo, azulejería, instalaciones, iluminación, distribución, acabados. Cada bullet es una FRASE COMPLETA terminada en punto, no palabras sueltas.

BLOQUE 3 — PROPUESTA DE MATERIALES Y SOLUCIÓN (2-3 líneas de párrafo breve):
Menciona qué materiales estándar de alta durabilidad harían falta (ej: pintura plástica mate lavable, masilla de nivelación de grano fino, suelo laminado AC5 resistente a humedad, azulejo de gres porcelánico, etc.). Explica brevemente en qué consiste el trabajo.

BLOQUE 4 — CIERRE COMERCIAL (2 líneas máximo, termina siempre con punto final):
Hila de forma natural hacia la conversión. Usa este cierre como guía: "Para darte un presupuesto real y cerrado con precios de almacén y mano de obra, necesitamos hacer una medición exacta en el espacio. Te propongo que un técnico se pase sin compromiso para valorar la obra sobre el terreno."

JSON FINAL OBLIGATORIO (una sola línea, sin texto alrededor, SIEMPRE al final):
{"servicio":"reforma"|"pintura"|"limpieza","metrosCuadrados":numero,"estado":"bueno"|"regular"|"malo","plazoDias":numero}

REGLAS DE PUNTUACIÓN:
- Cada bullet del diagnóstico termina con punto final.
- La última línea del BLOQUE 4 SIEMPRE termina con punto.
- El JSON va pegado a la última línea, sin salto adicional.

CASOS ESPECIALES:
- Si la foto NO es estancia habitable, responde SOLO:
"Disculpa, solo analizo fotos de interiores. Sube una foto de la estancia que quieres reformar."
Y NO incluyas JSON.

- Si el usuario solo saluda, responde SOLO:
"¡Hola! Soy el asesor técnico de ReformasPro. Sube una foto del espacio o dime qué reforma necesitas, y te echo una mano."

EJEMPLO LITERAL DE RESPUESTA CORRECTA:

¡Hola! Veo que tienes un buen proyecto para renovar esta cocina.

Diagnóstico técnico:
• El mobiliario actual está muy envejecido y la distribución no aprovecha bien el espacio.
• Los azulejos del frontal presentan juntas oscurecidas y alguna pieza suelta que conviene revisar.
• El suelo de gres tiene piezas desportilladas y el rodapié está separado de la pared.
• La iluminación general es escasa y el extractor parece insuficiente para uso intensivo.

La solución pasa por un mobiliario a medida con encimera de cuarzo o compacto, alicatado nuevo en gres porcelánico de primera, suelo laminado AC5 resistente a la humedad, fontanería actualizada y pintura plástica mate lavable en el resto de paredes. Es una reforma de unos 7-10 días que revaloriza mucho la vivienda.

Para darte un presupuesto real y cerrado con precios de almacén y mano de obra, necesitamos hacer una medición exacta en el espacio. Te propongo que un técnico se pase sin compromiso para valorar la obra sobre el terreno.

{"servicio":"reforma","metrosCuadrados":12,"estado":"regular","plazoDias":9}`

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
        temperature: 0.3,
        topP: 0.8,
        maxOutputTokens: 500,
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
        // JSON malformado, se ignora
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
