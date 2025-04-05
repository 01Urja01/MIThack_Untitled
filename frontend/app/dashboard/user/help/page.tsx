import { HelpCircle, BookOpen, MessageSquare, Shield, Brain } from "lucide-react"

export default function HelpPage() {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Help Center</h1>
        <p className="text-muted-foreground">
          Find answers to common questions and learn how to use our platform effectively.
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Getting Started Card */}
        <div className="rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-primary/10 p-2">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">Getting Started</h2>
          </div>
          <p className="mt-4 text-muted-foreground">
            Learn the basics of our platform and how to navigate through different features.
          </p>
          <a href="#" className="mt-4 inline-flex items-center text-sm font-medium text-primary hover:underline">
            View Guide →
          </a>
        </div>

        {/* AI Features Card */}
        <div className="rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-primary/10 p-2">
              <Brain className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">AI Features</h2>
          </div>
          <p className="mt-4 text-muted-foreground">
            Discover how our AI-powered features can help you make better decisions.
          </p>
          <a href="#" className="mt-4 inline-flex items-center text-sm font-medium text-primary hover:underline">
            Learn More →
          </a>
        </div>

        {/* Security Card */}
        <div className="rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-primary/10 p-2">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">Security</h2>
          </div>
          <p className="mt-4 text-muted-foreground">
            Understand our security measures and how we protect your data.
          </p>
          <a href="#" className="mt-4 inline-flex items-center text-sm font-medium text-primary hover:underline">
            Security Info →
          </a>
        </div>

        {/* Contact Support Card */}
        <div className="rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-primary/10 p-2">
              <MessageSquare className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">Contact Support</h2>
          </div>
          <p className="mt-4 text-muted-foreground">
            Need more help? Our support team is here to assist you.
          </p>
          <a href="#" className="mt-4 inline-flex items-center text-sm font-medium text-primary hover:underline">
            Get Support →
          </a>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-12 space-y-6">
        <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            {
              question: "How do I get started with the platform?",
              answer: "Getting started is easy! Simply sign up for an account, complete your profile, and you'll be guided through our onboarding process."
            },
            {
              question: "What payment methods do you accept?",
              answer: "We accept all major credit cards, PayPal, and bank transfers. All payments are processed securely through our payment partners."
            },
            {
              question: "How does the AI feature work?",
              answer: "Our AI system analyzes your data and provides intelligent insights and recommendations to help you make better decisions."
            },
            {
              question: "Is my data secure?",
              answer: "Yes, we take security seriously. All data is encrypted and stored securely using industry-standard protocols."
            }
          ].map((faq, index) => (
            <div key={index} className="rounded-lg border bg-card p-6">
              <h3 className="font-semibold">{faq.question}</h3>
              <p className="mt-2 text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 