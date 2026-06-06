'use client'

import { useState, useRef, useEffect } from 'react'
import { Upload, Send, Bot, User, Loader2, MessageSquare } from 'lucide-react'
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
      content: '¡Hola! Soy tu asesor técnico. Cuéntame qué reforma necesitas.',
    },
  ])
  const [input, setInput] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const { closeModal } = usePricingModal()

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight
    }
  }, [messages, isAnalyzing])

  const handleImageUpload = () => {
    const inputEl = document.createElement('input')
    inputEl.type = 'file'
    inputEl.accept = 'image/*'
    inputEl.onchange = (e) => {
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
    inputEl.click()
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
      
      if (response.status === 429 || result.rateLimited) {
        setMessages((prev) => [
          ...prev,
          {
            role: 'bot',
            content: result.error || result.message || 'Has agotado tus 10 consultas gratuitas de hoy. Vuelve mañana o contacta con nosotros por WhatsApp para una valoración personalizada.',
            showButtons: true,
          },
        ])
        return
      }
      
      if (result && result.success && typeof result.text === 'string') {
        const fullText = result.text
        setMessages((prev) => [
          ...prev,
          {
            role: 'bot',
            content: fullText,
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
      setMessages((prev) => [
        ...prev,
        {
          role: 'bot',
          content: 'Error de conexión. Por favor, inténtalo de nuevo.',
          showButtons: true,
        },
      ])
    } finally {
      setIsAnalyzing(false)
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
    <div className="flex flex-col h-full w-full bg-white rounded-3xl overflow-hidden">
      <div className="px-4 py-3 border-b border-[#FF6600]/20 flex items-center gap-3 bg-gradient-to-r from-[#F5F5F5] to-white flex-shrink-0">
        <div className="w-10 h-10 bg-[#FF6600] flex items-center justify-center rounded-xl shadow-md">
          <MessageSquare className="w-5 h-5 text-white" strokeWidth={2.5} />
        </div>
        <div>
          <p className="font-extrabold text-[#111111] uppercase text-sm">Asesor Técnico</p>
          <p className="text-xs text-[#FF6600] font-bold uppercase tracking-wide">Presupuesto sin compromiso</p>
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
              className={`w-8 h-8 flex items-center justify-center flex-shrink-0 rounded-xl ${
                msg.role === 'bot'
                  ? 'bg-[#FF6600]'
                  : 'bg-[#111111]'
              }`}
            >
              {msg.role === 'bot' ? (
                <Bot className="w-4 h-4 text-white" strokeWidth={2.5} />
              ) : (
                <User className="w-4 h-4 text-white" strokeWidth={2.5} />
              )}
            </div>
            <div
              className={`min-w-0 max-w-[80%] p-3 text-sm leading-relaxed ${
                msg.role === 'bot'
                  ? 'bg-[#F5F5F5] text-[#111111] rounded-2xl rounded-tl-sm border border-[#d4d4d4]'
                  : 'bg-[#FF6600] text-white rounded-2xl rounded-tr-sm'
              }`}
            >
              {msg.image && (
                <div className="mb-2 rounded-xl overflow-hidden border border-[#d4d4d4]">
                  <Image
                    src={msg.image}
                    alt="Imagen subida"
                    width={250}
                    height={180}
                    className="w-full h-32 object-cover"
                  />
                </div>
              )}
              <pre className="whitespace-pre-wrap break-words font-sans m-0 p-0 bg-transparent">
                {msg.content}
              </pre>

              {msg.showButtons && (
                <div className="mt-3 space-y-2">
                  <a
                    href="https://wa.me/34644702250?text=Hola!%20He%20analizado%20mi%20reforma%20en%20la%20web%20y%20quiero%20agendar%20una%20visita"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-3 px-3 bg-[#25D366] text-white font-bold uppercase text-xs tracking-wide rounded-xl hover:bg-[#128C7E] transition-colors text-center shadow-md"
                  >
                    Agendar Visita (WhatsApp)
                  </a>
                  <a
                    href="tel:+34694059232"
                    className="block w-full py-3 px-3 bg-[#1a2942] text-white font-bold uppercase text-xs tracking-wide rounded-xl hover:bg-[#0f1a2e] transition-colors text-center shadow-md"
                  >
                    Llamar al Técnico
                  </a>
                  <button
                    onClick={handleConfirm}
                    className="block w-full py-3 px-3 bg-white border-2 border-[#111111] text-[#111111] font-bold uppercase text-xs tracking-wide rounded-xl hover:bg-[#111111] hover:text-white transition-colors text-center"
                  >
                    Solicitar Visita Técnica
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
        {isAnalyzing && (
          <div className="flex gap-2 w-full">
            <div className="w-8 h-8 bg-[#FF6600] flex items-center justify-center flex-shrink-0 rounded-xl">
              <Bot className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <div className="bg-[#F5F5F5] border border-[#d4d4d4] rounded-2xl rounded-tl-sm p-3">
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 text-[#FF6600] animate-spin" />
                <span className="text-[#111111] text-xs font-bold uppercase tracking-wide">Analizando proyecto...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-3 border-t border-[#d4d4d4] bg-white flex-shrink-0">
        <div className="flex gap-2">
          <button
            onClick={handleImageUpload}
            className="p-3 bg-[#F5F5F5] hover:bg-[#FF6600] hover:text-white transition-all duration-200 border border-[#d4d4d4] hover:border-[#FF6600] rounded-xl shadow-sm hover:shadow-md"
            title="Subir imagen"
          >
            <Upload className="w-5 h-5 text-[#111111]" strokeWidth={2.5} />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Describe tu proyecto..."
            className="flex-1 min-w-0 bg-[#F5F5F5] px-4 py-3 text-sm text-[#111111] placeholder-[#999] focus:outline-none focus:ring-2 focus:ring-[#FF6600] border border-transparent focus:border-[#FF6600] rounded-2xl"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isAnalyzing}
            className="p-3 bg-[#FF6600] text-white hover:bg-[#E65100] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl shadow-md hover:shadow-lg"
          >
            <Send className="w-5 h-5" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  )
}
