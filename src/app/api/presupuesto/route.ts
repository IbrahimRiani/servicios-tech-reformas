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

ATENCIÓN CRÍTICA — FORMATO DE TEXTO:
Entrega la respuesta única y exclusivamente en texto plano utilizando saltos de línea normales. Queda totalmente PROHIBIDO utilizar asteriscos (**), guiones (-), viñetas (•) o cualquier formato Markdown. Escribe con párrafos cortos y limpios.

OBJETIVO: Escribe un análisis técnico escueto pero profesional basándote en la foto o texto del usuario. Usa exactamente esta estructura de 3 bloques, separados ÚNICAMENTE por saltos de línea normales. Está prohibido usar guiones, asteriscos, números o viñetas.

Bloque 1 (Introducción):
¡Hola! Veo que tienes un proyecto muy interesante para renovar este espacio por completo.

Bloque 2 (Diagnóstico Técnico):
Escribe aquí 3 frases seguidas detallando lo que ves dañado o antiguo (ej: azulejos envejecidos, paredes con humedad o distribución desaprovechada). Cada frase debe terminar en punto y aparte con un salto de línea limpio.

Bloque 3 (Propuesta de Trabajo):
Escribe aquí 2 frases sobre los trabajos clave necesarios (ej: retirar revestimientos actuales, alisar superficies y aplicar pintura plástica lavable). Termina con un punto final.

CASOS ESPECIALES:
- Si la foto NO es estancia habitable, responde SOLO:
"Disculpa, solo analizo fotos de interiores. Sube una foto de la estancia que quieres reformar."

- Si el usuario solo saluda, responde SOLO:
"¡Hola! Soy el asesor técnico de ReformasPro. Sube una foto del espacio o dime qué reforma necesitas, y te echo una mano."

EJEMPLO LITERAL DE RESPUESTA CORRECTA:

¡Hola! Veo que tienes un proyecto muy interesante para renovar este salón por completo.

Las paredes presentan un gotelé muy marcado y多处 desconchones propios del desgaste de los años, sobre todo en las zonas próximas a las esquinas y detrás de los radiadores.
El suelo de gres original tiene piezas sueltas y las juntas ennegrecidas que conviene revisar antes de cualquier intervención.
La carpintería de madera está deshidratada y los rodapiés se han separado de la pared por movimientos estructurales normales de la vivienda.

Retiraremos los rodapiés y sanearemos las zonas dañadas aplicando masilla de nivelación de grano fino. Después aplicaremos dos manos de pintura plástica mate lavable de alta cubrición en el tono que elijas, con un acabado profesional que revalorizará la estancia.`

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
        temperature: 0.4,
        topP: 0.85,
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
