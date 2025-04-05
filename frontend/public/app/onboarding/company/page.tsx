"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, CheckCircle, Building, BarChart3, Users, Database, Shield, Lock, Globe, Server } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import CompanyOnboardingSteps from "@/components/company-onboarding-steps"

interface OnboardingData {
  // Step 1: Company Profile
  companyLogo: string
  businessAddress: string
  registeredOffice: string
  taxId: string
  licenseNumber: string
  
  // Step 2: Policy Configuration
  supportedPolicyTypes: string[]
  claimProcessingTime: string
  maxClaimAmount: string
  autoApprovalThreshold: string
  
  // Step 3: Team Setup
  teamMembers: {
    name: string
    email: string
    role: string
  }[]
  
  // Step 4: Dashboard Preferences
  dashboardModules: string[]
  notificationPreferences: string[]
  reportingFrequency: string

  // Step 5: Blockchain Network
  blockchainNetwork: "public" | "private" | ""
}

const POLICY_TYPES = [
  "Health Insurance",
  "Motor Insurance",
  "Life Insurance",
  "Property Insurance",
  "Travel Insurance",
  "Business Insurance"
]

const DASHBOARD_MODULES = [
  "Claims Analytics",
  "Fraud Detection",
  "Policy Management",
  "Customer Insights",
  "Team Performance",
  "Financial Reports"
]

const NOTIFICATION_PREFERENCES = [
  "Email Alerts",
  "SMS Notifications",
  "In-App Notifications",
  "WhatsApp Updates"
]

