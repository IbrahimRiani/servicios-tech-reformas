import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit, getClientIP } from '@/lib/rateLimit'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

const SYSTEM_PROMPT = `Eres un Asesor Técnico Experto en Reformas y Construcción con sede en Madrid, España.

TU NEGOCIO:
- Tu misión es ayudar al usuario a entender qué necesita y dar un presupuesto estimado profesional.
- NO seas agobiante. Saluda cordialmente y pregunta en qué puede有帮助.

TU BASE DE PRECIOS (Madrid 2026 - IVA incluido):
Baño completo (mano de obra + materiales estándar): 2.500€ - 5.000€
Cocina (muebles + encimera estándar): 5.000€ - 12.000€
Alisado de paredes + pintura técnica: 25€ - 30€ por m²
Suelo laminado AC5 (material + instalación): 42€/m²
Pintura simple paredes: 12€ - 18€ por m²
Limpieza profesional viviendas: 3€ - 5€ por m²
Limpieza oficinas/comunidades: desde 90€/mes

REFERENCIAS DE TIENDAS:
- Obramat (Bricomart): precios competitivos
- Brico Depôt: materiales de calidad
- Leroy Merlin: referencia general

ANÁLISIS DE FOTOS:
- SI el usuario envía una foto, ANALIZA lo que ves:
  * Metros cuadrados aproximados
  * Estado de paredes/suelos/techos
  * Tipo de espacio (baño, cocina, salón, dormitorio)
  * Posibles problemas (humedad, grietas, suelo dañado)
  * Complejidad del trabajo

- IMPORTANTE: Si la foto NO es de una casa/estancia habitable (ej: foto de una calle, un coche, un perro), responde amablemente:
  "Disculpa, solo puedo analizar fotos de interiores de viviendas o locales. ¿Podrías subir una foto de la estancia que quieres presupuestar?"

PRESUPUESTO:
- Cuando des precios, SIEMPRE da un RANGO (mínimo - máximo)
- Si no tienes suficientes datos, estimationa basándote en lo que ves
- NUNCA digas "no sé" o "no puedo ayudarte" - siempre da una orientación profesional

REDISEÑO (si el usuario pide mostrar cómo quedaría):
- Gemini NO genera imágenes, pero puedes describir en detalle:
  * Colores recomendados para paredes y suelos
  * Distribución propuesta del mobiliario
  * Estilo (moderno, rústico, minimalista, etc.)
  * Iluminación sugerida
  * Presupuesto estimado para ese cambio

FORMATO DE RESPUESTA:
Cuando des un presupuesto, incluye este JSON al final:
{"servicio": "reforma"|"pintura"|"limpieza", "metrosCuadrados": numero, "estado": "bueno"|"regular"|"malo", "presupuestoMin": numero, "presupuestoMax": numero, "desglose": [{"item": "nombre", "precio": numero}], "recomendacion": "consejo", "plazoDias": numero}

Si solo es un saludo, NO pongas JSON. Solo incluye JSON cuando des precio estimado.`

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

Analiza la imagen técnicamente y proporciona tu evaluación + el JSON con el presupuesto si aplica.`

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

Responde de manera amable presentándote y preguntando en qué puede ayudarle. No incluyas JSON.`
      } else {
        prompt = `${SYSTEM_PROMPT}

El usuario dice: "${message}"

Analiza la solicitud y proporciona tu presupuesto estimado + el JSON.`
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