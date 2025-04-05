"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Zap, CheckCircle, Mail } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import Image from "next/image"
import { Loader } from "@/components/ui/loader"

export default function VerifyEmailPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const userType = searchParams.get("userType") || "user"
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [countdown, setCountdown] = useState(60)
  const [isResending, setIsResending] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (countdown > 0 && !isVerified) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000)
    }
    return () => clearTimeout(timer)
  }, [countdown, isVerified])

  const handleResendEmail = () => {
    setIsResending(true)

    // Simulate API call
    setTimeout(() => {
      setIsResending(false)
      setCountdown(60)
      toast({
        title: "Verification email resent",
        description: "Please check your inbox for the verification link",
      })
    }, 1500)
  }

  const handleVerifyForDemo = () => {
    setIsTransitioning(true)

    // Simulate verification
    setTimeout(() => {
      setIsTransitioning(false)
      setIsVerified(true)

      // Redirect after showing success message based on user type
      setTimeout(() => {
        if (userType === "provider") {
          router.push("/onboarding/company")
        } else {
          router.push("/dashboard/user")
        }
      }, 2000)
    }, 2500)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
      {isTransitioning && <Loader />}
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <div className="flex items-center mb-8">
          <Image 
            src="https://i.ibb.co/5Xn2hrY3/logo-white-bg.png"
            alt="Swift Claim Logo"
            width={40}
            height={40}
            className="rounded-lg mr-3"
          />
          <h1 className="text-2xl font-bold">Swift Claim</h1>
        </div>

        {isVerified ? (
          <div className="text-center">
            <div className="mx-auto w-24 h-24 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
              <Image
                src="https://i.ibb.co/99WsM9fP/claimsaathi-dancing-neutral.png"
                alt="Claim Saathi"
                width={80}
                height={80}
                className="rounded-full"
              />
            </div>
            <h2 className="text-2xl font-bold mb-2">Email Verified!</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Your email has been successfully verified. Redirecting to dashboard...
            </p>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <div className="mx-auto w-24 h-24 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
                <Image
                  src="https://i.ibb.co/JFW8D5KV/claimsaathi-goodmood-happy.png"
                  alt="Claim Saathi"
                  width={80}
                  height={80}
                  className="rounded-full"
                />
              </div>
              <h2 className="text-2xl font-bold mb-2">Verify your email</h2>
              <p className="text-gray-600 dark:text-gray-400">
                We've sent a verification link to your email address. Please check your inbox and click the link to
                verify your account.
              </p>
            </div>

            <div className="space-y-4">
              <Button
                onClick={handleVerifyForDemo}
                className="w-full bg-[#fa6724] hover:bg-[#e55613]"
                disabled={isLoading}
              >
                {isLoading ? "Verifying..." : "Verify for Demo"}
              </Button>

              <div className="text-center">
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Didn't receive the email?</p>
                <Button
                  variant="outline"
                  onClick={handleResendEmail}
                  disabled={countdown > 0 || isResending}
                  className="text-[#07a6ec]"
                >
                  {isResending
                    ? "Resending..."
                    : countdown > 0
                      ? `Resend in ${countdown}s`
                      : "Resend verification email"}
                </Button>
              </div>
            </div>
          </>
        )}

        <div className="mt-8 text-center">
          <Link href="/" className="text-[#07a6ec] hover:underline inline-flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
