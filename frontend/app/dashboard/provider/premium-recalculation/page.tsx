"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Calculator,
  Search,
  Filter,
  Brain,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  ArrowRight,
  FileText,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Download,
  BarChart3
} from "lucide-react"

// Comprehensive premium recalculation data
const premiumData = {
  stats: {
    totalPolicies: 3245,
    recalculatedToday: 128,
    averageChange: "+4.2%",
    aiAccuracy: "99.2%"
  },
  recalculationQueue: [
    {
      id: "RECALC-2024-001",
      policyId: "POL-H-123456",
      customerName: "Rahul Sharma",
      policyType: "Health Insurance",
      currentPremium: "₹24,500",
      status: "In Progress",
      progress: 65,
      priority: "High",
      reason: "Annual Review"
    },
    {
      id: "RECALC-2024-002",
      policyId: "POL-M-789012",
      customerName: "Priya Patel",
      policyType: "Motor Insurance",
      currentPremium: "₹12,800",
      status: "Queued",
      progress: 0,
      priority: "Medium",
      reason: "Risk Profile Change"
    },
    {
      id: "RECALC-2024-003",
      policyId: "POL-L-345678",
      customerName: "Amit Kumar",
      policyType: "Life Insurance",
      currentPremium: "₹35,000",
      status: "Queued",
      progress: 0,
      priority: "Low",
      reason: "Annual Review"
    }
  ],
  completedRecalculations: [
    {
      id: "RECALC-2024-004",
      policyId: "POL-H-901234",
      customerName: "Neha Singh",
      policyType: "Health Insurance",
      oldPremium: "₹18,500",
      newPremium: "₹19,200",
      changePercentage: "+3.8%",
      completedAt: "2024-03-20T14:30:00",
      factors: [
        { name: "Age Factor", impact: "+2.5%" },
        { name: "Medical History", impact: "+1.5%" },
        { name: "No Claim Bonus", impact: "-0.2%" }
      ]
    },
    {
      id: "RECALC-2024-005",
      policyId: "POL-M-567890",
      customerName: "Vikram Reddy",
      policyType: "Motor Insurance",
      oldPremium: "₹9,800",
      newPremium: "₹10,500",
      changePercentage: "+7.1%",
      completedAt: "2024-03-20T13:15:00",
      factors: [
        { name: "Vehicle Age", impact: "+3.0%" },
        { name: "Claim History", impact: "+4.5%" },
        { name: "Safety Features", impact: "-0.4%" }
      ]
    },
    {
      id: "RECALC-2024-006",
      policyId: "POL-H-234567",
      customerName: "Sanjay Gupta",
      policyType: "Health Insurance",
      oldPremium: "₹32,000",
      newPremium: "₹30,500",
      changePercentage: "-4.7%",
      completedAt: "2024-03-20T11:45:00",
      factors: [
        { name: "Improved Health Score", impact: "-5.0%" },
        { name: "No Claim Bonus", impact: "-2.0%" },
        { name: "Age Factor", impact: "+2.3%" }
      ]
    }
  ],
  aiInsights: {
    premiumTrends: {
      health: "+5.2%",
      motor: "+3.8%",
      life: "+1.5%",
      property: "+4.0%"
    },
    riskFactors: [
      { name: "Age", impact: "High" },
      { name: "Medical History", impact: "High" },
      { name: "Claim History", impact: "Medium" },
      { name: "Location", impact: "Medium" },
      { name: "Occupation", impact: "Low" }
    ],
    recommendations: [
      "Offer discounts for healthy lifestyle choices",
      "Implement telematics for motor insurance",
      "Adjust premiums based on preventive measures"
    ]
  }
}

