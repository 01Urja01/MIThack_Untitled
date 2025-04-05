"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Image
              src="https://i.ibb.co/DgLw71WX/claimsaathi-happy-tooexcited-smilingwithopenmouth.png"
              alt="Claim Saathi"
              width={80}
              height={80}
              className="rounded-full"
            />
          </div>
          <h2 className="text-2xl font-bold mb-2">Welcome to Swift Claim!</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            I'm Claim Saathi, your AI assistant. Let's get your insurance provider dashboard set up!
          </p>
          
          <div className="space-y-4 text-left mb-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Configure policy templates</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Set up blockchain integration</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Add team members</span>
            </div>
          </div>

          <Button 
            onClick={() => setIsOpen(false)}
            className="bg-gradient-to-r from-[#07a6ec] to-[#07c6ec] text-white"
          >
            Let's Get Started
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
} 