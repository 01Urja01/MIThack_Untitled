"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Shield,
  Search,
  Filter,
  AlertTriangle,
  Clock,
  CheckCircle,
  Calculator,
  FileText,
  Download,
  Plus,
  RefreshCw
} from "lucide-react"

// Comprehensive mock data for policies
const policiesData = {
  stats: {
    totalPolicies: 3245,
    activePolicies: 2890,
    pendingRenewals: 156,
    premiumRevenue: "₹4.2Cr",
    growthRate: "+12.5%"
  },
  policyTypes: {
    health: {
      count: 1450,
      premium: "₹2.1Cr",
      claims: 245,
      renewalRate: 92
    },
    motor: {
      count: 980,
      premium: "₹1.3Cr",
      claims: 180,
      renewalRate: 88
    },
    life: {
      count: 520,
      premium: "₹0.8Cr",
      claims: 45,
      renewalRate: 95
    }
  },
  activePolicies: [
    {
      id: "POL-2024-H-1234",
      customerName: "Rajesh Kumar",
      type: "Health Insurance",
      plan: "Family Floater",
      premium: "₹45,000/year",
      sumInsured: "₹50,00,000",
      startDate: "2024-01-15",
      endDate: "2025-01-14",
      status: "Active",
      members: 4,
      claims: 1,
      lastClaim: "2024-02-20",
      riskScore: 82,
      paymentStatus: "Paid",
      documents: ["KYC", "Medical Reports", "Age Proof"]
    },
    {
      id: "POL-2024-M-789",
      customerName: "Priya Sharma",
      type: "Motor Insurance",
      plan: "Comprehensive",
      premium: "₹18,500/year",
      sumInsured: "₹8,00,000",
      startDate: "2024-02-01",
      endDate: "2025-01-31",
      status: "Active",
      vehicle: "KA-01-MM-1234",
      model: "Honda City",
      year: "2022",
      claims: 0,
      riskScore: 95,
      paymentStatus: "Paid",
      documents: ["RC Book", "Insurance Transfer", "Inspection Report"]
    }
  ],
  renewals: [
    {
      id: "POL-2023-H-567",
      customerName: "Amit Patel",
      type: "Health Insurance",
      currentPremium: "₹32,000/year",
      newPremium: "₹35,200/year",
      expiryDate: "2024-04-15",
      claimHistory: {
        total: 2,
        lastYear: 1
      },
      aiRecommendation: {
        action: "Renew with Standard Terms",
        confidence: 89,
        reason: "Good claim history, stable risk profile"
      }
    }
  ],
  premiumCalculations: [
    {
      id: "CALC-2024-001",
      policyType: "Health",
      calculatedAt: "2024-03-20T10:30:00",
      status: "Completed",
      baseAmount: "₹40,000",
      finalPremium: "₹45,000",
      factors: [
        { name: "Age Factor", impact: "+10%" },
        { name: "Medical History", impact: "+5%" },
        { name: "No Claim Bonus", impact: "-5%" }
      ]
    }
  ]
}

export default function PoliciesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("active")

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Policy Management</h1>
          <p className="text-muted-foreground">
            Manage and track all insurance policies
          </p>
        </div>
        <Button className="bg-[#07a6ec] hover:bg-[#0696d7]">
          <Plus className="mr-2 h-4 w-4" />
          New Policy
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Policies</p>
                <h3 className="text-2xl font-bold">{policiesData.stats.totalPolicies}</h3>
                <p className="text-sm text-green-600">{policiesData.stats.growthRate} from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Add more stat cards */}
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="active">Active Policies</TabsTrigger>
            <TabsTrigger value="renewal">Renewals</TabsTrigger>
            <TabsTrigger value="premium">Premium Calculation</TabsTrigger>
          </TabsList>
          
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search policies..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        <TabsContent value="active">
          <div className="space-y-4">
            {policiesData.activePolicies.map((policy) => (
              <Card key={policy.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-medium">{policy.customerName}</h3>
                        <Badge variant="outline">{policy.id}</Badge>
                        <Badge className="bg-green-100 text-green-800">
                          {policy.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {policy.type} • {policy.plan} • Premium: {policy.premium}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button variant="outline">View Details</Button>
                      <Button className="bg-[#07a6ec]">Manage Policy</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="renewal">
          <div className="space-y-4">
            {policiesData.renewals.map(renewal => (
              <Card key={renewal.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-medium">{renewal.customerName}</h3>
                        <Badge variant="outline">{renewal.id}</Badge>
                        <Badge className="bg-yellow-100 text-yellow-800">
                          Expires in {Math.ceil((new Date(renewal.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Current Premium: {renewal.currentPremium} • New Premium: {renewal.newPremium}
                      </div>
                      <div className="mt-4 bg-blue-50 p-3 rounded-lg">
                        <p className="text-sm font-medium">AI Recommendation:</p>
                        <p className="text-sm">{renewal.aiRecommendation.action} ({renewal.aiRecommendation.confidence}% confidence)</p>
                        <p className="text-sm text-muted-foreground">{renewal.aiRecommendation.reason}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button variant="outline">Review</Button>
                      <Button className="bg-[#07a6ec]">Process Renewal</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="premium">
          <div className="space-y-4">
            {policiesData.premiumCalculations.map(calc => (
              <Card key={calc.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-medium">{calc.policyType} Insurance Premium Calculation</h3>
                      <p className="text-sm text-muted-foreground">
                        Calculated on {new Date(calc.calculatedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">
                      {calc.status}
                    </Badge>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium">Base Premium: {calc.baseAmount}</p>
                      <div className="mt-2 space-y-2">
                        {calc.factors.map(factor => (
                          <div key={factor.name} className="flex items-center justify-between text-sm">
                            <span>{factor.name}</span>
                            <span className={factor.impact.startsWith('+') ? 'text-red-600' : 'text-green-600'}>
                              {factor.impact}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="pt-4 border-t">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Final Premium</span>
                        <span className="font-medium text-lg">{calc.finalPremium}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 