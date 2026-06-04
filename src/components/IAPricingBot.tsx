'use client'

import { useState, useRef, useEffect } from 'react'
import { Upload, Send, Bot, User, Sparkles, Loader2 } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { usePricingModal } from '@/context/PricingModalContext'

interface Message {
  role: 'bot' | 'user'
  content: string
  image?: string
  showButtons?: boolean
}

export default function IAPricingBot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'bot',
      content: '¡Hola! 👋 Soy tu asesor técnico en reformas. ¿En qué puedo ayudarte hoy?',
    },
  ])
  const [input, setInput] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const { closeModal } = usePricingModal()

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight
    }
  }, [messages, isAnalyzing])

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
        let responseContent = result.text || ''

        if (result.data) {
          const data = result.data
          responseContent += `<br/><br/>
📐 <strong>Superficie estimada:</strong> ${data.metrosCuadrados || '?'} m²<br/>
🏠 <strong>Estado detectado:</strong> ${data.estado || 'por evaluar'}<br/>
⏱️ <strong>Plazo estimado de obra:</strong> ${data.plazoDias || '?'} días<br/><br/>`
        }

        responseContent += `<p class="text-gray-600 text-sm mt-3"><em>He analizado los materiales y el trabajo necesario, pero para darte un presupuesto real y cerrado, necesito que hables con nuestro equipo para fijar una visita técnica sin compromiso.</em></p>`

        setMessages((prev) => [
          ...prev,
          {
            role: 'bot',
            content: responseContent,
            showButtons: true,
          },
        ])
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: 'bot',
            content: 'Hubo un problema. Por favor, inténtalo de nuevo o escríbenos por WhatsApp.',
            showButtons: true,
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
          showButtons: true,
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
    <div className="flex flex-col h-full w-full bg-white">
      <div className="px-4 py-3 border-b border-gray-200 flex items-center gap-3 bg-gradient-to-r from-orange-50 to-white flex-shrink-0">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="font-semibold text-gray-900">Asesor IA</p>
          <p className="text-xs text-orange-600">Te ayudo sin compromiso</p>
        </div>
      </div>

      <div 
        ref={scrollContainerRef}
        className="chat-scroll flex-1 min-h-0 p-4 space-y-4"
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex gap-2 w-full ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                msg.role === 'bot' 
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600' 
                  : 'bg-gray-200'
              }`}
            >
              {msg.role === 'bot' ? (
                <Bot className="w-4 h-4 text-white" />
              ) : (
                <User className="w-4 h-4 text-gray-700" />
              )}
            </div>
            <div
              className={`min-w-0 max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'bot'
                  ? 'bg-gray-100 text-gray-800'
                  : 'bg-orange-500 text-white'
              }`}
            >
              {msg.image && (
                <div className="mb-2 rounded-lg overflow-hidden">
                  <Image
                    src={msg.image}
                    alt="Imagen subida"
                    width={250}
                    height={180}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                </div>
              )}
              <div className="break-words" dangerouslySetInnerHTML={{ __html: msg.content.replace(/\n/g, '<br/>') }} />
              
              {msg.showButtons && (
                <div className="mt-3 space-y-2">
                  <a
                    href="https://wa.me/34644702250?text=Hola!%20He%20analizado%20mi%20reforma%20en%20la%20web%20y%20quiero%20agendar%20una%20visita"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-3 px-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors text-center text-sm"
                  >
                    📩 Agendar Visita (WhatsApp)
                  </a>
                  <a
                    href="tel:+34694059232"
                    className="block w-full py-3 px-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-center text-sm"
                  >
                    📞 Llamar al Técnico
                  </a>
                  <button
                    onClick={handleConfirm}
                    className="block w-full py-3 px-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors text-center text-sm"
                  >
                    📋 Solicitar Visita Técnica
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
        {isAnalyzing && (
          <div className="flex gap-2 w-full">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-gray-100 p-3 rounded-2xl">
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 text-orange-600 animate-spin" />
                <span className="text-orange-600 text-sm">Analizando...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-3 border-t border-gray-200 bg-gray-50 flex-shrink-0">
        <div className="flex gap-2">
          <button
            onClick={handleImageUpload}
            className="p-3 rounded-full bg-white hover:bg-gray-100 transition-colors border border-gray-200"
            title="Subir imagen"
          >
            <Upload className="w-5 h-5 text-gray-600" />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Describe tu proyecto..."
            className="flex-1 min-w-0 bg-white rounded-full px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 border border-gray-200"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isAnalyzing}
            className="p-3 rounded-full bg-orange-500 text-white hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}