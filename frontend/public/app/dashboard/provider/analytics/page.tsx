"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  BarChart3,
  PieChart,
  LineChart,
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Users,
  Shield,
  FileText,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from "lucide-react"

// Comprehensive analytics data
const analyticsData = {
  overview: {
    totalPremium: {
      value: "₹4.8Cr",
      trend: "+12.5%",
      isPositive: true
    },
    claimsRatio: {
      value: "68%",
      trend: "-3.2%",
      isPositive: true
    },
    customerRetention: {
      value: "92%",
      trend: "+2.1%",
      isPositive: true
    },
    fraudDetection: {
      value: "₹1.2Cr",
      trend: "+15.3%",
      isPositive: true
    }
  },
  claimsTrend: {
    monthly: [
      { month: "Jan", claims: 120, approved: 95, rejected: 25 },
      { month: "Feb", claims: 135, approved: 110, rejected: 25 },
      { month: "Mar", claims: 150, approved: 125, rejected: 25 },
      { month: "Apr", claims: 140, approved: 115, rejected: 25 },
      { month: "May", claims: 160, approved: 130, rejected: 30 },
      { month: "Jun", claims: 175, approved: 145, rejected: 30 }
    ]
  },
  policyDistribution: {
    health: 45,
    motor: 30,
    life: 15,
    property: 10
  },
  customerSegmentation: {
    age: {
      "18-25": 15,
      "26-35": 35,
      "36-45": 25,
      "46-55": 15,
      "56+": 10
    },
    gender: {
      male: 55,
      female: 45
    },
    location: {
      metro: 65,
      tier2: 25,
      rural: 10
    }
  },
  riskAnalysis: {
    lowRisk: 65,
    mediumRisk: 25,
    highRisk: 10
  },
  aiPerformance: {
    accuracyRate: 98.5,
    falsePositives: 1.2,
    processingTime: "3.5s",
    costSavings: "₹85L"
  }
}

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("6months")
  
  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Comprehensive insights and performance metrics
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Last 6 Months
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Premium</p>
                <h3 className="text-2xl font-bold">{analyticsData.overview.totalPremium.value}</h3>
              </div>
              <div className={`flex items-center ${
                analyticsData.overview.totalPremium.isPositive ? "text-green-500" : "text-red-500"
              }`}>
                {analyticsData.overview.totalPremium.isPositive ? (
                  <ArrowUpRight className="h-4 w-4" />
                ) : (
                  <ArrowDownRight className="h-4 w-4" />
                )}
                <span className="ml-1">{analyticsData.overview.totalPremium.trend}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Claims Ratio</p>
                <h3 className="text-2xl font-bold">{analyticsData.overview.claimsRatio.value}</h3>
              </div>
              <div className={`flex items-center ${
                analyticsData.overview.claimsRatio.isPositive ? "text-green-500" : "text-red-500"
              }`}>
                {analyticsData.overview.claimsRatio.isPositive ? (
                  <ArrowDownRight className="h-4 w-4" />
                ) : (
                  <ArrowUpRight className="h-4 w-4" />
                )}
                <span className="ml-1">{analyticsData.overview.claimsRatio.trend}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Customer Retention</p>
                <h3 className="text-2xl font-bold">{analyticsData.overview.customerRetention.value}</h3>
              </div>
              <div className={`flex items-center ${
                analyticsData.overview.customerRetention.isPositive ? "text-green-500" : "text-red-500"
              }`}>
                {analyticsData.overview.customerRetention.isPositive ? (
                  <ArrowUpRight className="h-4 w-4" />
                ) : (
                  <ArrowDownRight className="h-4 w-4" />
                )}
                <span className="ml-1">{analyticsData.overview.customerRetention.trend}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Fraud Prevention Savings</p>
                <h3 className="text-2xl font-bold">{analyticsData.overview.fraudDetection.value}</h3>
              </div>
              <div className={`flex items-center ${
                analyticsData.overview.fraudDetection.isPositive ? "text-green-500" : "text-red-500"
              }`}>
                {analyticsData.overview.fraudDetection.isPositive ? (
                  <ArrowUpRight className="h-4 w-4" />
                ) : (
                  <ArrowDownRight className="h-4 w-4" />
                )}
                <span className="ml-1">{analyticsData.overview.fraudDetection.trend}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-[600px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="claims">Claims Analysis</TabsTrigger>
          <TabsTrigger value="customers">Customer Insights</TabsTrigger>
          <TabsTrigger value="ai">AI Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Claims Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center">
                  <BarChart3 className="h-40 w-40 text-muted-foreground" />
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Chart visualization would appear here</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-[#07a6ec]">1,250</p>
                    <p className="text-sm text-muted-foreground">Total Claims</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">980</p>
                    <p className="text-sm text-muted-foreground">Approved</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-red-600">270</p>
                    <p className="text-sm text-muted-foreground">Rejected</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Policy Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center">
                  <PieChart className="h-40 w-40 text-muted-foreground" />
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Chart visualization would appear here</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {Object.entries(analyticsData.policyDistribution).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="capitalize">{key}</span>
                      <span className="font-medium">{value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Risk Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Low Risk Policies</span>
                    <span>{analyticsData.riskAnalysis.lowRisk}%</span>
                  </div>
                  <Progress value={analyticsData.riskAnalysis.lowRisk} className="h-2 bg-gray-200">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: `${analyticsData.riskAnalysis.lowRisk}%` }} />
                  </Progress>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Medium Risk Policies</span>
                    <span>{analyticsData.riskAnalysis.mediumRisk}%</span>
                  </div>
                  <Progress value={analyticsData.riskAnalysis.mediumRisk} className="h-2 bg-gray-200">
                    <div className="h-full bg-yellow-500 rounded-full" style={{ width: `${analyticsData.riskAnalysis.mediumRisk}%` }} />
                  </Progress>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>High Risk Policies</span>
                    <span>{analyticsData.riskAnalysis.highRisk}%</span>
                  </div>
                  <Progress value={analyticsData.riskAnalysis.highRisk} className="h-2 bg-gray-200">
                    <div className="h-full bg-red-500 rounded-full" style={{ width: `${analyticsData.riskAnalysis.highRisk}%` }} />
                  </Progress>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="claims" className="space-y-6">
          {/* Claims Analysis Content */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Claims Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center">
                <LineChart className="h-40 w-40 text-muted-foreground" />
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Chart visualization would appear here</p>
                </div>
              </div>
              <div className="grid grid-cols-6 gap-2 mt-4">
                {analyticsData.claimsTrend.monthly.map((month) => (
                  <div key={month.month} className="text-center">
                    <p className="font-medium">{month.month}</p>
                    <p className="text-sm">{month.claims}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Claims by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Health Insurance</span>
                    <span className="font-medium">45%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Motor Insurance</span>
                    <span className="font-medium">30%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Life Insurance</span>
                    <span className="font-medium">15%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Property Insurance</span>
                    <span className="font-medium">10%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Claims Settlement Ratio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <p className="text-4xl font-bold text-[#07a6ec]">92.5%</p>
                  <p className="text-sm text-muted-foreground">Overall Settlement Ratio</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Health</span>
                      <span>94%</span>
                    </div>
                    <Progress value={94} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Motor</span>
                      <span>91%</span>
                    </div>
                    <Progress value={91} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Life</span>
                      <span>96%</span>
                    </div>
                    <Progress value={96} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="customers" className="space-y-6">
          {/* Customer Insights Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Age Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-60 flex items-center justify-center">
                  <PieChart className="h-40 w-40 text-muted-foreground" />
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Chart visualization would appear here</p>
                  </div>
                </div>
                <div className="space-y-2 mt-4">
                  {Object.entries(analyticsData.customerSegmentation.age).map(([age, percentage]) => (
                    <div key={age} className="flex items-center justify-between">
                      <span>{age}</span>
                      <span className="font-medium">{percentage}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Location Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-60 flex items-center justify-center">
                  <PieChart className="h-40 w-40 text-muted-foreground" />
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Chart visualization would appear here</p>
                  </div>
                </div>
                <div className="space-y-2 mt-4">
                  {Object.entries(analyticsData.customerSegmentation.location).map(([location, percentage]) => (
                    <div key={location} className="flex items-center justify-between">
                      <span className="capitalize">{location}</span>
                      <span className="font-medium">{percentage}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Customer Retention Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-4xl font-bold text-[#07a6ec]">92%</p>
                  <p className="text-sm text-muted-foreground">Retention Rate</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-green-600">85%</p>
                  <p className="text-sm text-muted-foreground">Policy Renewals</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-yellow-600">4.8/5</p>
                  <p className="text-sm text-muted-foreground">Customer Satisfaction</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai" className="space-y-6">
          {/* AI Performance Content */}
          <Card>
            <CardHeader>
              <CardTitle>AI Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <p className="text-4xl font-bold text-[#07a6ec]">{analyticsData.aiPerformance.accuracyRate}%</p>
                  <p className="text-sm text-muted-foreground">Accuracy Rate</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-red-600">{analyticsData.aiPerformance.falsePositives}%</p>
                  <p className="text-sm text-muted-foreground">False Positives</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-green-600">{analyticsData.aiPerformance.processingTime}</p>
                  <p className="text-sm text-muted-foreground">Avg. Processing Time</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-yellow-600">{analyticsData.aiPerformance.costSavings}</p>
                  <p className="text-sm text-muted-foreground">Cost Savings</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Fraud Detection</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Document Manipulation</h4>
                      <p className="text-sm text-muted-foreground">35% of fraud cases</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Multiple Claims</h4>
                      <p className="text-sm text-muted-foreground">28% of fraud cases</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Identity Fraud</h4>
                      <p className="text-sm text-muted-foreground">22% of fraud cases</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI Processing Efficiency</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Automated Processing</span>
                      <span>82%</span>
                    </div>
                    <Progress value={82} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Manual Review Required</span>
                      <span>18%</span>
                    </div>
                    <Progress value={18} className="h-2" />
                  </div>
                  <div className="pt-4">
                    <p className="text-sm text-muted-foreground">Processing Time Improvement</p>
                    <div className="flex items-center justify-between mt-2">
                      <span>Traditional Process</span>
                      <span>48 hours</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>AI-Powered Process</span>
                      <span className="text-green-600 font-medium">3.5 seconds</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 