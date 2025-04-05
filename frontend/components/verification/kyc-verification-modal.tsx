"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog"
import { Loader2, Shield, FileText, CheckCircle } from "lucide-react"

export function KYCVerificationModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState(1)
  const [isVerifying, setIsVerifying] = useState(false)
  const [formData, setFormData] = useState({
    aadhaar: "",
    abha: "",
  })

  const handleVerifyAadhaar = async () => {
    setIsVerifying(true)
    // Simulate Aadhaar verification
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsVerifying(false)
    setStep(2)
  }

  const handleVerifyABHA = async () => {
    setIsVerifying(true)
    // Simulate ABHA verification and health record fetching
    await new Promise(resolve => setTimeout(resolve, 3000))
    setIsVerifying(false)
    setStep(3)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Verify Your Identity</DialogTitle>
          <DialogDescription>
            Complete your verification to access all features
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                <div className="h-12 w-12 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
                  <Image
                    src="https://i.ibb.co/8nHxb4zN/claimsaathi-snapping-winking.png"
                    alt="Claim Saathi"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </div>
                <p className="text-sm">
                  Let's verify your Aadhaar first! This helps us ensure secure and quick claim processing.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="aadhaar">Aadhaar Number</Label>
                <Input
                  id="aadhaar"
                  placeholder="XXXX XXXX XXXX"
                  value={formData.aadhaar}
                  onChange={(e) => setFormData({ ...formData, aadhaar: e.target.value })}
                  maxLength={12}
                />
              </div>

              <Button 
                className="w-full bg-[#fa6724] hover:bg-[#e55613]"
                onClick={handleVerifyAadhaar}
                disabled={formData.aadhaar.length !== 12 || isVerifying}
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying Aadhaar...
                  </>
                ) : (
                  "Verify Aadhaar"
                )}
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <Image
                    src="https://i.ibb.co/DgLw71WX/claimsaathi-happy-tooexcited-smilingwithopenmouth.png"
                    alt="Claim Saathi"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </div>
                <p className="text-sm">
                  Great! Now let's link your ABHA number to fetch your health records securely.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="abha">ABHA Number</Label>
                <Input
                  id="abha"
                  placeholder="XX-XXXX-XXXX-XXXX"
                  value={formData.abha}
                  onChange={(e) => setFormData({ ...formData, abha: e.target.value })}
                  maxLength={17}
                />
              </div>

              <Button 
                className="w-full bg-[#07a6ec] hover:bg-[#0695d3]"
                onClick={handleVerifyABHA}
                disabled={formData.abha.length !== 17 || isVerifying}
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Fetching Health Records...
                  </>
                ) : (
                  "Link ABHA & Fetch Records"
                )}
              </Button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 text-center">
              <div className="flex justify-center">
                <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Verification Complete!</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Your identity has been verified and health records have been synced successfully.
                </p>
              </div>
              <Button 
                className="w-full bg-[#fa6724] hover:bg-[#e55613]"
                onClick={onClose}
              >
                Continue to Dashboard
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
} 