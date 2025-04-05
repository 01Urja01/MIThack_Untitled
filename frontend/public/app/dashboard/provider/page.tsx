"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { WelcomeModal } from "@/components/provider/welcome-modal"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  BarChart3,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  Users,
  Shield,
  FileText,
  ArrowUpRight,
  ArrowDownRight,
  MessageCircle,
} from "lucide-react"

// Dashboard data
const dashboardData = {
  metrics: {
    totalClaims: {
      count: 1250,
      trend: "+12.5%",
      isPositive: true
    },
    pendingClaims: {
      count: 180,
      trend: "-5.3%",
      isPositive: true
    },
    fraudDetected: {
      count: 45,
      trend: "+2.1%",
      isPositive: false
    },
    totalPolicies: {
      count: 3200,
      trend: "+8.7%",
      isPositive: true
    }
  },
  recentClaims: [
    {
      id: "CLM-1234",
      customerName: "Rahul Sharma",
      type: "Health Insurance",
      amount: "₹45,000",
      status: "Processing",
      riskScore: 85,
      submittedAt: "2024-03-20T10:30:00"
    },
    {
      id: "CLM-1233",
      customerName: "Priya Patel",
      type: "Motor Insurance",
      amount: "₹75,000",
      status: "Under Review",
      riskScore: 92,
      submittedAt: "2024-03-20T09:15:00"
    },
    {
      id: "CLM-1232",
      customerName: "Amit Kumar",
      type: "Health Insurance",
      amount: "₹25,000",
      status: "Approved",
      riskScore: 95,
      submittedAt: "2024-03-19T16:45:00"
    }
  ],
  fraudAlerts: [
    {
      id: "FRD-123",
      type: "Multiple Claims",
      description: "Multiple claims from same hospital within 24hrs",
      riskLevel: "High",
      detectedAt: "2024-03-20T11:20:00"
    },
    {
      id: "FRD-122",
      type: "Document Mismatch",
      description: "Inconsistent documentation detected",
      riskLevel: "Medium",
      detectedAt: "2024-03-20T10:15:00"
    }
  ],
  performance: {
    averageProcessingTime: "4.2 hours",
    automationRate: "82%",
    customerSatisfaction: "4.8/5",
    fraudPreventionSavings: "₹2.5M"
  }
}

