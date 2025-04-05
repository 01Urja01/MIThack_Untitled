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
  DollarSign,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  ChevronDown,
  ChevronUp,
  Calendar,
  AlertTriangle,
  Brain,
  Wallet,
  Bank,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react"

// Comprehensive claim payments data
const claimPaymentsData = {
  stats: {
    pendingApprovals: 45,
    approvedToday: 28,
    disbursedToday: "₹12.5L",
    averageProcessingTime: "4.2 hours"
  },
  pendingApprovals: [
    {
      id: "CLMPAY-2024-001",
      claimId: "CLM-2024-001",
      customerName: "Rahul Sharma",
      policyNumber: "POL-H-123456",
      type: "Health Insurance",
      amount: "₹45,000",
      submittedDate: "2024-03-20",
      status: "Pending Approval",
      priority: "High",
      riskScore: 85,
      aiRecommendation: {
        action: "Approve",
        confidence: 92,
        notes: "All documents verified, claim amount within policy limits"
      },
      paymentMethod: "Bank Transfer",
      bankDetails: {
        accountNumber: "XXXX1234",
        bankName: "HDFC Bank",
        ifscCode: "HDFC0001234"
      }
    },
    {
      id: "CLMPAY-2024-002",
      claimId: "CLM-2024-002",
      customerName: "Priya Patel",
      policyNumber: "POL-M-789012",
      type: "Motor Insurance",
      amount: "₹75,000",
      submittedDate: "2024-03-19",
      status: "Pending Approval",
      priority: "Medium",
      riskScore: 78,
      aiRecommendation: {
        action: "Review",
        confidence: 75,
        notes: "Repair estimate higher than expected for vehicle model"
      },
      paymentMethod: "Bank Transfer",
      bankDetails: {
        accountNumber: "XXXX5678",
        bankName: "ICICI Bank",
        ifscCode: "ICIC0002345"
      }
    },
    {
      id: "CLMPAY-2024-003",
      claimId: "CLM-2024-003",
      customerName: "Amit Kumar",
      policyNumber: "POL-H-345678",
      type: "Health Insurance",
      amount: "₹25,000",
      submittedDate: "2024-03-18",
      status: "Pending Approval",
      priority: "Low",
      riskScore: 95,
      aiRecommendation: {
        action: "Approve",
        confidence: 98,
        notes: "Routine claim with complete documentation"
      },
      paymentMethod: "Bank Transfer",
      bankDetails: {
        accountNumber: "XXXX9012",
        bankName: "SBI",
        ifscCode: "SBIN0003456"
      }
    }
  ],
  recentDisbursements: [
    {
      id: "CLMPAY-2024-004",
      claimId: "CLM-2024-004",
      customerName: "Vikram Reddy",
      policyNumber: "POL-M-567890",
      type: "Motor Insurance",
      amount: "₹35,000",
      approvedDate: "2024-03-16",
      disbursedDate: "2024-03-17",
      status: "Disbursed",
      paymentMethod: "Bank Transfer",
      transactionId: "TXN123456789",
      approvedBy: "Rajesh Mehta"
    },
    {
      id: "CLMPAY-2024-005",
      claimId: "CLM-2024-005",
      customerName: "Neha Singh",
      policyNumber: "POL-H-678901",
      type: "Health Insurance",
      amount: "₹52,000",
      approvedDate: "2024-03-15",
      disbursedDate: "2024-03-16",
      status: "Disbursed",
      paymentMethod: "Bank Transfer",
      transactionId: "TXN987654321",
      approvedBy: "Priya Sharma"
    },
    {
      id: "CLMPAY-2024-006",
      claimId: "CLM-2024-006",
      customerName: "Sanjay Gupta",
      policyNumber: "POL-H-789012",
      type: "Health Insurance",
      amount: "₹38,000",
      approvedDate: "2024-03-14",
      disbursedDate: "2024-03-15",
      status: "Disbursed",
      paymentMethod: "Bank Transfer",
      transactionId: "TXN456789123",
      approvedBy: "Amit Patel"
    }
  ],
  disbursementMetrics: {
    totalDisbursed: {
      thisMonth: "₹1.8Cr",
      lastMonth: "₹1.5Cr",
      growth: "+20%"
    },
    averageDisbursementTime: {
      thisMonth: "1.2 days",
      lastMonth: "1.8 days",
      improvement: "33%"
    },
    disbursementByType: {
      health: "₹85L",
      motor: "₹45L",
      life: "₹35L",
      property: "₹15L"
    }
  }
}

