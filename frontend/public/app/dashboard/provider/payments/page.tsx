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
  CreditCard,
  Wallet,
  Bank,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react"

// Comprehensive payments data
const paymentsData = {
  stats: {
    totalCollected: "₹4.8Cr",
    pendingPayments: "₹85L",
    overduePayments: "₹32L",
    collectionRate: "92%",
    monthlyGrowth: "+8.5%"
  },
  recentPayments: [
    {
      id: "PAY-2024-001",
      policyId: "POL-H-123456",
      customerName: "Rahul Sharma",
      policyType: "Health Insurance",
      amount: "₹45,000",
      date: "2024-03-20",
      method: "Credit Card",
      status: "Successful",
      cardDetails: "**** **** **** 4567",
      transactionId: "TXN123456789",
      receiptGenerated: true
    },
    {
      id: "PAY-2024-002",
      policyId: "POL-M-789012",
      customerName: "Priya Patel",
      policyType: "Motor Insurance",
      amount: "₹18,500",
      date: "2024-03-19",
      method: "Net Banking",
      status: "Successful",
      bankDetails: "HDFC Bank",
      transactionId: "TXN987654321",
      receiptGenerated: true
    },
    {
      id: "PAY-2024-003",
      policyId: "POL-H-345678",
      customerName: "Amit Kumar",
      policyType: "Health Insurance",
      amount: "₹32,000",
      date: "2024-03-18",
      method: "UPI",
      status: "Successful",
      upiId: "amit@upi",
      transactionId: "TXN456789123",
      receiptGenerated: true
    },
    {
      id: "PAY-2024-004",
      policyId: "POL-L-901234",
      customerName: "Neha Singh",
      policyType: "Life Insurance",
      amount: "₹24,000",
      date: "2024-03-17",
      method: "Credit Card",
      status: "Failed",
      cardDetails: "**** **** **** 7890",
      transactionId: "TXN789123456",
      failureReason: "Insufficient funds",
      receiptGenerated: false
    },
    {
      id: "PAY-2024-005",
      policyId: "POL-H-567890",
      customerName: "Vikram Reddy",
      policyType: "Home Insurance",
      amount: "₹12,500",
      date: "2024-03-16",
      method: "Cheque",
      status: "Processing",
      chequeDetails: "Cheque #123456",
      receiptGenerated: false
    }
  ],
  pendingPayments: [
    {
      id: "POL-H-234567",
      customerName: "Sanjay Gupta",
      policyType: "Health Insurance",
      amount: "₹38,000",
      dueDate: "2024-04-05",
      status: "Due",
      reminderSent: true,
      lastReminderDate: "2024-03-15"
    },
    {
      id: "POL-M-345678",
      customerName: "Anita Desai",
      policyType: "Motor Insurance",
      amount: "₹15,800",
      dueDate: "2024-03-28",
      status: "Due Soon",
      reminderSent: true,
      lastReminderDate: "2024-03-18"
    },
    {
      id: "POL-L-456789",
      customerName: "Rajiv Malhotra",
      policyType: "Life Insurance",
      amount: "₹28,500",
      dueDate: "2024-03-10",
      status: "Overdue",
      reminderSent: true,
      lastReminderDate: "2024-03-17",
      daysOverdue: 10
    }
  ],
  paymentMethods: {
    creditCard: 45,
    netBanking: 30,
    upi: 20,
    others: 5
  }
}