export default function ProviderDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [showAssistant, setShowAssistant] = useState(false)
  const [isNewUser, setIsNewUser] = useState(true)
  const [assistantMood, setAssistantMood] = useState("happy")

  // Function to get Claim Saathi's expression based on context
  const getAssistantImage = (context: string) => {
    switch (context) {
      case "fraud":
        return "https://i.ibb.co/Z7MhTHj/claimsaathi-neutral-mildlyangry.png"
      case "success":
        return "https://i.ibb.co/DgLw71WX/claimsaathi-happy-tooexcited-smilingwithopenmouth.png"
      case "warning":
        return "https://i.ibb.co/ZRq6hPFn/claimsaathi-angry-shouting.png"
      case "chat":
        return "https://i.ibb.co/JFW8D5KV/claimsaathi-goodmood-happy.png"
      default:
        return "https://i.ibb.co/XZP3h1bN/claimsaathi-neutral-firm.png"
    }
  }

  return (
    <>
      {isNewUser && <WelcomeModal />}
      
      <div className="space-y-8 p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image
              src={getAssistantImage(activeTab)}
              alt="Claim Saathi"
              width={48}
              height={48}
              className="rounded-full"
            />
            <div>
              <h1 className="text-3xl font-bold">Provider Dashboard</h1>
              <p className="text-muted-foreground">
                Monitor claims, detect fraud, and manage policies
              </p>
            </div>
          </div>
          <Button 
            className="bg-[#07a6ec] hover:bg-[#0696d7]"
            onClick={() => setShowAssistant(true)}
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            Ask Claim Saathi
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Claims</p>
                  <h3 className="text-2xl font-bold">{dashboardData.metrics.totalClaims.count}</h3>
                </div>
                <div className={`flex items-center ${
                  dashboardData.metrics.totalClaims.isPositive ? "text-green-500" : "text-red-500"
                }`}>
                  {dashboardData.metrics.totalClaims.isPositive ? (
                    <ArrowUpRight className="h-4 w-4" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4" />
                  )}
                  <span className="ml-1">{dashboardData.metrics.totalClaims.trend}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending Claims</p>
                  <h3 className="text-2xl font-bold">{dashboardData.metrics.pendingClaims.count}</h3>
                </div>
                <div className={`flex items-center ${
                  dashboardData.metrics.pendingClaims.isPositive ? "text-green-500" : "text-red-500"
                }`}>
                  {dashboardData.metrics.pendingClaims.isPositive ? (
                    <ArrowUpRight className="h-4 w-4" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4" />
                  )}
                  <span className="ml-1">{dashboardData.metrics.pendingClaims.trend}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Fraud Detected</p>
                  <h3 className="text-2xl font-bold">{dashboardData.metrics.fraudDetected.count}</h3>
                </div>
                <div className={`flex items-center ${
                  !dashboardData.metrics.fraudDetected.isPositive ? "text-green-500" : "text-red-500"
                }`}>
                  {!dashboardData.metrics.fraudDetected.isPositive ? (
                    <ArrowUpRight className="h-4 w-4" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4" />
                  )}
                  <span className="ml-1">{dashboardData.metrics.fraudDetected.trend}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Policies</p>
                  <h3 className="text-2xl font-bold">{dashboardData.metrics.totalPolicies.count}</h3>
                </div>
                <div className={`flex items-center ${
                  dashboardData.metrics.totalPolicies.isPositive ? "text-green-500" : "text-red-500"
                }`}>
                  {dashboardData.metrics.totalPolicies.isPositive ? (
                    <ArrowUpRight className="h-4 w-4" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4" />
                  )}
                  <span className="ml-1">{dashboardData.metrics.totalPolicies.trend}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs 
          defaultValue="overview" 
          className="space-y-6"
          onValueChange={(value) => {
            setActiveTab(value)
            // Update Claim Saathi's expression based on tab
            if (value === "fraud") setAssistantMood("angry")
            else if (value === "performance") setAssistantMood("happy")
            else setAssistantMood("neutral")
          }}
        >
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="claims">Claims</TabsTrigger>
            <TabsTrigger value="fraud">Fraud Detection</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Recent Claims */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Claims</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData.recentClaims.map((claim) => (
                    <div key={claim.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1">
                        <div>
                          <p className="text-sm text-muted-foreground">Claim ID</p>
                          <p className="font-medium">{claim.id}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Customer</p>
                          <p className="font-medium">{claim.customerName}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Amount</p>
                          <p className="font-medium">{claim.amount}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Status</p>
                          <div className="flex items-center">
                            {claim.status === "Processing" && (
                              <Clock className="h-4 w-4 text-yellow-500 mr-1" />
                            )}
                            {claim.status === "Approved" && (
                              <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                            )}
                            {claim.status === "Under Review" && (
                              <AlertTriangle className="h-4 w-4 text-orange-500 mr-1" />
                            )}
                            <span>{claim.status}</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost">View Details</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Fraud Alerts */}
            <Card>
              <CardHeader>
                <CardTitle>Fraud Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData.fraudAlerts.map((alert) => (
                    <div key={alert.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                        <AlertTriangle className="h-5 w-5 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{alert.type}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            alert.riskLevel === "High" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"
                          }`}>
                            {alert.riskLevel} Risk
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{alert.description}</p>
                      </div>
                      <Button variant="outline">Investigate</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Processing Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium">Average Processing Time</p>
                      <span className="text-sm text-muted-foreground">{dashboardData.performance.averageProcessingTime}</span>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium">Automation Rate</p>
                      <span className="text-sm text-muted-foreground">{dashboardData.performance.automationRate}</span>
                    </div>
                    <Progress value={82} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customer Satisfaction</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-[#07a6ec]">{dashboardData.performance.customerSatisfaction}</p>
                    <p className="text-sm text-muted-foreground">Average Rating</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{dashboardData.performance.fraudPreventionSavings}</p>
                    <p className="text-sm text-muted-foreground">Fraud Prevention Savings</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Claim Saathi Assistant */}
        {showAssistant && (
          <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 w-80 z-50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Image
                  src={getAssistantImage("chat")}
                  alt="Claim Saathi"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span className="font-medium">Claim Saathi</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowAssistant(false)}
              >
                ×
              </Button>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 rounded p-3 mb-3">
              <p className="text-sm">
                Hi! I'm here to help you manage your insurance operations. 
                What would you like to know?
              </p>
            </div>
            {/* Add chat interface here */}
          </div>
        )}
      </div>
    </>
  )
} 