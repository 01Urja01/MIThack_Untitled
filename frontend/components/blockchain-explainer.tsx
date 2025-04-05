import { LockKeyhole, FileCheck, CreditCard, Clock, ShieldCheck, Fingerprint, Database, RefreshCw } from "lucide-react"

export default function BlockchainExplainer() {
  const steps = [
    {
      icon: <FileCheck className="h-8 w-8 text-white" />,
      title: "Claim Submission",
      description: "User submits claim with required documentation through the platform.",
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-white" />,
      title: "Smart Contract Verification",
      description: "Blockchain smart contract receives verification proof and validates the claim.",
    },
    {
      icon: <Database className="h-8 w-8 text-white" />,
      title: "Policy Terms Check",
      description: "Contract automatically checks policy terms and coverage details.",
    },
    {
      icon: <CreditCard className="h-8 w-8 text-white" />,
      title: "Automatic Payment",
      description: "If valid, contract triggers automatic payment via UPI to the policyholder.",
    },
    {
      icon: <LockKeyhole className="h-8 w-8 text-white" />,
      title: "Immutable Record",
      description: "All verification steps, approvals, and payment are recorded on blockchain.",
    },
  ]

  const benefits = [
    {
      icon: <Clock className="h-10 w-10 text-[#fa6724]" />,
      title: "Faster Processing",
      description: "Smart contracts automate verification, reducing claim processing time by up to 90%.",
    },
    {
      icon: <ShieldCheck className="h-10 w-10 text-[#07a6ec]" />,
      title: "Enhanced Security",
      description: "Immutable blockchain records prevent fraud and unauthorized modifications.",
    },
    {
      icon: <Fingerprint className="h-10 w-10 text-[#fa6724]" />,
      title: "Transparent Verification",
      description: "All parties can verify claim status and authenticity in real-time.",
    },
    {
      icon: <RefreshCw className="h-10 w-10 text-[#07a6ec]" />,
      title: "Reduced Overhead",
      description: "Automation eliminates manual processing, reducing administrative costs.",
    },
  ]

  return (
    <section className="py-16 px-4 md:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Blockchain Technology</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Swift Claim leverages blockchain technology to ensure secure, transparent, and efficient insurance claim
            processing.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 -translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#fa6724] to-[#07a6ec] hidden md:block"></div>

          <div className="space-y-12 relative">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex flex-col md:flex-row gap-8 items-center ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="md:w-1/2 flex justify-center">
                  <div className="relative">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-[#fa6724] to-[#07a6ec] flex items-center justify-center z-10 relative">
                      {step.icon}
                    </div>
                    <div className="absolute -inset-2 bg-white dark:bg-gray-800 rounded-full opacity-20"></div>
                  </div>
                </div>
                <div className="md:w-1/2 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-24">
          <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center">Benefits of Blockchain Integration</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="mb-4">{benefit.icon}</div>
                <h4 className="text-xl font-bold mb-2">{benefit.title}</h4>
                <p className="text-gray-600 dark:text-gray-400">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

