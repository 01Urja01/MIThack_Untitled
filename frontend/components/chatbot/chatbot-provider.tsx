"use client"

import { createContext, useContext, ReactNode } from "react"
import ChatbotWidget from "./chatbot-widget"

const ChatbotContext = createContext({})

export function ChatbotProvider({ children }: { children: ReactNode }) {
  return (
    <ChatbotContext.Provider value={{}}>
      {children}
      <ChatbotWidget />
    </ChatbotContext.Provider>
  )
}