export default function CompanyOnboarding() {
  const router = useRouter()
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<OnboardingData>({
    // Initialize with empty values
    companyLogo: "",
    businessAddress: "",
    registeredOffice: "",
    taxId: "",
    licenseNumber: "",
    supportedPolicyTypes: [],
    claimProcessingTime: "",
    maxClaimAmount: "",
    autoApprovalThreshold: "",
    teamMembers: [],
    dashboardModules: [],
    notificationPreferences: [],
    reportingFrequency: "weekly",
    blockchainNetwork: ""
  })

  const handleNext = () => {
    // Validate current step
    if (validateStep()) {
      if (currentStep < 5) {
        setCurrentStep(currentStep + 1)
      } else {
        handleComplete()
      }
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    } else {
      router.push("/auth/register")
    }
  }

  const validateStep = () => {
    switch (currentStep) {
      case 1:
        if (!formData.businessAddress || !formData.registeredOffice || !formData.taxId || !formData.licenseNumber) {
          toast({
            title: "Missing Information",
            description: "Please fill in all required company profile fields.",
            variant: "destructive"
          })
          return false
        }
        return true
      
      case 2:
        if (formData.supportedPolicyTypes.length === 0 || !formData.claimProcessingTime || !formData.maxClaimAmount) {
          toast({
            title: "Missing Information",
            description: "Please complete all policy configuration options.",
            variant: "destructive"
          })
          return false
        }
        return true
      
      case 3:
        if (formData.teamMembers.length === 0) {
          toast({
            title: "Missing Information",
            description: "Please add at least one team member.",
            variant: "destructive"
          })
          return false
        }
        return true
      
      case 4:
        if (formData.dashboardModules.length === 0) {
          toast({
            title: "Missing Information",
            description: "Please select at least one dashboard module.",
            variant: "destructive"
          })
          return false
        }
        return true

      case 5:
        if (!formData.blockchainNetwork) {
          toast({
            title: "Missing Information",
            description: "Please select a blockchain network type.",
            variant: "destructive"
          })
          return false
        }
        return true
      
      default:
        return true
    }
  }

  const handleComplete = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      toast({
        title: "Onboarding Complete",
        description: "Your company has been successfully onboarded!",
      })
      
      router.push("/dashboard/provider")
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      })
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <Building className="h-8 w-8 text-[#07a6ec]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Company Profile</h2>
                <p className="text-gray-600 dark:text-gray-400">Complete your company details</p>
              </div>
            </div>

            <div className="grid gap-6">
              <div className="space-y-2">
                <Label htmlFor="businessAddress">Business Address</Label>
                <Input
                  id="businessAddress"
                  value={formData.businessAddress}
                  onChange={(e) => setFormData({ ...formData, businessAddress: e.target.value })}
                  placeholder="Enter your business address"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="registeredOffice">Registered Office</Label>
                <Input
                  id="registeredOffice"
                  value={formData.registeredOffice}
                  onChange={(e) => setFormData({ ...formData, registeredOffice: e.target.value })}
                  placeholder="Enter registered office address"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="taxId">Tax ID</Label>
                  <Input
                    id="taxId"
                    value={formData.taxId}
                    onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
                    placeholder="Enter tax ID"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="licenseNumber">License Number</Label>
                  <Input
                    id="licenseNumber"
                    value={formData.licenseNumber}
                    onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                    placeholder="Enter license number"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-16 w-16 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
                <Database className="h-8 w-8 text-[#fa6724]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Policy Configuration</h2>
                <p className="text-gray-600 dark:text-gray-400">Set up your policy and claim parameters</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <Label>Supported Policy Types</Label>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  {POLICY_TYPES.map((type) => (
                    <div
                      key={type}
                      className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                        formData.supportedPolicyTypes.includes(type)
                          ? "border-[#07a6ec] bg-blue-50 dark:bg-blue-900/20"
                          : "hover:border-gray-400"
                      }`}
                      onClick={() => {
                        const types = formData.supportedPolicyTypes.includes(type)
                          ? formData.supportedPolicyTypes.filter((t) => t !== type)
                          : [...formData.supportedPolicyTypes, type]
                        setFormData({ ...formData, supportedPolicyTypes: types })
                      }}
                    >
                      <p className="font-medium">{type}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="claimProcessingTime">Claim Processing Time (hours)</Label>
                  <Input
                    id="claimProcessingTime"
                    type="number"
                    value={formData.claimProcessingTime}
                    onChange={(e) => setFormData({ ...formData, claimProcessingTime: e.target.value })}
                    placeholder="e.g., 24"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxClaimAmount">Maximum Claim Amount</Label>
                  <Input
                    id="maxClaimAmount"
                    type="number"
                    value={formData.maxClaimAmount}
                    onChange={(e) => setFormData({ ...formData, maxClaimAmount: e.target.value })}
                    placeholder="e.g., 1000000"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="autoApprovalThreshold">Auto-Approval Threshold (₹)</Label>
                <Input
                  id="autoApprovalThreshold"
                  type="number"
                  value={formData.autoApprovalThreshold}
                  onChange={(e) => setFormData({ ...formData, autoApprovalThreshold: e.target.value })}
                  placeholder="e.g., 50000"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">Claims below this amount will be auto-approved if they meet AI verification criteria</p>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-16 w-16 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                <Users className="h-8 w-8 text-[#07a6ec]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Team Setup</h2>
                <p className="text-gray-600 dark:text-gray-400">Add your team members</p>
              </div>
            </div>

            <div className="space-y-4">
              {formData.teamMembers.map((member, index) => (
                <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className="flex-1 grid grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <Label>Name</Label>
                      <p className="font-medium">{member.name}</p>
                    </div>
                    <div className="space-y-1">
                      <Label>Email</Label>
                      <p className="font-medium">{member.email}</p>
                    </div>
                    <div className="space-y-1">
                      <Label>Role</Label>
                      <p className="font-medium">{member.role}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                    onClick={() => {
                      const newTeamMembers = formData.teamMembers.filter((_, i) => i !== index)
                      setFormData({ ...formData, teamMembers: newTeamMembers })
                    }}
                  >
                    Remove
                  </Button>
                </div>
              ))}

              <Card className="p-4">
                <h3 className="font-medium mb-4">Add Team Member</h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    const formElement = e.target as HTMLFormElement
                    const newMember = {
                      name: (formElement.memberName as HTMLInputElement).value,
                      email: (formElement.memberEmail as HTMLInputElement).value,
                      role: (formElement.memberRole as HTMLSelectElement).value,
                    }
                    setFormData({
                      ...formData,
                      teamMembers: [...formData.teamMembers, newMember]
                    })
                    formElement.reset()
                  }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="memberName">Name</Label>
                      <Input id="memberName" name="memberName" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="memberEmail">Email</Label>
                      <Input id="memberEmail" name="memberEmail" type="email" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="memberRole">Role</Label>
                      <select
                        id="memberRole"
                        name="memberRole"
                        className="w-full rounded-md border border-input bg-background px-3 py-2"
                        required
                      >
                        <option value="">Select role</option>
                        <option value="Claims Manager">Claims Manager</option>
                        <option value="Risk Assessor">Risk Assessor</option>
                        <option value="Policy Administrator">Policy Administrator</option>
                        <option value="Customer Support">Customer Support</option>
                      </select>
                    </div>
                  </div>
                  <Button type="submit" variant="outline" className="w-full">
                    Add Team Member
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <BarChart3 className="h-8 w-8 text-[#fa6724]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Dashboard Setup</h2>
                <p className="text-gray-600 dark:text-gray-400">Customize your dashboard experience</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <Label>Dashboard Modules</Label>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  {DASHBOARD_MODULES.map((module) => (
                    <div
                      key={module}
                      className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                        formData.dashboardModules.includes(module)
                          ? "border-[#07a6ec] bg-blue-50 dark:bg-blue-900/20"
                          : "hover:border-gray-400"
                      }`}
                      onClick={() => {
                        const modules = formData.dashboardModules.includes(module)
                          ? formData.dashboardModules.filter((m) => m !== module)
                          : [...formData.dashboardModules, module]
                        setFormData({ ...formData, dashboardModules: modules })
                      }}
                    >
                      <p className="font-medium">{module}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Notification Preferences</Label>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  {NOTIFICATION_PREFERENCES.map((pref) => (
                    <div
                      key={pref}
                      className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                        formData.notificationPreferences.includes(pref)
                          ? "border-[#07a6ec] bg-blue-50 dark:bg-blue-900/20"
                          : "hover:border-gray-400"
                      }`}
                      onClick={() => {
                        const prefs = formData.notificationPreferences.includes(pref)
                          ? formData.notificationPreferences.filter((p) => p !== pref)
                          : [...formData.notificationPreferences, pref]
                        setFormData({ ...formData, notificationPreferences: prefs })
                      }}
                    >
                      <p className="font-medium">{pref}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reportingFrequency">Reporting Frequency</Label>
                <select
                  id="reportingFrequency"
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  value={formData.reportingFrequency}
                  onChange={(e) => setFormData({ ...formData, reportingFrequency: e.target.value })}
                  required
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="biweekly">Bi-weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <Database className="h-8 w-8 text-[#07a6ec]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Blockchain Network Selection</h2>
                <p className="text-gray-600 dark:text-gray-400">Choose your preferred blockchain network type</p>
              </div>
            </div>

            <div className="grid gap-6">
              <p className="text-gray-600 dark:text-gray-400">
                Select whether you want to store your blockchain data on a public or private network.
                This choice affects security, transparency, and operational costs.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <Card 
                  className={`cursor-pointer border-2 hover:shadow-md transition-all ${
                    formData.blockchainNetwork === "public" 
                      ? "border-[#07a6ec] bg-blue-50 dark:bg-blue-900/20" 
                      : "border-gray-200 dark:border-gray-700"
                  }`}
                  onClick={() => setFormData({ ...formData, blockchainNetwork: "public" })}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <Globe className="h-8 w-8 text-[#07a6ec] mr-3" />
                        <h3 className="text-xl font-bold">Public Network</h3>
                      </div>
                      {formData.blockchainNetwork === "public" && (
                        <CheckCircle className="h-6 w-6 text-[#07a6ec]" />
                      )}
                    </div>
                    
                    <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                        <span>Full transparency and auditability</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                        <span>Greater trust through decentralization</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                        <span>Wider industry interoperability</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card 
                  className={`cursor-pointer border-2 hover:shadow-md transition-all ${
                    formData.blockchainNetwork === "private" 
                      ? "border-[#07a6ec] bg-blue-50 dark:bg-blue-900/20" 
                      : "border-gray-200 dark:border-gray-700"
                  }`}
                  onClick={() => setFormData({ ...formData, blockchainNetwork: "private" })}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <Shield className="h-8 w-8 text-[#07a6ec] mr-3" />
                        <h3 className="text-xl font-bold">Private Network</h3>
                      </div>
                      {formData.blockchainNetwork === "private" && (
                        <CheckCircle className="h-6 w-6 text-[#07a6ec]" />
                      )}
                    </div>
                    
                    <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                        <span>Enhanced data privacy and control</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                        <span>Lower transaction costs</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                        <span>Faster transaction processing</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <div className="flex items-start">
                  <Server className="h-5 w-5 text-gray-500 mr-2 shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-semibold">Note:</span> You can change your blockchain network preference later through your company settings. 
                    However, migrating existing data between networks may require additional steps.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <Link href="/" className="inline-flex items-center text-[#07a6ec] hover:underline mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-[#07a6ec] to-[#fa6724] p-8 text-white">
            <h1 className="text-3xl font-bold mb-4">Insurance Company Onboarding</h1>
            <p className="text-lg opacity-90">
              Welcome to Swift Claim! Let's set up your company account and integrate our blockchain-powered claims
              processing system.
            </p>
          </div>

          <CompanyOnboardingSteps currentStep={currentStep} />

          <div className="p-8">
            <h2 className="text-2xl font-bold mb-6">What to Expect</h2>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Building className="h-10 w-10 text-[#07a6ec]" />
                    <div>
                      <h3 className="text-xl font-bold mb-2">Company Profile</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Set up your company profile with verification and blockchain integration for secure operations.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Database className="h-10 w-10 text-[#fa6724]" />
                    <div>
                      <h3 className="text-xl font-bold mb-2">Policy Configuration</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Configure your insurance policies and smart contract parameters for automated claim processing.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Users className="h-10 w-10 text-[#07a6ec]" />
                    <div>
                      <h3 className="text-xl font-bold mb-2">Team Setup</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Add team members with role-based access control for claims processing and management.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <BarChart3 className="h-10 w-10 text-[#fa6724]" />
                    <div>
                      <h3 className="text-xl font-bold mb-2">Dashboard Customization</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Customize your analytics dashboard to monitor claim metrics and fraud detection insights.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-bold mb-4">Blockchain Integration Benefits</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-[#07a6ec]" />
                  <span>Reduce claim processing costs by up to 45%</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-[#07a6ec]" />
                  <span>Decrease fraud cases by up to 78% with AI detection</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-[#07a6ec]" />
                  <span>Automate claim verification with smart contracts</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-[#07a6ec]" />
                  <span>Provide transparent claim tracking for policyholders</span>
                </div>
              </div>
            </div>

            <Card className="mt-8 p-6">
              {renderStep()}
              
              <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={handleBack}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button onClick={handleNext} className="bg-[#07a6ec] hover:bg-[#0695d6]">
                  {currentStep === 5 ? (
                    <>
                      Complete Setup
                      <CheckCircle className="ml-2 h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Next
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

