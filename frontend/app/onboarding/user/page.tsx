import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, CheckCircle, Shield, FileText, Bell, CreditCard } from "lucide-react"
import UserOnboardingSteps from "@/components/user-onboarding-steps"

export default function UserOnboarding() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <Link href="/" className="inline-flex items-center text-[#07a6ec] hover:underline mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-[#fa6724] to-[#07a6ec] p-8 text-white">
            <h1 className="text-3xl font-bold mb-4">Policyholder Onboarding</h1>
            <p className="text-lg opacity-90">
              Welcome to Swift Claim! Let's set up your account and get you started with our revolutionary insurance
              claims platform.
            </p>
          </div>

          <UserOnboardingSteps />

          <div className="p-8">
            <h2 className="text-2xl font-bold mb-6">What to Expect</h2>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Shield className="h-10 w-10 text-[#fa6724]" />
                    <div>
                      <h3 className="text-xl font-bold mb-2">Secure Account Setup</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Create your blockchain-secured account with multi-factor authentication for maximum protection.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <FileText className="h-10 w-10 text-[#07a6ec]" />
                    <div>
                      <h3 className="text-xl font-bold mb-2">Policy Integration</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Link your existing insurance policies to enable one-tap claim filing and instant verification.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Bell className="h-10 w-10 text-[#fa6724]" />
                    <div>
                      <h3 className="text-xl font-bold mb-2">Notification Setup</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Configure your preferred notification channels for real-time updates on claim status.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <CreditCard className="h-10 w-10 text-[#07a6ec]" />
                    <div>
                      <h3 className="text-xl font-bold mb-2">Payment Method</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Add your UPI ID or bank details for instant claim payouts directly to your account.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-bold mb-4">Blockchain Security Benefits</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-[#fa6724]" />
                  <span>Immutable claim records prevent fraud and tampering</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-[#fa6724]" />
                  <span>Smart contracts automate verification and payouts</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-[#fa6724]" />
                  <span>Transparent process with real-time status updates</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-[#fa6724]" />
                  <span>Decentralized storage protects your sensitive data</span>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <Link href="/onboarding/user/step1">
                <Button className="bg-[#fa6724] hover:bg-[#e55613] text-white">
                  Begin Onboarding <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

