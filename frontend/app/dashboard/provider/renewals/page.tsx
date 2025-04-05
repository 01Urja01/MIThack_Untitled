"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Search,
  Filter,
  Download,
  FileText,
  Shield,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  ChevronDown,
  ChevronUp,
  Calendar,
  AlertTriangle,
  RefreshCw,
  Brain,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react"

// Comprehensive renewals data
const renewalsData = {
  stats: {
    totalRenewals: 180,
    dueThisMonth: 120,
    dueNextMonth: 180,
    renewalRate: "85%",
    aiProcessed: "78%"
  },
  upcomingRenewals: [
    {
      id: "POL-2023-H-567",
      customerName: "Amit Patel",
      type: "Health Insurance",
      currentPremium: "₹32,000/year",
      newPremium: "₹35,200/year",
      premiumChange: "+10%",
      expiryDate: "2024-04-15",
      status: "Due Soon",
      daysRemaining: 25,
      claimHistory: {
        total: 2,
        lastYear: 1
      },
      aiRecommendation: {
        action: "Renew with Standard Terms",
        confidence: 89,
        reason: "Good claim history, stable risk profile"
      }
    },
    {
      id: "POL-2023-M-678",
      customerName: "Priya Sharma",
      type: "Motor Insurance",
      currentPremium: "₹18,500/year",
      newPremium: "₹19,800/year",
      premiumChange: "+7%",
      expiryDate: "2024-04-05",
      status: "Due Soon",
      daysRemaining: 15,
      claimHistory: {
        total: 1,
        lastYear: 0
      },
      aiRecommendation: {
        action: "Renew with Discount",
        confidence: 92,
        reason: "No claims in last year, loyal customer"
      }
    },
    {
      id: "POL-2023-L-789",
      customerName: "Rajiv Malhotra",
      type: "Life Insurance",
      currentPremium: "₹28,500/year",
      newPremium: "₹31,350/year",
      premiumChange: "+10%",
      expiryDate: "2024-05-10",
      status: "Due Next Month",
      daysRemaining: 50,
      claimHistory: {
        total: 0,
        lastYear: 0
      },
      aiRecommendation: {
        action: "Renew with Standard Terms",
        confidence: 95,
        reason: "Age-based premium increase, good health profile"
      }
    },
    {
      id: "POL-2023-H-890",
      customerName: "Neha Singh",
      type: "Home Insurance",
      currentPremium: "₹12,500/year",
      newPremium: "₹13,750/year",
      premiumChange: "+10%",
      expiryDate: "2024-04-20",
      status: "Due Soon",
      daysRemaining: 30,
      claimHistory: {
        total: 1,
        lastYear: 0
      },
      aiRecommendation: {
        action: "Renew with Additional Coverage",
        confidence: 87,
        reason: "Property value increased, recommend higher coverage"
      }
    }
  ],
  recentRenewals: [
    {
      id: "POL-2023-H-123",
      customerName: "Rahul Sharma",
      type: "Health Insurance",
      oldPremium: "₹28,000/year",
      newPremium: "₹30,800/year",
      premiumChange: "+10%",
      renewalDate: "2024-03-15",
      status: "Renewed",
      termsChanged: "Yes",
      processedBy: "AI System"
    },
    {
      id: "POL-2023-M-456",
      customerName: "Anita Desai",
      type: "Motor Insurance",
      oldPremium: "₹15,000/year",
      newPremium: "₹15,000/year",
      premiumChange: "0%",
      renewalDate: "2024-03-12",
      status: "Renewed",
      termsChanged: "No",
      processedBy: "AI System"
    },
    {
      id: "POL-2023-L-789",
      customerName: "Vikram Reddy",
      type: "Life Insurance",
      oldPremium: "₹35,000/year",
      newPremium: "₹38,500/year",
      premiumChange: "+10%",
      renewalDate: "2024-03-10",
      status: "Renewed",
      termsChanged: "Yes",
      processedBy: "Sanjay Gupta"
    }
  ],
  renewalMetrics: {
    renewalRate: {
      thisMonth: "85%",
      lastMonth: "82%",
      growth: "+3%"
    },
    averagePremiumIncrease: {
      thisMonth: "8.5%",
      lastMonth: "7.2%",
      growth: "+1.3%"
    },
    aiProcessingRate: {
      thisMonth: "78%",
      lastMonth: "65%",
      growth: "+13%"
    },
    renewalByType: {
      health: { rate: "88%", trend: "+2%" },
      motor: { rate: "92%", trend: "+5%" },
      life: { rate: "95%", trend: "+1%" },
      home: { rate: "78%", trend: "-3%" }
    }
  }
}