export default function ClaimPaymentsPage() {
  const [expandedItem, setExpandedItem] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [priorityFilter, setPriorityFilter] = useState("all")
  
  const toggleExpand = (id: string) => {
    if (expandedItem === id) {
      setExpandedItem(null)
    } else {
      setExpandedItem(id)
    }
  }
  
  const filteredApprovals = claimPaymentsData.pendingApprovals.filter(payment => {
    // Apply priority filter
    if (priorityFilter !== "all" && payment.priority.toLowerCase() !== priorityFilter.toLowerCase()) {
      return false
    }
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        payment.id.toLowerCase().includes(query) ||
        payment.customerName.toLowerCase().includes(query) ||
        payment.policyNumber.toLowerCase().includes(query) ||
        payment.claimId.toLowerCase().includes(query)
      )
    }
    
    return true
  })
  
  const getPriorityBadge = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">{priority}</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">{priority}</Badge>
      case "low":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">{priority}</Badge>
      default:
        return <Badge>{priority}</Badge>
    }
  }
  
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "disbursed":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">{status}</Badge>
      case "pending approval":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">{status}</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }
  
  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Claim Payment Approvals</h1>
          <p className="text-muted-foreground">
            Review and approve claim payments
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Date Range
          </Button>
          <Button className="bg-[#07a6ec] hover:bg-[#0696d7] flex items-center gap-2">
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
                <p className="text-sm font-medium text-muted-foreground">Pending Approvals</p>
                <h3 className="text-2xl font-bold">{claimPaymentsData.stats.pendingApprovals}</h3>
              </div>
              <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Clock className="h-5 w-5 text-[#07a6ec]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Approved Today</p>
                <h3 className="text-2xl font-bold">{claimPaymentsData.stats.approvedToday}</h3>
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
                <p className="text-sm font-medium text-muted-foreground">Disbursed Today</p>
                <h3 className="text-2xl font-bold">{claimPaymentsData.stats.disbursedToday}</h3>
              </div>
              <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Processing Time</p>
                <h3 className="text-2xl font-bold">{claimPaymentsData.stats.averageProcessingTime}</h3>
              </div>
              <div className="h-10 w-10 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList>
          <TabsTrigger value="pending">Pending Approvals</TabsTrigger>
          <TabsTrigger value="recent">Recent Disbursements</TabsTrigger>
          <TabsTrigger value="metrics">Disbursement Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by claim ID, customer name, or policy number..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <select 
                  className="bg-transparent outline-none"
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                >
                  <option value="all">All Priorities</option>
                  <option value="high">High Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="low">Low Priority</option>
                </select>
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {filteredApprovals.length > 0 ? (
              filteredApprovals.map((payment) => (
                <Card key={payment.id} className="overflow-hidden">
                  <div 
                    className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50"
                    onClick={() => toggleExpand(payment.id)}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                        payment.priority === "High" ? "bg-red-100 dark:bg-red-900/30" :
                        payment.priority === "Medium" ? "bg-yellow-100 dark:bg-yellow-900/30" :
                        "bg-green-100 dark:bg-green-900/30"
                      }`}>
                        {payment.priority === "High" ? (
                          <AlertTriangle className="h-5 w-5 text-red-600" />
                        ) : payment.priority === "Medium" ? (
                          <Clock className="h-5 w-5 text-yellow-600" />
                        ) : (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium">{payment.customerName}</h3>
                        <p className="text-sm text-muted-foreground">{payment.claimId} • {payment.policyNumber}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div>
                        <p className="text-sm text-right">Type</p>
                        <p className="font-medium">{payment.type}</p>
                      </div>
                      <div>
                        <p className="text-sm text-right">Amount</p>
                        <p className="font-medium">{payment.amount}</p>
                      </div>
                      <div>
                        <p className="text-sm text-right">Submitted</p>
                        <p className="font-medium">{new Date(payment.submittedDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        {getPriorityBadge(payment.priority)}
                      </div>
                      <div>
                        {expandedItem === payment.id ? (
                          <ChevronUp className="h-5 w-5 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {expandedItem === payment.id && (
                    <CardContent className="border-t pt-4">
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-sm font-medium mb-2">Payment Details</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Payment ID:</span>
                              <span>{payment.id}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Claim ID:</span>
                              <span>{payment.claimId}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Policy Number:</span>
                              <span>{payment.policyNumber}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Customer:</span>
                              <span>{payment.customerName}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Type:</span>
                              <span>{payment.type}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Amount:</span>
                              <span>{payment.amount}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Submitted:</span>
                              <span>{new Date(payment.submittedDate).toLocaleDateString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Status:</span>
                              <span>{payment.status}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Priority:</span>
                              <span>{payment.priority}</span>
                            </div>
                          </div>
                          
                          <h4 className="text-sm font-medium mt-4 mb-2">Bank Details</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Payment Method:</span>
                              <span>{payment.paymentMethod}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Account Number:</span>
                              <span>{payment.bankDetails.accountNumber}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Bank Name:</span>
                              <span>{payment.bankDetails.bankName}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">IFSC Code:</span>
                              <span>{payment.bankDetails.ifscCode}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium mb-2">AI Assessment</h4>
                          <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 space-y-3">
                            <div className="flex items-center gap-2">
                              <Brain className="h-5 w-5 text-[#07a6ec]" />
                              <span className="font-medium">AI Recommendation: {payment.aiRecommendation.action}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm">Confidence: {payment.aiRecommendation.confidence}%</span>
                            </div>
                            <div className="text-sm">
                              <span className="text-muted-foreground">Notes: </span>
                              <span>{payment.aiRecommendation.notes}</span>
                            </div>
                            <div className="pt-2">
                              <div className="flex justify-between mb-1 text-xs">
                                <span>Risk Score</span>
                                <span>{payment.riskScore}/100</span>
                              </div>
                              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full ${
                                    payment.riskScore > 80 ? "bg-green-500" :
                                    payment.riskScore > 60 ? "bg-yellow-500" :
                                    "bg-red-500"
                                  }`}
                                  style={{ width: `${payment.riskScore}%` }}
                                />
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-6 space-y-4">
                            <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                              <Eye className="h-4 w-4" />
                              View Claim Details
                            </Button>
                            
                            <div className="flex gap-4">
                              <Button variant="outline" className="flex-1 border-red-500 text-red-500 hover:bg-red-50">
                                Reject
                              </Button>
                              <Button className="flex-1 bg-green-600 hover:bg-green-700">
                                Approve Payment
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
                <p className="text-muted-foreground">No pending approvals match your search criteria</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="recent" className="space-y-6">
          {/* Recent Disbursements List */}
          <div className="space-y-4">
            {claimPaymentsData.recentDisbursements.map((payment) => (
              <Card key={payment.id} className="overflow-hidden">
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">{payment.customerName}</h3>
                      <p className="text-sm text-muted-foreground">{payment.claimId} • {payment.policyNumber}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div>
                      <p className="text-sm text-right">Type</p>
                      <p className="font-medium">{payment.type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-right">Amount</p>
                      <p className="font-medium">{payment.amount}</p>
                    </div>
                    <div>
                      <p className="text-sm text-right">Disbursed</p>
                      <p className="font-medium">{new Date(payment.disbursedDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      {getStatusBadge(payment.status)}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Disbursement by Insurance Type</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-60 flex items-center justify-center mb-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Chart visualization would appear here</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {Object.entries(claimPaymentsData.disbursementMetrics.disbursementByType).map(([type, amount]) => (
                    <div key={type} className="flex items-center justify-between">
                      <span className="capitalize">{type} Insurance</span>
                      <span className="font-medium">{amount}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Disbursement Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Total Disbursed</h4>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-3xl font-bold">{claimPaymentsData.disbursementMetrics.totalDisbursed.thisMonth}</p>
                        <p className="text-sm text-muted-foreground">This Month</p>
                      </div>
                      <div>
                        <p className="text-xl font-medium">{claimPaymentsData.disbursementMetrics.totalDisbursed.lastMonth}</p>
                        <p className="text-sm text-muted-foreground">Last Month</p>
                      </div>
                      <div className="flex items-center gap-1 text-green-600">
                        <ArrowUpRight className="h-4 w-4" />
                        <span>{claimPaymentsData.disbursementMetrics.totalDisbursed.growth}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Average Disbursement Time</h4>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-3xl font-bold">{claimPaymentsData.disbursementMetrics.averageDisbursementTime.thisMonth}</p>
                        <p className="text-sm text-muted-foreground">This Month</p>
                      </div>
                      <div>
                        <p className="text-xl font-medium">{claimPaymentsData.disbursementMetrics.averageDisbursementTime.lastMonth}</p>
                        <p className="text-sm text-muted-foreground">Last Month</p>
                      </div>
                      <div className="flex items-center gap-1 text-green-600">
                        <ArrowDownRight className="h-4 w-4" />
                        <span>{claimPaymentsData.disbursementMetrics.averageDisbursementTime.improvement}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Disbursement Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-60 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Monthly disbursement trend chart would appear here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 