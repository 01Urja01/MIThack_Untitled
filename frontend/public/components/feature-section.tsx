import {
  Zap,
  Shield,
  Clock,
  FileText,
  AlertTriangle,
  Camera,
  CreditCard,
  BarChart3,
  Moon,
  MessageCircle,
} from "lucide-react"

export default function FeatureSection() {
  const features = [
    {
      icon: <Zap className="h-10 w-10 text-[#fa6724]" />,
      title: "Immersive Dashboard",
      description: "Modern, interactive dashboard showcasing real-time claim status and analytics.",
    },
    {
      icon: <Shield className="h-10 w-10 text-[#07a6ec]" />,
      title: "AI-Powered Claims Assistant",
      description: "SwiftBot assists with filing claims and provides status updates via voice or text.",
    },
    {
      icon: <Clock className="h-10 w-10 text-[#fa6724]" />,
      title: "Dynamic Claims Timeline",
      description: "Visually engaging, animated timeline that updates claim progress step by step.",
    },
    {
      icon: <FileText className="h-10 w-10 text-[#07a6ec]" />,
      title: "One-Tap Claim Filing",
      description: "Minimal-step submission with drag-and-drop uploads and instant AI verification.",
    },
    {
      icon: <AlertTriangle className="h-10 w-10 text-[#fa6724]" />,
      title: "Fraud Detection Alerts",
      description: "Live notification system with color-coded risk indicators for suspicious claims.",
    },
    {
      icon: <Camera className="h-10 w-10 text-[#07a6ec]" />,
      title: "AR Inspection",
      description: "Scan damage with your phone for real-time AI assessments before submission.",
    },
    {
      icon: <CreditCard className="h-10 w-10 text-[#fa6724]" />,
      title: "Instant UPI Payout",
      description: "One-click payout confirmation with real-time blockchain verification.",
    },
    {
      icon: <BarChart3 className="h-10 w-10 text-[#07a6ec]" />,
      title: "Admin Dashboard",
      description: "Customizable widgets for monitoring fraud analytics and approval rates.",
    },
    {
      icon: <Moon className="h-10 w-10 text-[#fa6724]" />,
      title: "Dark & Light Mode",
      description: "Visually stunning UI with adaptive themes for different environments.",
    },
    {
      icon: <MessageCircle className="h-10 w-10 text-[#07a6ec]" />,
      title: "Multi-Language Support",
      description: "SwiftBot converses in multiple languages for global accessibility.",
    },
  ]

  return (
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
  )
}