export default function PaymentsPage() {
  const [expandedItem, setExpandedItem] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("recent")
  
  const toggleExpand = (id: string) => {
    if (expandedItem === id) {
      setExpandedItem(null)
    } else {
      setExpandedItem(id)
    }
  }
  
  const filteredPayments = paymentsData.recentPayments.filter(payment => {
    // Apply status filter
    if (statusFilter !== "all" && payment.status.toLowerCase() !== statusFilter.toLowerCase()) {
      return false
    }
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        payment.id.toLowerCase().includes(query) ||
        payment.customerName.toLowerCase().includes(query) ||
        payment.policyId.toLowerCase().includes(query)
      )
    }
    
    return true
  })
  
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "successful":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">{status}</Badge>
      case "failed":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">{status}</Badge>
      case "processing":
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">{status}</Badge>
      case "due":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">{status}</Badge>
      case "due soon":
        return <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">{status}</Badge>
      case "overdue":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">{status}</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }
  
  const getMethodIcon = (method: string) => {
    switch (method.toLowerCase()) {
      case "credit card":
        return <CreditCard className="h-5 w-5 text-blue-600" />
      case "net banking":
        return <Bank className="h-5 w-5 text-green-600" />
      case "upi":
        return <Wallet className="h-5 w-5 text-purple-600" />
      case "cheque":
        return <FileText className="h-5 w-5 text-yellow-600" />
      default:
        return <DollarSign className="h-5 w-5 text-[#07a6ec]" />
    }
  }
  
  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Premium Payments</h1>
          <p className="text-muted-foreground">
            Track and manage all policy premium payments
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Collected</p>
                <h3 className="text-2xl font-bold">{paymentsData.stats.totalCollected}</h3>
              </div>
              <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Payments</p>
                <h3 className="text-2xl font-bold">{paymentsData.stats.pendingPayments}</h3>
              </div>
              <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Overdue Payments</p>
                <h3 className="text-2xl font-bold">{paymentsData.stats.overduePayments}</h3>
              </div>
              <div className="h-10 w-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Collection Rate</p>
                <h3 className="text-2xl font-bold">{paymentsData.stats.collectionRate}</h3>
              </div>
              <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Monthly Growth</p>
                <h3 className="text-2xl font-bold">{paymentsData.stats.monthlyGrowth}</h3>
              </div>
              <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <ArrowUpRight className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="recent" className="space-y-6" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="recent">Recent Payments</TabsTrigger>
          <TabsTrigger value="pending">Pending Payments</TabsTrigger>
          <TabsTrigger value="analytics">Payment Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="recent" className="space-y-6">
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search payments..."
                className="pl-8 w-full sm:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <select
                className="border rounded-md px-3 py-2 bg-background"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="successful">Successful</option>
                <option value="failed">Failed</option>
                <option value="processing">Processing</option>
              </select>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                More Filters
              </Button>
            </div>
          </div>

          {/* Payments List */}
          <div className="space-y-4">
            {filteredPayments.length > 0 ? (
              filteredPayments.map((payment) => (
                <Card key={payment.id} className="overflow-hidden">
                  <div 
                    className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50"
                    onClick={() => toggleExpand(payment.id)}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                        payment.method === "Credit Card" ? "bg-blue-100 dark:bg-blue-900/30" :
                        payment.method === "Net Banking" ? "bg-green-100 dark:bg-green-900/30" :
                        payment.method === "UPI" ? "bg-purple-100 dark:bg-purple-900/30" :
                        "bg-yellow-100 dark:bg-yellow-900/30"
                      }`}>
                        {getMethodIcon(payment.method)}
                      </div>
                      <div>
                        <h3 className="font-medium">{payment.customerName}</h3>
                        <p className="text-sm text-muted-foreground">{payment.id} • {payment.policyId}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div>
                        <p className="text-sm text-right">Amount</p>
                        <p className="font-medium">{payment.amount}</p>
                      </div>
                      <div>
                        <p className="text-sm text-right">Method</p>
                        <p className="font-medium">{payment.method}</p>
                      </div>
                      <div>
                        <p className="text-sm text-right">Date</p>
                        <p className="font-medium">{new Date(payment.date).toLocaleDateString()}</p>
                      </div>
                      <div>
                        {getStatusBadge(payment.status)}
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
                              <span className="text-muted-foreground">Policy ID:</span>
                              <span>{payment.policyId}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Customer:</span>
                              <span>{payment.customerName}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Policy Type:</span>
                              <span>{payment.policyType}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Amount:</span>
                              <span>{payment.amount}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Date:</span>
                              <span>{new Date(payment.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Method:</span>
                              <span>{payment.method}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Status:</span>
                              <span>{payment.status}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Transaction ID:</span>
                              <span>{payment.transactionId}</span>
                            </div>
                            {payment.method === "Credit Card" && (
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Card Details:</span>
                                <span>{payment.cardDetails}</span>
                              </div>
                            )}
                            {payment.method === "Net Banking" && (
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Bank:</span>
                                <span>{payment.bankDetails}</span>
                              </div>
                            )}
                            {payment.method === "UPI" && (
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">UPI ID:</span>
                                <span>{payment.upiId}</span>
                              </div>
                            )}
                            {payment.method === "Cheque" && (
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Cheque Details:</span>
                                <span>{payment.chequeDetails}</span>
                              </div>
                            )}
                            {payment.status === "Failed" && (
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Failure Reason:</span>
                                <span className="text-red-600">{payment.failureReason}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium mb-2">Actions</h4>
                          <div className="space-y-4">
                            {payment.status === "Successful" && (
                              <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <CheckCircle className="h-5 w-5 text-green-600" />
                                  <span>Payment successful</span>
                                </div>
                                {payment.receiptGenerated ? (
                                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                                    <Download className="h-4 w-4" />
                                    Download Receipt
                                  </Button>
                                ) : (
                                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                                    <FileText className="h-4 w-4" />
                                    Generate Receipt
                                  </Button>
                                )}
                              </div>
                            )}
                            
                            {payment.status === "Failed" && (
                              <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <XCircle className="h-5 w-5 text-red-600" />
                                  <span>Payment failed: {payment.failureReason}</span>
                                </div>
                                <Button variant="outline" size="sm" className="flex items-center gap-2">
                                  <RefreshCw className="h-4 w-4" />
                                  Retry Payment
                                </Button>
                              </div>
                            )}
                            
                            {payment.status === "Processing" && (
                              <div className="p-4 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Clock className="h-5 w-5 text-yellow-600" />
                                  <span>Payment is being processed</span>
                                </div>
                                <Button variant="outline" size="sm" className="flex items-center gap-2">
                                  <RefreshCw className="h-4 w-4" />
                                  Check Status
                                </Button>
                              </div>
                            )}
                            
                            <div className="flex justify-end mt-4">
                              <Button variant="outline" className="mr-2">View Policy</Button>
                              <Button variant="outline" className="mr-2">Contact Customer</Button>
                              <Button className="bg-[#07a6ec] hover:bg-[#0696d7]">View Details</Button>
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
                <p className="text-muted-foreground">No payments match your search criteria</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="pending" className="space-y-6">
          {/* Pending Payments List */}
          <div className="space-y-4">
            {paymentsData.pendingPayments.map((payment) => (
              <Card key={payment.id} className="overflow-hidden">
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      payment.status === "Overdue" ? "bg-red-100 dark:bg-red-900/30" :
                      payment.status === "Due Soon" ? "bg-purple-100 dark:bg-purple-900/30" :
                      "bg-blue-100 dark:bg-blue-900/30"
                    }`}>
                      {payment.status === "Overdue" ? (
                        <AlertTriangle className="h-5 w-5 text-red-600" />
                      ) : payment.status === "Due Soon" ? (
                        <Clock className="h-5 w-5 text-purple-600" />
                      ) : (
                        <Calendar className="h-5 w-5 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium">{payment.customerName}</h3>
                      <p className="text-sm text-muted-foreground">{payment.id} • {payment.policyType}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div>
                      <p className="text-sm text-right">Amount</p>
                      <p className="font-medium">{payment.amount}</p>
                    </div>
                    <div>
                      <p className="text-sm text-right">Due Date</p>
                      <p className="font-medium">{new Date(payment.dueDate).toLocaleDateString()}</p>
                    </div>
                    {payment.status === "Overdue" && (
                      <div>
                        <p className="text-sm text-right">Days Overdue</p>
                        <p className="font-medium text-red-600">{payment.daysOverdue}</p>
                      </div>
                    )}
                    <div>
                      {getStatusBadge(payment.status)}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="h-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button className="bg-[#07a6ec] hover:bg-[#0696d7] h-8">
                        Send Reminder
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Method Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-60 flex items-center justify-center mb-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Chart visualization would appear here</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {Object.entries(paymentsData.paymentMethods).map(([method, percentage]) => (
                    <div key={method} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="capitalize">{method === "upi" ? "UPI" : method.replace(/([A-Z])/g, ' $1').trim()}</span>
                        <span>{percentage}%</span>
                      </div>
                      <Progress value={percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Collection Efficiency</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="text-center">
                    <p className="text-5xl font-bold text-[#07a6ec]">92%</p>
                    <p className="text-sm text-muted-foreground mt-1">Overall Collection Rate</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span>Health Insurance</span>
                        <span>95%</span>
                      </div>
                      <Progress value={95} className="h-2" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span>Motor Insurance</span>
                        <span>90%</span>
                      </div>
                      <Progress value={90} className="h-2" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span>Life Insurance</span>
                        <span>94%</span>
                      </div>
                      <Progress value={94} className="h-2" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span>Home Insurance</span>
                        <span>88%</span>
                      </div>
                      <Progress value={88} className="h-2" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Payment Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-60 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Monthly payment trend chart would appear here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 