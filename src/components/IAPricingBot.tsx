'use client'

import { useState, useRef, useEffect } from 'react'
import { Upload, Send, Bot, User, Sparkles, Calculator, Calendar, Loader2 } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { usePricingModal } from '@/context/PricingModalContext'

interface Message {
  role: 'bot' | 'user'
  content: string
  image?: string
  budget?: BudgetResult
  isConfirming?: boolean
}

interface BudgetResult {
  service: string
  metrosCuadrados: number
  estado: string
  presupuestoMin: number
  presupuestoMax: number
  desglose: { item: string; precio: number }[]
  recomendacion: string
  plazoDias: number
}

function formatBudgetResponse(data: any): BudgetResult | null {
  try {
    return {
      service: data.servicio || 'pintura',
      metrosCuadrados: data.metrosCuadrados || 50,
      estado: data.estado || 'regular',
      presupuestoMin: data.presupuestoMin || 500,
      presupuestoMax: data.presupuestoMax || 1500,
      desglose: data.desglose || [],
      recomendacion: data.recomendacion || '',
      plazoDias: data.plazoDias || 7,
    }
  } catch {
    return null
  }
}

const COBALT_BLUE = '#1d4ed8'

export default function IAPricingBot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'bot',
      content: '¡Hola! 👋 Soy tu asesor técnico en reformas. Estoy aquí para ayudarte a entender qué necesitas y darte una estimación clara. ¿En qué puedo ayudarte hoy?',
    },
  ])
  const [input, setInput] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const { closeModal } = usePricingModal()

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleImageUpload = async () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const imageData = e.target?.result as string
          setMessages((prev) => [
            ...prev,
            {
              role: 'user',
              content: 'He subido una foto del espacio para que lo analices',
              image: imageData,
            },
          ])
          sendToAPI('', file)
        }
        reader.readAsDataURL(file)
      }
    }
    input.click()
  }

  const sendToAPI = async (text: string, imageFile?: File | null) => {
    setIsAnalyzing(true)
    
    try {
      const formData = new FormData()
      if (text) formData.append('message', text)
      if (imageFile) formData.append('image', imageFile)

      const response = await fetch('/api/presupuesto', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()
      setIsAnalyzing(false)

      if (result.success) {
        if (result.data) {
          const budget = formatBudgetResponse(result.data)
          
          if (budget) {
            let responseContent = result.text || ''

            if (budget.recomendacion) {
              responseContent += `<br/><br/>🎯 <strong>Mi análisis técnico:</strong> ${budget.recomendacion}`
            }

            responseContent += `<br/><br/>
📐 <strong style="color:${COBALT_BLUE}">Superficie:</strong> ${budget.metrosCuadrados} m²<br/>
🏠 <strong style="color:${COBALT_BLUE}">Estado:</strong> ${budget.estado}<br/>
⏱️ <strong style="color:${COBALT_BLUE}">Plazo estimado:</strong> ${budget.plazoDias} días<br/><br/>
💰 <strong style="color:${COBALT_BLUE}">PRESUPUESTO:</strong> <span class="text-2xl font-bold" style="color:${COBALT_BLUE}">${budget.presupuestoMin}€ - ${budget.presupuestoMax}€</span><br/><br/>`

            if (budget.desglose.length > 0) {
              responseContent += `<strong>Desglose:</strong><br/>`
              budget.desglose.forEach(b => {
                responseContent += `<div class="flex justify-between py-1"><span class="text-gray-400">${b.item}</span><span style="color:${COBALT_BLUE}">${b.precio}€</span></div>`
              })
            }

            responseContent += `<div class="mt-4 p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
<strong style="color:${COBALT_BLUE}">✓</strong> Materiales de primera calidad<br/>
<strong style="color:${COBALT_BLUE}">✓</strong> Garantía de 5 años<br/>
<strong style="color:${COBALT_BLUE}">✓</strong> Sin compromiso
</div>`

            setMessages((prev) => [
              ...prev,
              {
                role: 'bot',
                content: responseContent,
                budget,
                isConfirming: true,
              },
            ])
          } else {
            setMessages((prev) => [
              ...prev,
              {
                role: 'bot',
                content: result.text || 'He procesado tu solicitud. ¿Podrías darme más detalles sobre el espacio (metros cuadrados, tipo de trabajo)?',
              },
            ])
          }
        } else {
          setMessages((prev) => [
            ...prev,
            {
              role: 'bot',
              content: result.text || 'Perfecto. ¿En qué proyecto puedo ayudarte? Cuéntame más sobre lo que necesitas.',
            },
          ])
        }
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: 'bot',
            content: 'Hubo un problema al procesar tu solicitud. Por favor, inténtalo de nuevo o escríbenos por WhatsApp.',
          },
        ])
      }
    } catch (error) {
      setIsAnalyzing(false)
      setMessages((prev) => [
        ...prev,
        {
          role: 'bot',
          content: 'Error de conexión. Por favor, inténtalo de nuevo.',
        },
      ])
    }
  }

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage = input.trim()
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }])
    setInput('')

    sendToAPI(userMessage)
  }

  const handleConfirm = () => {
    closeModal()
    const contactUrl = new URL('/contacto', window.location.origin)
    contactUrl.searchParams.set('service', 'budget-confirmed')
    router.push(contactUrl.toString())
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-white/10 flex items-center gap-3 bg-gradient-to-r from-blue-900/20 to-transparent">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <div>
          <p className="font-semibold text-white text-lg">Asesor IA</p>
          <p className="text-xs text-blue-400">Gemini 2.5 • Te ayudo sin presión</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                msg.role === 'bot' 
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-400' 
                  : 'bg-white/10'
              }`}
            >
              {msg.role === 'bot' ? (
                <Bot className="w-5 h-5 text-white" />
              ) : (
                <User className="w-5 h-5 text-white" />
              )}
            </div>
            <div
              className={`max-w-[85%] p-5 rounded-2xl leading-relaxed ${
                msg.role === 'bot'
                  ? 'bg-white/5 text-gray-200 border border-white/5'
                  : 'bg-gradient-to-r from-blue-600/20 to-cyan-400/20 text-white border border-blue-500/20'
              }`}
            >
              {msg.image && (
                <div className="mb-3 rounded-lg overflow-hidden">
                  <Image
                    src={msg.image}
                    alt="Imagen subida"
                    width={250}
                    height={180}
                    className="w-full h-36 object-cover rounded-lg"
                  />
                </div>
              )}
              <div dangerouslySetInnerHTML={{ __html: msg.content.replace(/\n/g, '<br/>') }} />
              
              {msg.budget && msg.isConfirming && (
                <button
                  onClick={handleConfirm}
                  className="mt-4 w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-400 text-white font-bold rounded-xl hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
                >
                  <Calendar className="w-5 h-5" />
                  Confirmar y Agendar
                </button>
              )}
            </div>
          </div>
        ))}
        {isAnalyzing && (
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="bg-white/5 p-5 rounded-2xl border border-white/5">
              <div className="flex items-center gap-3">
                <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
                <span className="text-blue-400">Analizando tu solicitud...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-white/10 bg-gradient-to-r from-blue-900/10 to-transparent">
        <div className="flex gap-3">
          <button
            onClick={handleImageUpload}
            className="p-4 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
            title="Subir imagen"
          >
            <Upload className="w-5 h-5 text-gray-400" />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Describe tu proyecto..."
            className="flex-1 bg-white/5 rounded-2xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-white/10"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isAnalyzing}
            className="p-4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 text-white hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}