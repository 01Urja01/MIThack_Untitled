"use client"

import type { ReactNode } from "react"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import DashboardSidebar from "@/components/dashboard/dashboard-sidebar"
import ChatbotWidget from "@/components/chatbot/chatbot-widget"
import { Brain, Shield } from "lucide-react"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-background to-background/95">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Content */}
      <div className="flex-1">
        {/* Top Bar with Feature Indicators */}
        <div className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center justify-between border-b px-6 py-3">
            {/* Left side - Header */}
            <DashboardHeader />

            {/* Right side - Feature Indicators */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary">
                <Brain className="h-4 w-4" />
                <span className="text-xs font-medium hidden sm:inline">AI Powered</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 text-secondary">
                <Shield className="h-4 w-4" />
                <span className="text-xs font-medium hidden sm:inline">Blockchain Secured</span>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="p-6">
          <div className="relative">
            {/* AI & Blockchain Decorative Elements */}
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary/5 rounded-full blur-3xl" />
            
            {/* Main Content */}
            <div className="relative">{children}</div>
          </div>
        </main>

        {/* Chatbot Widget */}
        <ChatbotWidget />
      </div>
    </div>
  )
}