export default function RenewalsPage() {
  const [expandedItem, setExpandedItem] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  
  const toggleExpand = (id: string) => {
    if (expandedItem === id) {
      setExpandedItem(null)
    } else {
      setExpandedItem(id)
    }
  }
  
  const filteredRenewals = renewalsData.upcomingRenewals.filter(renewal => {
    // Apply status filter
    if (statusFilter !== "all" && !renewal.status.toLowerCase().includes(statusFilter.toLowerCase())) {
      return false
    }
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        renewal.id.toLowerCase().includes(query) ||
        renewal.customerName.toLowerCase().includes(query) ||
        renewal.type.toLowerCase().includes(query)
      )
    }
    
    return true
  })
  
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "due soon":
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">{status}</Badge>
      case "due next month":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">{status}</Badge>
      case "renewed":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">{status}</Badge>
      case "expired":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">{status}</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }
  
  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Policy Renewals</h1>
          <p className="text-muted-foreground">
            Manage upcoming policy renewals and review recent renewals
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Date Range
          </Button>
          <Button className="bg-[#07a6ec] hover:bg-[#0696d7] flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Renewals
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Renewals</p>
                <h3 className="text-2xl font-bold">{renewalsData.stats.totalRenewals}</h3>
              </div>
              <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <RefreshCw className="h-5 w-5 text-[#07a6ec]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Due This Month</p>
                <h3 className="text-2xl font-bold">{renewalsData.stats.dueThisMonth}</h3>
              </div>
              <div className="h-10 w-10 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Due Next Month</p>
                <h3 className="text-2xl font-bold">{renewalsData.stats.dueNextMonth}</h3>
              </div>
              <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-[#07a6ec]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Renewal Rate</p>
                <h3 className="text-2xl font-bold">{renewalsData.stats.renewalRate}</h3>
              </div>
              <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">AI Processed</p>
                <h3 className="text-2xl font-bold">{renewalsData.stats.aiProcessed}</h3>
              </div>
              <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <Brain className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-6">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming Renewals</TabsTrigger>
          <TabsTrigger value="recent">Recent Renewals</TabsTrigger>
          <TabsTrigger value="metrics">Renewal Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search renewals..." className="pl-10 w-[300px]" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              </div>
              <select 
                className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="due soon">Due Soon</option>
                <option value="due next month">Due Next Month</option>
              </select>
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>

          <div className="space-y-4">
            {filteredRenewals.length > 0 ? (
              filteredRenewals.map((renewal) => (
                <Card key={renewal.id} className="overflow-hidden">
                  <div 
                    className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50"
                    onClick={() => toggleExpand(renewal.id)}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                        renewal.status === "Due Soon" ? "bg-yellow-100 dark:bg-yellow-900/30" :
                        "bg-blue-100 dark:bg-blue-900/30"
                      }`}>
                        {renewal.status === "Due Soon" ? (
                          <Clock className="h-5 w-5 text-yellow-600" />
                        ) : (
                          <Calendar className="h-5 w-5 text-blue-600" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium">{renewal.customerName}</h3>
                        <p className="text-sm text-muted-foreground">{renewal.id} • {renewal.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div>
                        <p className="text-sm text-right">Current Premium</p>
                        <p className="font-medium">{renewal.currentPremium}</p>
                      </div>
                      <div>
                        <p className="text-sm text-right">New Premium</p>
                        <p className="font-medium">{renewal.newPremium}</p>
                      </div>
                      <div>
                        <p className="text-sm text-right">Change</p>
                        <p className="font-medium text-red-600">{renewal.premiumChange}</p>
                      </div>
                      <div>
                        <p className="text-sm text-right">Expiry Date</p>
                        <p className="font-medium">{new Date(renewal.expiryDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        {getStatusBadge(renewal.status)}
                      </div>
                      <div>
                        {expandedItem === renewal.id ? (
                          <ChevronUp className="h-5 w-5 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {expandedItem === renewal.id && (
                    <CardContent className="border-t pt-4">
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-sm font-medium mb-2">Renewal Details</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Policy ID:</span>
                              <span>{renewal.id}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Customer:</span>
                              <span>{renewal.customerName}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Insurance Type:</span>
                              <span>{renewal.type}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Current Premium:</span>
                              <span>{renewal.currentPremium}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">New Premium:</span>
                              <span>{renewal.newPremium}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Premium Change:</span>
                              <span className="text-red-600">{renewal.premiumChange}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Expiry Date:</span>
                              <span>{new Date(renewal.expiryDate).toLocaleDateString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Days Remaining:</span>
                              <span>{renewal.daysRemaining} days</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Claim History:</span>
                              <span>{renewal.claimHistory.total} total, {renewal.claimHistory.lastYear} last year</span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium mb-2">AI Recommendation</h4>
                          <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 space-y-3">
                            <div className="flex items-center gap-2">
                              <Brain className="h-5 w-5 text-[#07a6ec]" />
                              <span className="font-medium">Recommendation: {renewal.aiRecommendation.action}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm">Confidence: {renewal.aiRecommendation.confidence}%</span>
                            </div>
                            <div className="text-sm">
                              <span className="text-muted-foreground">Reason: </span>
                              <span>{renewal.aiRecommendation.reason}</span>
                            </div>
                          </div>
                          
                          <div className="mt-6 space-y-4">
                            <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                              <Eye className="h-4 w-4" />
                              View Policy Details
                            </Button>
                            
                            <div className="flex gap-4">
                              <Button variant="outline" className="flex-1">
                                Modify Terms
                              </Button>
                              <Button className="flex-1 bg-[#07a6ec] hover:bg-[#0696d7]">
                                Process Renewal
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No renewals match your search criteria</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="recent" className="space-y-6">
          <div className="space-y-4">
            {renewalsData.recentRenewals.map((renewal) => (
              <Card key={renewal.id} className="overflow-hidden">
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">{renewal.customerName}</h3>
                      <p className="text-sm text-muted-foreground">{renewal.id} • {renewal.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div>
                      <p className="text-sm text-right">Old Premium</p>
                      <p className="font-medium">{renewal.oldPremium}</p>
                    </div>
                    <div>
                      <p className="text-sm text-right">New Premium</p>
                      <p className="font-medium">{renewal.newPremium}</p>
                    </div>
                    <div>
                      <p className="text-sm text-right">Change</p>
                      <p className={`font-medium ${renewal.premiumChange !== "0%" ? "text-red-600" : ""}`}>
                        {renewal.premiumChange}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-right">Renewal Date</p>
                      <p className="font-medium">{new Date(renewal.renewalDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-right">Terms Changed</p>
                      <p className="font-medium">{renewal.termsChanged}</p>
                    </div>
                    <div>
                      <p className="text-sm text-right">Processed By</p>
                      <p className="font-medium">{renewal.processedBy}</p>
                    </div>
                    <div>
                      {getStatusBadge(renewal.status)}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="h-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="h-8">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Renewal Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="text-center">
                    <p className="text-5xl font-bold text-[#07a6ec]">{renewalsData.renewalMetrics.renewalRate.thisMonth}</p>
                    <p className="text-sm text-muted-foreground mt-1">This Month</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xl font-medium">{renewalsData.renewalMetrics.renewalRate.lastMonth}</p>
                      <p className="text-sm text-muted-foreground">Last Month</p>
                    </div>
                    <div className="flex items-center gap-1 text-green-600">
                      <ArrowUpRight className="h-4 w-4" />
                      <span>{renewalsData.renewalMetrics.renewalRate.growth}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Average Premium Increase</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="text-center">
                    <p className="text-5xl font-bold text-[#07a6ec]">{renewalsData.renewalMetrics.averagePremiumIncrease.thisMonth}</p>
                    <p className="text-sm text-muted-foreground mt-1">This Month</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xl font-medium">{renewalsData.renewalMetrics.averagePremiumIncrease.lastMonth}</p>
                      <p className="text-sm text-muted-foreground">Last Month</p>
                    </div>
                    <div className="flex items-center gap-1 text-red-600">
                      <ArrowUpRight className="h-4 w-4" />
                      <span>{renewalsData.renewalMetrics.averagePremiumIncrease.growth}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI Processing Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="text-center">
                    <p className="text-5xl font-bold text-[#07a6ec]">{renewalsData.renewalMetrics.aiProcessingRate.thisMonth}</p>
                    <p className="text-sm text-muted-foreground mt-1">This Month</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xl font-medium">{renewalsData.renewalMetrics.aiProcessingRate.lastMonth}</p>
                      <p className="text-sm text-muted-foreground">Last Month</p>
                    </div>
                    <div className="flex items-center gap-1 text-green-600">
                      <ArrowUpRight className="h-4 w-4" />
                      <span>{renewalsData.renewalMetrics.aiProcessingRate.growth}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Renewal by Insurance Type</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-60 flex items-center justify-center mb-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Chart visualization would appear here</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {Object.entries(renewalsData.renewalMetrics.renewalByType).map(([type, data]) => (
                    <div key={type} className="flex items-center justify-between">
                      <span className="capitalize">{type} Insurance</span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{data.rate}</span>
                        <span className={data.trend.startsWith("+") ? "text-green-600" : "text-red-600"}>
                          {data.trend}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Renewal Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-60 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Monthly renewal trend chart would appear here</p>
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