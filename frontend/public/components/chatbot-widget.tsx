"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageCircle, Send, X, Minimize2, Maximize2 } from "lucide-react"
import Image from "next/image"


export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi there! I'm Claim Saathi, your AI assistant. How can I help you with your insurance claims today?",
      image: "https://i.ibb.co/JFW8D5KV/claimsaathi-goodmood-happy.png",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // In a real implementation, this would call the Gemini API
    // For this mockup, we'll simulate a response
    setTimeout(() => {
      const responses = [
        {
          content:
            "I can help you file a new claim! Just provide some basic details about the incident and upload any relevant documentation. I'll guide you through the entire process.",
          role: "assistant",
          image: "https://i.ibb.co/JFW8D5KV/claimsaathi-goodmood-happy.png",
        },
        {
          content:
            "For blockchain-verified claims, we ensure that all your data is securely stored and every step of the verification process is transparent. Would you like to learn more about how our blockchain technology works?",
          role: "assistant",
          image: "https://i.ibb.co/8nHxb4zN/claimsaathi-snapping-winking.png",
        },
        {
          content:
            "I see you're interested in filing a health insurance claim. I can help you with that! Please provide your policy number and details about the medical treatment you received.",
          role: "assistant",
          image: "https://i.ibb.co/DgLw71WX/claimsaathi-happy-tooexcited-smilingwithopenmouth.png",
        },
      ]

      // Randomly select a response
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      setMessages((prev) => [...prev, randomResponse])
      setIsLoading(false)
    }, 1500)
  }

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-to-r from-[#fa6724] to-[#07a6ec] shadow-lg"
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </Button>
      )}

      {/* Chat Widget */}
      {isOpen && (
        <div
          className={`fixed right-6 bottom-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden transition-all duration-300 ease-in-out z-50 ${
            isMinimized ? "w-72 h-16" : "w-80 sm:w-96 h-[500px]"
          }`}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#fa6724] to-[#07a6ec] p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="relative h-8 w-8 rounded-full overflow-hidden bg-white">
                <Image
                  src="https://i.ibb.co/JFW8D5KV/claimsaathi-goodmood-happy.png"
                  alt="Claim Saathi"
                  width={32}
                  height={32}
                  className="object-cover"
                />
              </div>
              <h3 className="font-bold text-white">Claim Saathi</h3>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-white hover:bg-white/20"
                onClick={() => setIsMinimized(!isMinimized)}
              >
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-white hover:bg-white/20"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages */}
              <div className="p-4 h-[calc(500px-132px)] overflow-y-auto">
                {messages.map((message, index) => (
                  <div key={index} className={`flex mb-4 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    {message.role === "assistant" && (
                      <div className="relative h-8 w-8 rounded-full overflow-hidden mr-2 flex-shrink-0">
                        <Image
                          src={message.image || "/placeholder.svg"}
                          alt="Claim Saathi"
                          width={32}
                          height={32}
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div
                      className={`rounded-lg p-3 max-w-[80%] ${
                        message.role === "user" ? "bg-[#07a6ec] text-white" : "bg-gray-100 dark:bg-gray-700"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start mb-4">
                    <div className="relative h-8 w-8 rounded-full overflow-hidden mr-2 flex-shrink-0">
                      <Image
                        src="https://i.ibb.co/Z7MhTHj/claimsaathi-neutral-mildlyangry.png"
                        alt="Claim Saathi"
                        width={32}
                        height={32}
                        className="object-cover"
                      />
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                      <div className="flex gap-1">
                        <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                        <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <form onSubmit={handleSendMessage} className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1"
                    disabled={isLoading}
                  />
                  <Button
                    type="submit"
                    size="icon"
                    disabled={isLoading || !input.trim()}
                    className="bg-[#fa6724] hover:bg-[#e55613] text-white"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </>
          )}
        </div>
      )}
    </>
  )
}

