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

PROHIBIDO ABSOLUTAMENTE:
- Devolver JSON, bloques de código, listas de datos estructurados, ni ningún formato técnico. SOLO texto plano legible para el usuario.
- Incluir corchetes, llaves, comillas de código ni nada que parezca programación.
- Dar precios, rangos o cifras en euros (eso lo gestiona la web).
- Escribir párrafos largos de más de 3 líneas por bloque.
- Ser frío o telegráfico. Eres un asesor humano, no un bot.

FORMATO DE RESPUESTA — DEVUELVE SOLO Y EXCLUSIVAMENTE ESTE TEXTO PLANO, SIN NADA MÁS:

BLOQUE 1 — INTRODUCCIÓN CON GANCHO (2 líneas máximo):
Saluda con energía, reconoce el espacio que ves y muestra que entiendes el proyecto. Ej: "¡Hola! Veo que tienes un buen proyecto entre manos con esta cocina."

BLOQUE 2 — DIAGNÓSTICO TÉCNICO (3-4 líneas, empieza con "Diagnóstico técnico:"):
Describe lo que observas usando términos del sector: estado de paredes, tipo de suelo, azulejería, instalaciones, iluminación, distribución, acabados. Cada línea es una FRASE COMPLETA terminada en punto.

BLOQUE 3 — PROPUESTA DE MATERIALES Y SOLUCIÓN (2-3 líneas de párrafo breve, empieza con "La solución pasa por"):
Menciona qué materiales estándar de alta durabilidad harían falta (pintura plástica mate lavable, masilla de nivelación, suelo laminado AC5, azulejo de gres porcelánico, etc.). Explica brevemente en qué consiste el trabajo.

BLOQUE 4 — CIERRE COMERCIAL (2 líneas máximo, empieza con "Para darte un presupuesto real"):
Hila de forma natural hacia la conversión mencionando medición exacta, precios de almacén y mano de obra, y propuesta de visita técnica sin compromiso. Termina siempre con punto final.

IMPORTANTE: Tu respuesta SOLO contiene estos 4 bloques en texto plano. NO termines con llaves, corchetes, JSON, ni ningún símbolo técnico. La última línea es una frase normal terminada en punto.

CASOS ESPECIALES:
- Si la foto NO es estancia habitable, responde SOLO:
"Disculpa, solo analizo fotos de interiores. Sube una foto de la estancia que quieres reformar."

- Si el usuario solo saluda, responde SOLO:
"¡Hola! Soy el asesor técnico de ReformasPro. Sube una foto del espacio o dime qué reforma necesitas, y te echo una mano."

EJEMPLO LITERAL DE RESPUESTA CORRECTA (texto plano, sin JSON, sin corchetes):

¡Hola! Veo que tienes un buen proyecto para renovar esta cocina.

Diagnóstico técnico:
El mobiliario actual está muy envejecido y la distribución no aprovecha bien el espacio.
Los azulejos del frontal presentan juntas oscurecidas y alguna pieza suelta que conviene revisar.
El suelo de gres tiene piezas desportilladas y el rodapié está separado de la pared.
La iluminación general es escasa y el extractor parece insuficiente para uso intensivo.

La solución pasa por un mobiliario a medida con encimera de cuarzo, alicatado nuevo en gres porcelánico, suelo laminado AC5 resistente a la humedad, fontanería actualizada y pintura plástica mate lavable. Es una reforma de unos 7 a 10 días que revaloriza mucho la vivienda.

Para darte un presupuesto real y cerrado con precios de almacén y mano de obra, necesitamos hacer una medición exacta en el espacio. Te propongo que un técnico se pase sin compromiso para valorar la obra sobre el terreno.`

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

Aplica la estructura fija de 4 bloques.`

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

Responde SOLO con la frase corta de saludo indicada.`
      } else {
        prompt = `${SYSTEM_PROMPT}

El usuario describe su proyecto: "${message}"

Genera los 4 bloques en texto plano.`
      }
    }

    const result = await model.generateContent([
      { text: prompt },
      ...media
    ])

    const responseText = result.response.text()

    return NextResponse.json({
      success: true,
      text: responseText,
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
