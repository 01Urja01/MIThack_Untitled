import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle } from "lucide-react"

export default function HeroSection() {
  return (
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
              <Link href="/onboarding/user">
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
                src="/placeholder.svg?height=500&width=600"
                alt="Swift Claim Dashboard"
                fill
                className="object-cover"
                priority
              />
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
  )
}

