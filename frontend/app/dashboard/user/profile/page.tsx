"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Bell,
  Settings,
  Camera,
  Edit2,
  Save,
  Lock,
  Heart,
  Car,
  Plane,
} from "lucide-react"

export default function ProfilePage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("personal")
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "Rahul",
    lastName: "Sharma",
    email: "rahul.sharma@example.com",
    phone: "+91 98765 43210",
    address: "123 Main Street, Indiranagar\nBangalore, Karnataka 560038",
    dob: "1990-05-15",
    gender: "Male",
    occupation: "Software Engineer",
    company: "TechCorp Solutions",
    emergencyContact: {
      name: "Priya Sharma",
      relation: "Spouse",
      phone: "+91 87654 32109",
    },
    policies: [
      { type: "Health", provider: "Max Bupa", number: "HLT-123456" },
      { type: "Motor", provider: "ICICI Lombard", number: "MTR-789012" },
      { type: "Travel", provider: "TATA AIG", number: "TRV-345678" },
    ],
    preferences: {
      language: "English",
      theme: "Light",
      notifications: {
        email: true,
        sms: true,
        push: true,
        whatsapp: false,
      },
    },
  })

  const handleSave = () => {
    setIsEditing(false)
    toast({
      title: "Profile updated successfully!",
      description: "Your changes have been saved.",
      action: (
        <div className="flex items-center gap-2">
          <Image
            src="https://i.ibb.co/DgLw71WX/claimsaathi-happy-tooexcited-smilingwithopenmouth.png"
            alt="Claim Saathi"
            width={24}
            height={24}
            className="rounded-full"
          />
          <span>Great job updating your profile!</span>
        </div>
      ),
    })
  }

  return (
    <div className="container mx-auto py-6 max-w-5xl">
      <div className="space-y-6">
        {/* Profile Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/rahul-profile.jpg" alt="Rahul Sharma" />
                <AvatarFallback className="bg-gradient-to-r from-[#07a6ec] to-[#fa6724] text-white text-2xl">
                  RS
                </AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                className="absolute bottom-0 right-0 rounded-full bg-[#fa6724] hover:bg-[#e55613]"
                onClick={() => {}}
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <div>
              <h1 className="text-2xl font-bold">{`${formData.firstName} ${formData.lastName}`}</h1>
              <p className="text-muted-foreground">{formData.occupation} at {formData.company}</p>
            </div>
          </div>
          <Button
            onClick={() => setIsEditing(!isEditing)}
            className={isEditing ? "bg-[#07a6ec]" : "bg-[#fa6724]"}
          >
            {isEditing ? (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            ) : (
              <>
                <Edit2 className="mr-2 h-4 w-4" />
                Edit Profile
              </>
            )}
          </Button>
        </div>

        {/* Claim Saathi Helper */}
        <div className="flex items-start gap-3 bg-gradient-to-r from-[#07a6ec]/10 to-[#fa6724]/10 p-4 rounded-lg">
          <div className="h-12 w-12 rounded-full bg-gradient-to-r from-[#07a6ec] to-[#fa6724] flex items-center justify-center flex-shrink-0">
            <Image
              src="https://i.ibb.co/JFW8D5KV/claimsaathi-goodmood-happy.png"
              alt="Claim Saathi"
              width={36}
              height={36}
              className="rounded-full"
            />
          </div>
          <div>
            <h3 className="font-medium">Keep your profile updated!</h3>
            <p className="text-sm text-muted-foreground">
              Having accurate information helps us process your claims faster and provide better support.
            </p>
          </div>
        </div>

        {/* Profile Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="policies">My Policies</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Manage your personal details and contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {/* Personal Info Fields */}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Emergency Contact</CardTitle>
                <CardDescription>Who should we contact in case of emergency?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Emergency Contact Fields */}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Additional TabsContent sections... */}
        </Tabs>
      </div>
    </div>
  )
}