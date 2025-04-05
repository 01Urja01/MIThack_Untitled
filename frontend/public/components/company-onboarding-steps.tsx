"use client"
import { usePathname } from "next/navigation"
import { Building, FileText, Users, BarChart3, CheckCircle, Database } from "lucide-react"

export default function CompanyOnboardingSteps() {
  const pathname = usePathname()

  // Determine current step based on pathname
  let currentStep = 0
  if (pathname?.includes("/step1")) currentStep = 1
  if (pathname?.includes("/step2")) currentStep = 2
  if (pathname?.includes("/step3")) currentStep = 3
  if (pathname?.includes("/step4")) currentStep = 4
  if (pathname?.includes("/step5")) currentStep = 5
  if (pathname?.includes("/complete")) currentStep = 6

  const steps = [
    {
      id: 1,
      name: "Company Profile",
      icon: Building,
      path: "/onboarding/company/step1",
    },
    {
      id: 2,
      name: "Policy Configuration",
      icon: FileText,
      path: "/onboarding/company/step2",
    },
    {
      id: 3,
      name: "Team Setup",
      icon: Users,
      path: "/onboarding/company/step3",
    },
    {
      id: 4,
      name: "Dashboard Preferences",
      icon: BarChart3,
      path: "/onboarding/company/step4",
    },
    {
      id: 5,
      name: "Blockchain Network",
      icon: Database,
      path: "/onboarding/company/step5",
    },
  ]

  return (
    <div className="px-8 py-6 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between max-w-3xl mx-auto">
        {steps.map((step) => (
          <div key={step.id} className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                currentStep >= step.id
                  ? "bg-[#07a6ec] border-[#07a6ec] text-white"
                  : "border-gray-300 text-gray-400"
              }`}
            >
              {currentStep > step.id ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                <step.icon className="h-5 w-5" />
              )}
            </div>
            <div className="mt-2 text-xs">{step.name}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

