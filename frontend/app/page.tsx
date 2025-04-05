import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Building, Zap, Lock, Clock, CheckCircle } from "lucide-react"
import LandingHeader from "@/components/landing/landing-header"
import ChatbotWidget from "@/components/chatbot/chatbot-widget"

export default function Home() {
  return (
    <div className="min-h-screen">
      <LandingHeader />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#fa6724]/10 to-[#07a6ec]/10 py-20 md:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
            <div className="flex flex-col gap-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                <span className="text-[#fa6724]">Swift</span> Insurance Claims with{" "}
                <span className="text-[#07a6ec]">Blockchain</span> Verification
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Experience lightning-fast claim processing, fraud-proof verification, and instant payouts with our
                revolutionary platform.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-[#fa6724]" />
                  <span>File claims in minutes, not days</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-[#fa6724]" />
                  <span>Blockchain-verified for maximum security</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-[#fa6724]" />
                  <span>Instant UPI payouts upon approval</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Link href="/auth/login">
                  <Button className="bg-[#fa6724] hover:bg-[#e55613] text-white">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/demo">
                  <Button
                    variant="outline"
                    className="border-[#07a6ec] text-[#07a6ec] hover:bg-[#07a6ec] hover:text-white"
                  >
                    Watch Demo
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="relative h-[400px] md:h-[500px] w-full rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1579621970795-87facc2f976d?q=80&w=2070&auto=format&fit=crop"
                  alt="Swift Claim Dashboard"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center">
                      <Image
                        src="https://i.ibb.co/JFW8D5KV/claimsaathi-goodmood-happy.png"
                        alt="Claim Saathi"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-3 max-w-[80%]">
                      <p className="text-sm font-medium">
                        Hi there! I'm Claim Saathi, your AI assistant. Need help with your insurance claim?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-[#07a6ec] flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">90%</span>
                <span className="text-white text-xs absolute bottom-7">Faster Claims</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Revolutionary Features</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Swift Claim combines cutting-edge technology with intuitive design to transform the insurance claims
              experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blockchain Section */}
      <section className="py-16 px-4 md:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Blockchain Technology</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Swift Claim leverages blockchain technology to ensure secure, transparent, and efficient insurance claim
              processing.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Image
                src="https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=2232&auto=format&fit=crop"
                alt="Blockchain Technology"
                width={600}
                height={400}
                className="rounded-xl shadow-lg object-cover"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6">How It Works</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#fa6724] flex items-center justify-center text-white">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Claim Submission</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      User submits claim with required documentation through the platform.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#fa6724] flex items-center justify-center text-white">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Smart Contract Verification</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      Blockchain smart contract receives verification proof and validates the claim.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#fa6724] flex items-center justify-center text-white">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Policy Terms Check</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      Contract automatically checks policy terms and coverage details.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#fa6724] flex items-center justify-center text-white">
                    4
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Automatic Payment</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      If valid, contract triggers automatic payment via UPI to the policyholder.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#fa6724] flex items-center justify-center text-white">
                    5
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Immutable Record</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      All verification steps, approvals, and payment are recorded on blockchain.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-8 bg-gradient-to-r from-[#fa6724] to-[#07a6ec] text-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Insurance Experience?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied users who have simplified their insurance claims process with Swift Claim.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/login">
              <Button className="bg-white text-[#fa6724] hover:bg-gray-100">Get Started Now</Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="border-white text-white hover:bg-white/20">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <ChatbotWidget />
    </div>
  )
}

const features = [
  {
    icon: <Zap className="h-10 w-10 text-[#fa6724]" />,
    title: "Immersive Dashboard",
    description: "Modern, interactive dashboard showcasing real-time claim status and analytics.",
  },
  {
    icon: <Shield className="h-10 w-10 text-[#07a6ec]" />,
    title: "AI-Powered Assistant",
    description: "SwiftBot assists with filing claims and provides status updates via voice or text.",
  },
  {
    icon: <Clock className="h-10 w-10 text-[#fa6724]" />,
    title: "Dynamic Claims Timeline",
    description: "Visually engaging, animated timeline that updates claim progress step by step.",
  },
  {
    icon: <Lock className="h-10 w-10 text-[#07a6ec]" />,
    title: "Blockchain Security",
    description: "Immutable blockchain records prevent fraud and unauthorized modifications.",
  },
  {
    icon: <Building className="h-10 w-10 text-[#fa6724]" />,
    title: "Hospital Integration",
    description: "Fetches verified hospital records via ABDM for real-time claim validation.",
  },
  {
    icon: <Shield className="h-10 w-10 text-[#07a6ec]" />,
    title: "Fraud Prevention",
    description: "AI-powered anomaly detection minimizes fraudulent claims and insurer losses.",
  },
]

