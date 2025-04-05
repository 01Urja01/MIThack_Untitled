"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, X, Mic, Maximize2, Minimize2, Brain } from "lucide-react"
import { GoogleGenerativeAI } from "@google/generative-ai"

// Initialize Gemini API
const genAI = new GoogleGenerativeAI("AIzaSyD7Lo4tZk7V3iwZ0XsutrjZEEwYqqVBr40")

// Global chat history array
let chatHistory: { role: 'user' | 'chatbot'; content: string }[] = [];

const SYSTEM_PROMPT = `You are Claim Saathi, an AI assistant for Swift Claim - an insurance claims processing platform.

Your personality:
- Friendly and empathetic
- Professional but approachable
- Expert in insurance claims
- Uses simple language, avoiding jargon
- Keeps responses concise (2-3 sentences max)

Your capabilities:
- Guide users through claim filing process
- Explain insurance terms simply
- Check claim status
- Provide policy information
- Help with document requirements
- Offer claim processing estimates

When responding:
1. Be empathetic to user concerns
2. Give clear, actionable steps
3. Use positive language
4. Maintain a helpful tone
5. If unsure, ask for clarification

Current conversation context: Insurance claims assistance`

// Claim Saathi moods with corresponding images
const MOODS = {
  happy: "https://i.ibb.co/JFW8D5KV/claimsaathi-goodmood-happy.png",
  excited: "https://i.ibb.co/DgLw71WX/claimsaathi-happy-tooexcited-smilingwithopenmouth.png",
  neutral: "https://i.ibb.co/XZP3h1bN/claimsaathi-neutral-firm.png",
  angry: "https://i.ibb.co/ZRq6hPFn/claimsaathi-angry-shouting.png",
  dancing: "https://i.ibb.co/99WsM9fP/claimsaathi-dancing-neutral.png",
  winking: "https://i.ibb.co/8nHxb4zN/claimsaathi-snapping-winking.png",
  confused: "https://i.ibb.co/ymBdvNdQ/claimsaathi-closedfist-shouting-confused.png",
  grumpy: "https://i.ibb.co/xSV49vpx/claimsaathi-grin-grumpy.png"
}

type Message = {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
  mood?: keyof typeof MOODS
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [message, setMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hi there! I'm Claim Saathi, your AI assistant. How can I help you with your insurance claims today?",
      sender: "bot",
      timestamp: new Date(),
      mood: "happy"
    }
  ])

  // Auto scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const getMoodFromContent = (content: string): keyof typeof MOODS => {
    const lowerContent = content.toLowerCase()
    if (lowerContent.includes("sorry") || lowerContent.includes("unfortunately")) return "grumpy"
    if (lowerContent.includes("great") || lowerContent.includes("approved")) return "excited"
    if (lowerContent.includes("help") || lowerContent.includes("guide")) return "winking"
    if (lowerContent.includes("error") || lowerContent.includes("invalid")) return "angry"
    if (lowerContent.includes("processing") || lowerContent.includes("checking")) return "neutral"
    if (lowerContent.includes("success") || lowerContent.includes("completed")) return "dancing"
    return "happy"
  }

  // Function to process chat messages with context
  const processChatMessage = async (newMessage: string) => {
    // Construct the context string by joining previous messages
    let contextString = "";
    for (const msg of chatHistory) {
      contextString += `${msg.role}: ${msg.content}\n`;
    }

    // Prepend the context to the new message
    const messageWithContext = contextString + `user: ${newMessage}`;
    console.log("Full message with context:", messageWithContext); // For debugging

    return await generateResponse(messageWithContext);
  }

  const generateResponse = async (messageWithContext: string) => {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })
      
      const prompt = `${SYSTEM_PROMPT}\n\n${messageWithContext}\n\nClaim Saathi:`

      const result = await model.generateContent(prompt)
      const text = result.response.text()
      console.log("Gemini Response:", text) // Debug log
      
      // Add bot message to chat history
      chatHistory.push({ role: 'chatbot', content: text });

      return {
        content: text,
        mood: getMoodFromContent(text)
      }
    } catch (error) {
      console.error("Error generating response:", error)
      const errorMessage = "I'm having trouble connecting right now. Please try again in a moment.";
      chatHistory.push({ role: 'chatbot', content: errorMessage });
      return {
        content: errorMessage,
        mood: "confused" as const
      }
    }
  }

  const handleSendMessage = async () => {
    if (!message.trim()) return

    // Add user message to chat history
    chatHistory.push({ role: 'user', content: message });

    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: "user",
      timestamp: new Date()
    }

    setMessages((prev) => [...prev, userMessage])
    setMessage("")
    setIsTyping(true)

    // Process message with context and generate response
    const response = await processChatMessage(message)
    
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: response.content,
      sender: "bot",
      timestamp: new Date(),
      mood: response.mood
    }

    setMessages((prev) => [...prev, botMessage])
    setIsTyping(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 h-14 w-14 rounded-full bg-[#07a6ec] hover:bg-[#0696d7] shadow-lg"
      >
        <Brain className="h-6 w-6" />
      </Button>
    )
  }

  return (
    <div
      className={`fixed bottom-4 right-4 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 ${
        isExpanded ? "w-[480px] h-[600px]" : "w-[380px] h-[500px]"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#07a6ec] to-[#fa6724] text-white">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Image
              src="https://i.ibb.co/5Xn2hrY3/logo-white-bg.png"
              alt="Swift Claim"
              width={40}
              height={40}
              className="rounded-xl"
            />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Claim Saathi</h3>
            <p className="text-xs text-white/80">AI Insurance Assistant</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
            className="hover:bg-white/10 text-white"
          >
            {isExpanded ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="hover:bg-white/10 text-white"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Chat Messages */}
      <ScrollArea ref={scrollRef} className="flex-1 p-4 h-[calc(100%-8rem)]">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                msg.sender === "user" ? "flex-row-reverse" : ""
              }`}
            >
              {msg.sender === "bot" && (
                <div className="relative">
                  <Image
                    src={MOODS[msg.mood || "happy"]}
                    alt="Claim Saathi"
                    width={40}
                    height={40}
                    className="rounded-full ring-2 ring-white"
                  />
                  <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-green-400 rounded-full" />
                </div>
              )}
              <div
                className={`rounded-2xl px-4 py-2.5 max-w-[80%] ${
                  msg.sender === "user"
                    ? "bg-gradient-to-r from-[#07a6ec] to-[#0696d7] text-white"
                    : "bg-gray-100 dark:bg-gray-700"
                }`}
              >
                <p className="text-sm leading-relaxed">{msg.content}</p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex items-center gap-2">
              <Image
                src={MOODS.neutral}
                alt="Claim Saathi"
                width={40}
                height={40}
                className="rounded-full ring-2 ring-white"
              />
              <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl px-4 py-2.5">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-100" />
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-200" />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-4 border-t dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask Claim Saathi anything..."
            className="flex-1 bg-gray-100 dark:bg-gray-700 border-0 focus-visible:ring-1 focus-visible:ring-[#07a6ec]"
          />
          <Button
            onClick={handleSendMessage}
            className="bg-gradient-to-r from-[#07a6ec] to-[#0696d7] hover:opacity-90"
            size="icon"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Powered by AI & Blockchain • Responses in seconds
        </p>
      </div>
    </div>
  )
}

