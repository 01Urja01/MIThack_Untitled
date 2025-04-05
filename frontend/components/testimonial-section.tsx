import Image from "next/image"
import { Star } from "lucide-react"

export default function TestimonialSection() {
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Health Insurance Policyholder",
      image: "/placeholder.svg?height=100&width=100",
      content:
        "Swift Claim processed my health insurance claim in just 2 hours! The blockchain verification gave me confidence that everything was secure and transparent.",
      rating: 5,
    },
    {
      name: "Rajesh Kumar",
      role: "Auto Insurance Customer",
      image: "/placeholder.svg?height=100&width=100",
      content:
        "After my car accident, I was worried about a lengthy claim process. Swift Claim's AR inspection and instant approval made everything so simple.",
      rating: 5,
    },
    {
      name: "Aditya Patel",
      role: "Insurance Company Manager",
      image: "/placeholder.svg?height=100&width=100",
      content:
        "Implementing Swift Claim has reduced our fraud cases by 78% and cut processing costs by 45%. The blockchain integration provides unmatched security.",
      rating: 5,
    },
  ]

  return (
    <section className="py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Discover how Swift Claim is transforming the insurance claims experience for policyholders and companies
            alike.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-[#fa6724] text-[#fa6724]" />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6">"{testimonial.content}"</p>
              <div className="flex items-center gap-4">
                <div className="relative h-12 w-12 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

