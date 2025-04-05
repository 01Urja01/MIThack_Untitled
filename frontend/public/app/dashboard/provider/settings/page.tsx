"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Building2,
  Shield,
  Bell,
  Lock,
  Key,
  Globe,
  Brain,
  FileText,
  Wallet,
  Settings,
  Mail,
  Phone,
  CheckCircle,
  AlertTriangle
} from "lucide-react"

export default function ProviderSettingsPage() {
  // Company Profile State
  const [companyProfile, setCompanyProfile] = useState({
    name: "Swift Claim Insurance",
    registrationNumber: "INS123456789",
    taxId: "GSTIN9876543210",
    address: "123 Business Park, Bangalore 560001",
    phone: "+91 80 4567 8900",
    email: "contact@swiftclaim.com",
    website: "www.swiftclaim.com",
    operatingHours: "9:00 AM - 6:00 PM IST"
  })

  // AI & Blockchain Settings
  const [aiSettings, setAiSettings] = useState({
    autoClaimProcessing: true,
    riskAssessment: true,
    fraudDetection: true,
    customerSupport: true,
    blockchainEnabled: true,
    smartContracts: true,
    dataEncryption: true,
    modelConfidenceThreshold: 85
  })

  // Notification Preferences
  const [notificationSettings, setNotificationSettings] = useState({
    email: {
      claimSubmissions: true,
      highRiskAlerts: true,
      teamUpdates: true,
      systemAlerts: true
    },
    sms: {
      urgentAlerts: true,
      fraudAlerts: true
    },
    inApp: {
      allActivities: true,
      teamMessages: true,
      systemUpdates: true
    }
  })

  // API Configuration
  const [apiConfig, setApiConfig] = useState({
    apiKey: "sk-xxxxx-xxxxx-xxxxx",
    webhookUrl: "https://api.swiftclaim.com/webhooks",
    ipWhitelist: ["192.168.1.1", "10.0.0.1"],
    rateLimit: 1000,
    timeout: 30
  })

  // Document Settings
  const [documentSettings, setDocumentSettings] = useState({
    autoExpiry: true,
    retentionPeriod: "5 years",
    compressionEnabled: true,
    allowedTypes: ["pdf", "jpg", "png", "doc"],
    maxFileSize: "10MB",
    encryptionEnabled: true
  })

  // Security Settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    passwordPolicy: {
      minLength: 12,
      requireSpecialChars: true,
      requireNumbers: true,
      expiryDays: 90
    },
    sessionTimeout: 30,
    ipRestriction: true
  })

  const handleSave = async (section: string) => {
    // Implement save logic here
    console.log(`Saving ${section} settings...`)
  }

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Provider Settings</h1>
        <p className="text-muted-foreground">
          Manage your insurance provider settings and configurations
        </p>
      </div>

      <Tabs defaultValue="company">
        <TabsList className="grid grid-cols-3 lg:grid-cols-6 w-full">
          <TabsTrigger value="company">Company</TabsTrigger>
          <TabsTrigger value="ai">AI & Blockchain</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="company" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Company Profile</CardTitle>
              <CardDescription>Manage your company information and contact details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Company Name</Label>
                  <Input 
                    value={companyProfile.name}
                    onChange={(e) => setCompanyProfile(prev => ({...prev, name: e.target.value}))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Registration Number</Label>
                  <Input 
                    value={companyProfile.registrationNumber}
                    onChange={(e) => setCompanyProfile(prev => ({...prev, registrationNumber: e.target.value}))}
                  />
                </div>
                {/* Add more company fields */}
              </div>
              <Button 
                className="bg-[#07a6ec] hover:bg-[#0696d7]"
                onClick={() => handleSave('company')}
              >
                Save Company Profile
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI & Blockchain Configuration</CardTitle>
              <CardDescription>Configure AI-powered features and blockchain settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Automated Claim Processing</Label>
                    <p className="text-sm text-muted-foreground">Enable AI-powered claim processing</p>
                  </div>
                  <Switch
                    checked={aiSettings.autoClaimProcessing}
                    onCheckedChange={(checked) => 
                      setAiSettings(prev => ({...prev, autoClaimProcessing: checked}))
                    }
                  />
                </div>
                {/* Add more AI settings */}
              </div>
              <Button 
                className="bg-[#07a6ec] hover:bg-[#0696d7]"
                onClick={() => handleSave('ai')}
              >
                Save AI Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Add remaining TabsContent sections */}
      </Tabs>
    </div>
  )
} 