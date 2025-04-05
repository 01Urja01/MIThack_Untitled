"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

const loadingMessages = [
  {
    text: "Connecting securely...",
    image: "https://i.ibb.co/JFW8D5KV/claimsaathi-goodmood-happy.png"
  },
  {
    text: "Verifying credentials...",
    image: "https://i.ibb.co/8nHxb4zN/claimsaathi-snapping-winking.png"
  },
  {
    text: "Checking government database...",
    image: "https://i.ibb.co/XZP3h1bN/claimsaathi-neutral-firm.png"
  },
  {
    text: "Validating blockchain records...",
    image: "https://i.ibb.co/DgLw71WX/claimsaathi-happy-tooexcited-smilingwithopenmouth.png"
  },
  {
    text: "Syncing insurance data...",
    image: "https://i.ibb.co/99WsM9fP/claimsaathi-dancing-neutral.png"
  }
]

export function Loader() {
  const [currentMessage, setCurrentMessage] = useState(loadingMessages[0])
  const [isChanging, setIsChanging] = useState(false)

  useEffect(() => {
    let currentIndex = 0
    const interval = setInterval(() => {
      setIsChanging(true)
      setTimeout(() => {
        currentIndex = (currentIndex + 1) % loadingMessages.length
        setCurrentMessage(loadingMessages[currentIndex])
        setIsChanging(false)
      }, 300)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-md z-50 flex items-center justify-center">
      <div className="text-center relative p-8 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10">
        <div className="flex flex-col items-center gap-6">
          {/* Claim Saathi Avatar with Pulse Effect */}
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse"></div>
            <div 
              className={`transform transition-all duration-500 ease-out ${
                isChanging ? 'scale-90 opacity-0' : 'scale-100 opacity-100'
              }`}
            >
              <Image 
                src={currentMessage.image}
                alt="Claim Saathi"
                width={100}
                height={100}
                className="rounded-full bg-white/80 p-1"
              />
            </div>
          </div>

          {/* Minimal Progress Bar */}
          <div className="w-32 h-1 bg-primary/10 rounded-full overflow-hidden">
            <div className="h-full w-1/3 bg-primary rounded-full animate-loader"></div>
          </div>

          {/* Message */}
          <p 
            className={`text-primary/80 text-sm font-medium transition-all duration-500 ${
              isChanging ? 'opacity-0 transform -translate-y-2' : 'opacity-100 transform translate-y-0'
            }`}
          >
            {currentMessage.text}
          </p>

          {/* Simple Dots */}
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <div 
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-primary/50 animate-pulse"
                style={{ animationDelay: `${i * 150}ms` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 