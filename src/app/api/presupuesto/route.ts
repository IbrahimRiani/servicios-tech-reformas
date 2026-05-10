import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest, NextResponse } from 'next/server'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

const SYSTEM_PROMPT = `Eres un Asesor Técnico Experto en Reformas y Construcción. Tu tono es profesional, calmado y experto.

No seas agobiante: Si te dicen 'Hola' o un saludo breve, responde educadamente presentándote y preguntando en qué proyecto puedes ayudar. NO intentes agendar una cita de inmediato ni presiones para dar un presupuesto si el usuario solo está explorando.

Expertise: Conoces precios de materiales en tiendas como Brico Depôt, Bricomart (Obramat) y Leroy Merlin. Úsalos como referencia para dar rangos de presupuesto realistas y coherentes con el mercado actual.

Análisis: Si envían una foto, analízala técnicamente (estado de paredes, metros cuadrados aproximados, dificultad del trabajo, posibles problemas видимых). Da consejos técnicos útiles.

Cierre: Solo ofrece agendar con un técnico si el usuario muestra un interés claro o después de haber dado una estimación útil. No seas pushy.

IMPORTANTE: Cuando respondas, incluye un JSON al final con este formato exacto:
{"servicio": "reforma|pintura|limpieza", "metrosCuadrados": numero, "estado": "bueno|regular|malo", "presupuestoMin": numero, "presupuestoMax": numero, "desglose": [{"item": "nombre", "precio": numero}], "recomendacion": "consejo breve", "plazoDias": numero}

Si el usuario solo dice hola o un saludo, NO incluyas el JSON, solo preséntate amigablemente. Solo incluye JSON cuando des una estimación de presupuesto.`

export async function POST(req: NextRequest) {
  try {
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
        temperature: 0.7,
        topP: 0.9,
        maxOutputTokens: 2048,
      }
    })

    let prompt = ''
    let media: any[] = []

    if (image) {
      const bytes = await image.arrayBuffer()
      const base64 = Buffer.from(bytes).toString('base64')
      
      prompt = `${SYSTEM_PROMPT}

El usuario ha enviado una imagen y dice: "${message || 'Quiero presupuestar este espacio'}"

Analiza la imagen técnicamente y proporciona tu evaluación + el JSON con el presupuesto.`

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

Responde de manera amable presentándote y preguntando en qué puedes ayudarle. No incluyas JSON.`
      } else {
        prompt = `${SYSTEM_PROMPT}

El usuario dice: "${message}"

Analiza la solicitud, detecta el tipo de servicio, estima metros cuadrados y proporciona tu estimación + el JSON con el presupuesto.`
      }
    }

    const result = await model.generateContent([
      { text: prompt },
      ...media
    ])

    const responseText = result.response.text()
    
    const jsonMatch = responseText.match(/\{[\s\S]*\}/)
    
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
      text: textResponse || 'He procesado tu solicitud. ¿Necesitas algo más?'
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