export default function PremiumRecalculationPage() {
  const [expandedItem, setExpandedItem] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("queue")
  
  const toggleExpand = (id: string) => {
    if (expandedItem === id) {
      setExpandedItem(null)
    } else {
      setExpandedItem(id)
    }
  }
  
  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">AI Premium Recalculation</h1>
          <p className="text-muted-foreground">
            Intelligent premium adjustments based on risk profiles and market trends
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button className="bg-[#07a6ec] hover:bg-[#0696d7] flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Run Batch Recalculation
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Policies</p>
                <h3 className="text-2xl font-bold">{premiumData.stats.totalPolicies}</h3>
              </div>
              <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <FileText className="h-5 w-5 text-[#07a6ec]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Recalculated Today</p>
                <h3 className="text-2xl font-bold">{premiumData.stats.recalculatedToday}</h3>
              </div>
              <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <Calculator className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Average Change</p>
                <h3 className="text-2xl font-bold">{premiumData.stats.averageChange}</h3>
              </div>
              <div className="h-10 w-10 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">AI Accuracy</p>
                <h3 className="text-2xl font-bold">{premiumData.stats.aiAccuracy}</h3>
              </div>
              <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <Brain className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="queue" className="space-y-6" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 w-[450px]">
          <TabsTrigger value="queue">Recalculation Queue</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="queue" className="space-y-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search policies..." className="pl-10 w-[300px]" />
              </div>
              <select className="rounded-md border border-input bg-background px-3 py-2 text-sm">
                <option value="all">All Policy Types</option>
                <option value="health">Health Insurance</option>
                <option value="motor">Motor Insurance</option>
                <option value="life">Life Insurance</option>
              </select>
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>

          <div className="space-y-4">
            {premiumData.recalculationQueue.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div 
                  className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  onClick={() => toggleExpand(item.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      {item.status === "In Progress" ? (
                        <Clock className="h-5 w-5 text-[#07a6ec]" />
                      ) : (
                        <Calculator className="h-5 w-5 text-[#07a6ec]" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium">{item.customerName}</h3>
                      <p className="text-sm text-muted-foreground">{item.policyId} • {item.policyType}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div>
                      <p className="text-sm text-right">Current Premium</p>
                      <p className="font-medium">{item.currentPremium}</p>
                    </div>
                    <div>
                      <Badge className={
                        item.priority === "High" ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300" :
                        item.priority === "Medium" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300" :
                        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                      }>
                        {item.priority}
                      </Badge>
                    </div>
                    <div>
                      {expandedItem === item.id ? (
                        <ChevronUp className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </div>
                
                {expandedItem === item.id && (
                  <CardContent className="border-t pt-4">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Recalculation Details</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Status:</span>
                            <span className={
                              item.status === "In Progress" ? "text-blue-600" :
                              item.status === "Queued" ? "text-yellow-600" :
                              "text-green-600"
                            }>
                              {item.status}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Reason:</span>
                            <span>{item.reason}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Priority:</span>
                            <span>{item.priority}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Progress</h4>
                        {item.status === "In Progress" ? (
                          <div className="space-y-4">
                            <Progress value={item.progress} className="h-2" />
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>Data Collection</span>
                              <span>Risk Analysis</span>
                              <span>Final Calculation</span>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center h-12">
                            <span className="text-sm text-muted-foreground">Waiting to start</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex justify-end mt-4">
                      <Button variant="outline" className="mr-2">View Policy</Button>
                      {item.status === "Queued" && (
                        <Button className="bg-[#07a6ec] hover:bg-[#0696d7]">Start Recalculation</Button>
                      )}
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search completed recalculations..." className="pl-10 w-[300px]" />
              </div>
              <select className="rounded-md border border-input bg-background px-3 py-2 text-sm">
                <option value="all">All Policy Types</option>
                <option value="health">Health Insurance</option>
                <option value="motor">Motor Insurance</option>
                <option value="life">Life Insurance</option>
              </select>
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export Results
            </Button>
          </div>

          <div className="space-y-4">
            {premiumData.completedRecalculations.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div 
                  className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  onClick={() => toggleExpand(item.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">{item.customerName}</h3>
                      <p className="text-sm text-muted-foreground">{item.policyId} • {item.policyType}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <p className="text-sm">Old Premium</p>
                      <p className="font-medium">{item.oldPremium}</p>
                    </div>
                    <div className="flex items-center">
                      <ArrowRight className="h-5 w-5 text-muted-foreground mx-2" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm">New Premium</p>
                      <p className="font-medium">{item.newPremium}</p>
                    </div>
                    <div>
                      <Badge className={
                        item.changePercentage.startsWith("+") ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300" :
                        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                      }>
                        {item.changePercentage}
                      </Badge>
                    </div>
                    <div>
                      {expandedItem === item.id ? (
                        <ChevronUp className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </div>
                
                {expandedItem === item.id && (
                  <CardContent className="border-t pt-4">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Recalculation Factors</h4>
                        <div className="space-y-2">
                          {item.factors.map((factor, index) => (
                            <div key={index} className="flex justify-between items-center">
                              <span className="text-sm">{factor.name}</span>
                              <Badge className={
                                factor.impact.startsWith("+") ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300" :
                                "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                              }>
                                {factor.impact}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Summary</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Completed At:</span>
                            <span>{new Date(item.completedAt).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Old Premium:</span>
                            <span>{item.oldPremium}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">New Premium:</span>
                            <span className="font-medium">{item.newPremium}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Change:</span>
                            <span className={
                              item.changePercentage.startsWith("+") ? "text-red-600" : "text-green-600"
                            }>
                              {item.changePercentage}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end mt-4">
                      <Button variant="outline" className="mr-2">View Policy</Button>
                      <Button variant="outline" className="mr-2">Download Report</Button>
                      <Button className="bg-[#07a6ec] hover:bg-[#0696d7]">Notify Customer</Button>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Premium Trends by Insurance Type</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-60 flex items-center justify-center mb-4">
                  <BarChart3 className="h-40 w-40 text-muted-foreground" />
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Chart visualization would appear here</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {Object.entries(premiumData.aiInsights.premiumTrends).map(([type, trend]) => (
                    <div key={type} className="flex items-center justify-between">
                      <span className="capitalize">{type} Insurance</span>
                      <Badge className={
                        trend.startsWith("+") ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300" :
                        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                      }>
                        {trend}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk Factor Impact Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {premiumData.aiInsights.riskFactors.map((factor, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                        factor.impact === "High" ? "bg-red-100 dark:bg-red-900/30" :
                        factor.impact === "Medium" ? "bg-yellow-100 dark:bg-yellow-900/30" :
                        "bg-green-100 dark:bg-green-900/30"
                      }`}>
                        <AlertTriangle className={`h-5 w-5 ${
                          factor.impact === "High" ? "text-red-600" :
                          factor.impact === "Medium" ? "text-yellow-600" :
                          "text-green-600"
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{factor.name}</h4>
                        <p className="text-sm text-muted-foreground">Impact: {factor.impact}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>AI Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {premiumData.aiInsights.recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <Brain className="h-5 w-5 text-[#07a6ec]" />
                    </div>
                    <div>
                      <p>{recommendation}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Button className="bg-[#07a6ec] hover:bg-[#0696d7] w-full">Generate Detailed AI Report</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 