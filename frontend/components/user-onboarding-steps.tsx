"use client"
import { usePathname } from "next/navigation"
import { UserCircle2, FileText, Bell, CreditCard, CheckCircle } from "lucide-react"

export default function UserOnboardingSteps() {
  const pathname = usePathname()

  // Determine current step based on pathname
  let currentStep = 0
  if (pathname?.includes("/step1")) currentStep = 1
  if (pathname?.includes("/step2")) currentStep = 2
  if (pathname?.includes("/step3")) currentStep = 3
  if (pathname?.includes("/step4")) currentStep = 4
  if (pathname?.includes("/complete")) currentStep = 5

  const steps = [
    {
      id: 1,
      name: "Account Setup",
      icon: UserCircle2,
      path: "/onboarding/user/step1",
    },
    {
      id: 2,
      name: "Policy Integration",
      icon: FileText,
      path: "/onboarding/user/step2",
    },
    {
      id: 3,
      name: "Notifications",
      icon: Bell,
      path: "/onboarding/user/step3",
    },
    {
      id: 4,
      name: "Payment Method",
      icon: CreditCard,
      path: "/onboarding/user/step4",
    },
    {
      id: 5,
      name: "Complete",
      icon: CheckCircle,
      path: "/onboarding/user/complete",
    },
  ]

  return (
    <div className="px-4 py-8 border-b">
      <div className="max-w-4xl mx-auto">
        <div className="relative">
          {/* Progress Bar */}
          <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700">
            <div
              className="h-1 bg-gradient-to-r from-[#fa6724] to-[#07a6ec] transition-all duration-500 ease-in-out"
              style={{ width: `${Math.max(0, (currentStep / (steps.length - 1)) * 100)}%` }}
            ></div>
          </div>

          {/* Steps */}
          <div className="relative flex justify-between">
            {steps.map((step) => {
              const StepIcon = step.icon
              const isActive = currentStep >= step.id
              const isComplete = currentStep > step.id

              return (
                <div key={step.id} className="flex flex-col items-center">
                  <div
                    className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-[#fa6724] to-[#07a6ec] text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {isComplete ? <CheckCircle className="h-5 w-5" /> : <StepIcon className="h-5 w-5" />}
                  </div>
                  <span
                    className={`mt-2 text-sm font-medium ${
                      isActive ? "text-gray-900 dark:text-gray-100" : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {step.name}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

