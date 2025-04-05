"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft, Zap, Eye, EyeOff, ChevronRight, Shield, FileText, Phone, Building, Users, CheckCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Loader } from "@/components/ui/loader"
import { registerUser, registerInsurer } from "@/lib/auth"

type UserType = "individual" | "company"

interface ContactPerson {
  name: string
  designation: string
  email: string
  phone: string
}

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
  userType: UserType
  accountType: string
  agreeTerms: boolean
  insuranceType: string[]
  existingPolicy: string
  policyNumber: string
  companyName: string
  registrationNumber: string
  companyType: string
  contactPerson: ContactPerson
}

export default function RegisterPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    userType: "individual",
    accountType: "individual",
    agreeTerms: false,
    insuranceType: [],
    existingPolicy: "",
    policyNumber: "",
    companyName: "",
    registrationNumber: "",
    companyType: "",
    contactPerson: {
      name: "",
      designation: "",
      email: "",
      phone: ""
    }
  })
  const [isTransitioning, setIsTransitioning] = useState(false)

  const insuranceTypes = [
    "Health Insurance",
    "Motor Insurance",
    "Life Insurance",
    "Property Insurance",
    "Travel Insurance"
  ]

  const handleUserTypeChange = (value: string) => {
    setFormData({ ...formData, userType: value as UserType })
  }

  const handleNext = () => {
    // Validate based on user type and current step
    if (formData.userType === "company") {
      switch (step) {
        case 1:
          if (!formData.companyName || !formData.registrationNumber || !formData.companyType) {
            toast({
              title: "Required Fields",
              description: "Please fill in all company details",
              variant: "destructive"
            })
            return
          }
          break
        case 2:
          if (!formData.contactPerson.name || !formData.contactPerson.email || 
              !formData.contactPerson.phone || !formData.contactPerson.designation || !formData.password) {
            toast({
              title: "Required Fields",
              description: "Please fill in all contact person details and password",
              variant: "destructive"
            })
            return
          }
          break
      }
    } else {
      // Individual user validation
      switch (step) {
        case 1:
          if (!formData.firstName || !formData.lastName || !formData.email) {
            toast({
              title: "Required Fields",
              description: "Please fill in all required fields",
              variant: "destructive"
            })
            return
          }
          break
        case 2:
          if (!formData.phone || !formData.password) {
            toast({
              title: "Required Fields",
              description: "Please fill in all required fields",
              variant: "destructive"
            })
            return
          }
          break
      }
    }
    setStep(step + 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Final validation before submission
    if (formData.userType === "company") {
      if (!formData.agreeTerms) {
        toast({
          title: "Terms Agreement Required",
          description: "Please agree to the terms and conditions",
          variant: "destructive"
        })
        return
      }
    } else {
      if (!formData.agreeTerms || formData.insuranceType.length === 0) {
        toast({
          title: "Required Fields",
          description: "Please select insurance types and agree to terms",
          variant: "destructive"
        })
        return
      }
    }

    setIsTransitioning(true)
    setIsLoading(true)
    
    try {
      // Format the data according to the API requirements
      if (formData.userType === "company") {
        // Register as insurer
        const insurerData = {
          fullName: `${formData.contactPerson.name}`,
          email: formData.contactPerson.email,
          phone: formData.contactPerson.phone,
          password: formData.password,
          address: "", // Add address field in your form if needed
          role: "insurer",
          company_name: formData.companyName,
          registration_number: formData.registrationNumber,
          company_type: formData.companyType === "Health Insurance" ? "health_insurance" : "travel_insurance",
          designation: formData.contactPerson.designation
        };
        
        // Call the registerInsurer function from auth.ts
        await registerInsurer(insurerData as any);
        
        // Redirect to company onboarding
        toast({
          title: "Registration successful",
          description: "Welcome to Swift Claim! Let's set up your company account."
        });
        router.push("/onboarding/company");
      } else {
        // Register as regular user
        const userData = {
          fullName: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          address: "", // Add address field in your form if needed
          role: "customer"
        };
        
        // Call the registerUser function from auth.ts
        await registerUser(userData);
        
        // Redirect to email verification
        toast({
          title: "Registration successful",
          description: "Account created successfully. Please verify your email."
        });
        router.push("/auth/verify-email");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Registration failed. Please try again.";
      toast({
        title: "Registration Failed",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
      setIsTransitioning(false);
    }
  }

  const renderStep = () => {
    if (formData.userType === "company") {
      switch (step) {
        case 1:
          return (
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-16 w-16 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
                  <Building className="h-8 w-8 text-[#07a6ec]" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Company Registration</h2>
                  <p className="text-gray-600 dark:text-gray-400">Tell us about your insurance company</p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <Label>I am registering as:</Label>
                <RadioGroup
                  value={formData.userType}
                  onValueChange={handleUserTypeChange}
                  className="grid grid-cols-2 gap-4"
                >
                  <div className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    formData.userType === "individual"
                      ? "border-[#07a6ec] bg-blue-50 dark:bg-blue-900/20"
                      : "hover:border-gray-400"
                  }`}>
                    <RadioGroupItem value="individual" id="individual" className="sr-only" />
                    <Label htmlFor="individual" className="cursor-pointer">
                      <div className="font-medium mb-1">Individual Policyholder</div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        I want to manage my personal insurance policies
                      </p>
                    </Label>
                  </div>

                  <div className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    formData.userType === "company"
                      ? "border-[#07a6ec] bg-blue-50 dark:bg-blue-900/20"
                      : "hover:border-gray-400"
                  }`}>
                    <RadioGroupItem value="company" id="company" className="sr-only" />
                    <Label htmlFor="company" className="cursor-pointer">
                      <div className="font-medium mb-1">Insurance Provider</div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        I represent an insurance company
                      </p>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="registrationNumber">Registration Number</Label>
                  <Input
                    id="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyType">Company Type</Label>
                  <select
                    id="companyType"
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                    value={formData.companyType}
                    onChange={(e) => setFormData({ ...formData, companyType: e.target.value })}
                    required
                  >
                    <option value="">Select company type</option>
                    <option value="general">General Insurance</option>
                    <option value="life">Life Insurance</option>
                    <option value="health">Health Insurance</option>
                    <option value="composite">Composite Insurance</option>
                  </select>
                </div>
              </div>
            </div>
          )

        case 2:
          return (
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <Users className="h-8 w-8 text-[#07a6ec]" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Contact Person Details</h2>
                  <p className="text-gray-600 dark:text-gray-400">Who should we contact?</p>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactName">Contact Person Name</Label>
                  <Input
                    id="contactName"
                    value={formData.contactPerson.name}
                    onChange={(e) => setFormData({
                      ...formData,
                      contactPerson: { ...formData.contactPerson, name: e.target.value }
                    })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="designation">Designation</Label>
                  <Input
                    id="designation"
                    value={formData.contactPerson.designation}
                    onChange={(e) => setFormData({
                      ...formData,
                      contactPerson: { ...formData.contactPerson, designation: e.target.value }
                    })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={formData.contactPerson.email}
                    onChange={(e) => setFormData({
                      ...formData,
                      contactPerson: { ...formData.contactPerson, email: e.target.value }
                    })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Phone</Label>
                  <Input
                    id="contactPhone"
                    type="tel"
                    value={formData.contactPerson.phone}
                    onChange={(e) => setFormData({
                      ...formData,
                      contactPerson: { ...formData.contactPerson, phone: e.target.value }
                    })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Password must be at least 8 characters with a number and special character
                  </p>
                </div>
              </div>
            </div>
          )

        case 3:
          return (
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                  <Shield className="h-8 w-8 text-[#07a6ec]" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Verification & Terms</h2>
                  <p className="text-gray-600 dark:text-gray-400">Final steps to complete registration</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h3 className="font-medium mb-2">Next Steps After Registration:</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Complete company verification
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Set up blockchain integration
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Configure policy templates
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Add team members
                    </li>
                  </ul>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="agreeTerms"
                    checked={formData.agreeTerms}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, agreeTerms: checked as boolean })
                    }
                  />
                  <label
                    htmlFor="agreeTerms"
                    className="text-sm text-gray-600 dark:text-gray-400"
                  >
                    I agree to the{" "}
                    <Link href="/terms" className="text-[#07a6ec] hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-[#07a6ec] hover:underline">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
              </div>
            </div>
          )

        default:
          return null
      }
    }

    // Individual user steps
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-16 w-16 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
                <Image
                  src="https://i.ibb.co/DgLw71W/claimsaathi-happy-tooexcited-smilingwithopenmouth.png"
                  alt="Welcome"
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Welcome!</h2>
                <p className="text-gray-600 dark:text-gray-400">Let's start with your basic information</p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <Label>I am registering as:</Label>
              <RadioGroup
                value={formData.userType}
                onValueChange={handleUserTypeChange}
                className="grid grid-cols-2 gap-4"
              >
                <div className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                  formData.userType === "individual"
                    ? "border-[#07a6ec] bg-blue-50 dark:bg-blue-900/20"
                    : "hover:border-gray-400"
                }`}>
                  <RadioGroupItem value="individual" id="individual" className="sr-only" />
                  <Label htmlFor="individual" className="cursor-pointer">
                    <div className="font-medium mb-1">Individual Policyholder</div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      I want to manage my personal insurance policies
                    </p>
                  </Label>
                </div>

                <div className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                  formData.userType === "company"
                    ? "border-[#07a6ec] bg-blue-50 dark:bg-blue-900/20"
                    : "hover:border-gray-400"
                }`}>
                  <RadioGroupItem value="company" id="company" className="sr-only" />
                  <Label htmlFor="company" className="cursor-pointer">
                    <div className="font-medium mb-1">Insurance Provider</div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      I represent an insurance company
                    </p>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <Phone className="h-8 w-8 text-[#07a6ec]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Contact Details</h2>
                <p className="text-gray-600 dark:text-gray-400">How can we reach you?</p>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Password must be at least 8 characters with a number and special character
                </p>
              </div>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <FileText className="h-8 w-8 text-[#07a6ec]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Insurance Preferences</h2>
                <p className="text-gray-600 dark:text-gray-400">Tell us about your insurance needs</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>What types of insurance are you interested in?</Label>
                <div className="grid grid-cols-2 gap-2">
                  {insuranceTypes.map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={type}
                        checked={formData.insuranceType.includes(type)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setFormData({
                              ...formData,
                              insuranceType: [...formData.insuranceType, type],
                            });
                          } else {
                            setFormData({
                              ...formData,
                              insuranceType: formData.insuranceType.filter((t) => t !== type),
                            });
                          }
                        }}
                      />
                      <label
                        htmlFor={type}
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {type}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="existingPolicy">Do you have any existing policies?</Label>
                <select
                  id="existingPolicy"
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  value={formData.existingPolicy}
                  onChange={(e) => setFormData({ ...formData, existingPolicy: e.target.value })}
                >
                  <option value="">Select an option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              {formData.existingPolicy === "yes" && (
                <div className="space-y-2">
                  <Label htmlFor="policyNumber">Policy Number (optional)</Label>
                  <Input
                    id="policyNumber"
                    value={formData.policyNumber}
                    onChange={(e) => setFormData({ ...formData, policyNumber: e.target.value })}
                  />
                </div>
              )}

              <div className="flex items-center space-x-2 mt-4">
                <Checkbox
                  id="agreeTerms"
                  checked={formData.agreeTerms}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, agreeTerms: checked as boolean })
                  }
                />
                <label
                  htmlFor="agreeTerms"
                  className="text-sm text-gray-600 dark:text-gray-400"
                >
                  I agree to the{" "}
                  <Link href="/terms" className="text-[#07a6ec] hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-[#07a6ec] hover:underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  }

  return (
    <>
      {isTransitioning && <Loader />}
      <div className="min-h-screen flex">
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <Button
                variant="ghost"
                onClick={() => (step === 1 ? router.push("/") : setStep(step - 1))}
                className="mb-6"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                {step === 1 ? "Back to Home" : "Previous Step"}
              </Button>

              {/* Progress Indicator */}
              <div className="flex items-center gap-2 mb-8">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`h-2 rounded-full flex-1 transition-colors ${
                      i <= step ? "bg-[#07a6ec]" : "bg-gray-200 dark:bg-gray-700"
                    }`}
                  />
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {renderStep()}

              <div className="mt-8">
                {step < 3 ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="w-full bg-[#07a6ec] hover:bg-[#0696d7]"
                  >
                    Continue
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="w-full bg-[#fa6724] hover:bg-[#e55613]"
                    disabled={formData.userType === "company" 
                      ? !formData.agreeTerms 
                      : (!formData.agreeTerms || formData.insuranceType.length === 0)}
                  >
                    Create Account
                    <Zap className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Right side - Features */}
        <div className="hidden lg:block lg:w-1/2 bg-gradient-to-br from-[#fa6724] to-[#07a6ec] relative">
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 flex items-center justify-center p-12">
            <div className="max-w-md text-white">
              <h2 className="text-3xl font-bold mb-6">Why Choose Swift Claim?</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-white text-[#fa6724] flex items-center justify-center flex-shrink-0 mt-0.5">
                    ✓
                  </div>
                  <p>Process insurance claims in minutes, not months</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-white text-[#fa6724] flex items-center justify-center flex-shrink-0 mt-0.5">
                    ✓
                  </div>
                  <p>AI-powered claim assessment for instant approvals</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-white text-[#fa6724] flex items-center justify-center flex-shrink-0 mt-0.5">
                    ✓
                  </div>
                  <p>Secure blockchain verification prevents fraud</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-white text-[#fa6724] flex items-center justify-center flex-shrink-0 mt-0.5">
                    ✓
                  </div>
                  <p>24/7 support with Claim Saathi AI assistant</p>
                </li>
              </ul>

              {/* Testimonial */}
              <div className="mt-12 bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                    <Image
                      src="https://i.ibb.co/JFW8D5KV/claimsaathi-goodmood-happy.png"
                      alt="Claim Saathi"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  </div>
                  <div>
                    <p className="text-sm mb-2">
                      "Swift Claim has revolutionized how we handle insurance claims. The process is 
                      incredibly fast and transparent!"
                    </p>
                    <p className="text-sm font-medium">- Rahul Mehta, Happy Customer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

