"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  Users,
  Car,
  Home,
  Heart
} from "lucide-react"

// Comprehensive policies data
const allPoliciesData = {
  stats: {
    total: 3245,
    active: 2980,
    expiringSoon: 180,
    lapsed: 85,
    newPolicies: 125
  },
  policies: [
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
    },
    {
      id: "POL-2023-H-567",
      customerName: "Amit Patel",
      type: "Health Insurance",
      plan: "Individual",
      premium: "₹32,000/year",
      sumInsured: "₹25,00,000",
      startDate: "2023-04-15",
      endDate: "2024-04-14",
      status: "Expiring Soon",
      members: 1,
      claims: 2,
      lastClaim: "2023-11-10",
      riskScore: 75,
      paymentStatus: "Paid",
      documents: ["KYC", "Medical Reports"]
    },
    {
      id: "POL-2023-L-456",
      customerName: "Neha Singh",
      type: "Life Insurance",
      plan: "Term Plan",
      premium: "₹24,000/year",
      sumInsured: "₹1,00,00,000",
      startDate: "2023-06-10",
      endDate: "2043-06-09",
      status: "Active",
      nominees: ["Rahul Singh (Spouse)", "Aarav Singh (Son)"],
      claims: 0,
      riskScore: 90,
      paymentStatus: "Paid",
      documents: ["KYC", "Medical Reports", "Income Proof"]
    },
    {
      id: "POL-2023-H-890",
      customerName: "Vikram Reddy",
      type: "Home Insurance",
      plan: "Comprehensive",
      premium: "₹12,500/year",
      sumInsured: "₹75,00,000",
      startDate: "2023-08-20",
      endDate: "2024-08-19",
      status: "Active",
      property: "Villa, Whitefield, Bangalore",
      claims: 1,
      lastClaim: "2023-12-05",
      riskScore: 88,
      paymentStatus: "Paid",
      documents: ["Property Papers", "Valuation Report", "KYC"]
    }
  ],
  renewalStats: {
    lastMonth: 95,
    thisMonth: 120,
    nextMonth: 180
  }
}

export default function AllPoliciesPage() {
  const [expandedItem, setExpandedItem] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  
  const toggleExpand = (id: string) => {
    if (expandedItem === id) {
      setExpandedItem(null)
    } else {
      setExpandedItem(id)
    }
  }
  
  const filteredPolicies = allPoliciesData.policies.filter(policy => {
    // Apply type filter
    if (typeFilter !== "all" && !policy.type.toLowerCase().includes(typeFilter.toLowerCase())) {
      return false
    }
    
    // Apply status filter
    if (statusFilter !== "all" && policy.status.toLowerCase() !== statusFilter.toLowerCase()) {
      return false
    }
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        policy.id.toLowerCase().includes(query) ||
        policy.customerName.toLowerCase().includes(query)
      )
    }
    
    return true
  })
  
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">{status}</Badge>
      case "expiring soon":
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">{status}</Badge>
      case "lapsed":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">{status}</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }
  
  const getTypeIcon = (type: string) => {
    if (type.includes("Health")) {
      return <Heart className="h-5 w-5 text-red-600" />
    } else if (type.includes("Motor")) {
      return <Car className="h-5 w-5 text-blue-600" />
    } else if (type.includes("Home")) {
      return <Home className="h-5 w-5 text-green-600" />
    } else if (type.includes("Life")) {
      return <Users className="h-5 w-5 text-purple-600" />
    } else {
      return <Shield className="h-5 w-5 text-[#07a6ec]" />
    }
  }
  
  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">All Policies</h1>
          <p className="text-muted-foreground">
            Comprehensive view of all insurance policies
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Date Range
          </Button>
          <Button className="bg-[#07a6ec] hover:bg-[#0696d7] flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Policies
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Policies</p>
                <h3 className="text-2xl font-bold">{allPoliciesData.stats.total}</h3>
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
                <p className="text-sm font-medium text-muted-foreground">Active</p>
                <h3 className="text-2xl font-bold">{allPoliciesData.stats.active}</h3>
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
                <p className="text-sm font-medium text-muted-foreground">Expiring Soon</p>
                <h3 className="text-2xl font-bold">{allPoliciesData.stats.expiringSoon}</h3>
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
                <p className="text-sm font-medium text-muted-foreground">Lapsed</p>
                <h3 className="text-2xl font-bold">{allPoliciesData.stats.lapsed}</h3>
              </div>
              <div className="h-10 w-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <XCircle className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">New Policies</p>
                <h3 className="text-2xl font-bold">{allPoliciesData.stats.newPolicies}</h3>
              </div>
              <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <Shield className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search policies..." 
              className="pl-10 w-[300px]" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select 
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="health">Health Insurance</option>
            <option value="motor">Motor Insurance</option>
            <option value="life">Life Insurance</option>
            <option value="home">Home Insurance</option>
          </select>
          <select 
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="expiring soon">Expiring Soon</option>
            <option value="lapsed">Lapsed</option>
          </select>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            More Filters
          </Button>
        </div>
      </div>

      {/* Policies List */}
      <div className="space-y-4">
        {filteredPolicies.length > 0 ? (
          filteredPolicies.map((policy) => (
            <Card key={policy.id} className="overflow-hidden">
              <div 
                className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50"
                onClick={() => toggleExpand(policy.id)}
              >
                <div className="flex items-center gap-4">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                    policy.type.includes("Health") ? "bg-red-100 dark:bg-red-900/30" :
                    policy.type.includes("Motor") ? "bg-blue-100 dark:bg-blue-900/30" :
                    policy.type.includes("Life") ? "bg-purple-100 dark:bg-purple-900/30" :
                    policy.type.includes("Home") ? "bg-green-100 dark:bg-green-900/30" :
                    "bg-blue-100 dark:bg-blue-900/30"
                  }`}>
                    {getTypeIcon(policy.type)}
                  </div>
                  <div>
                    <h3 className="font-medium">{policy.customerName}</h3>
                    <p className="text-sm text-muted-foreground">{policy.id} • {policy.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div>
                    <p className="text-sm text-right">Premium</p>
                    <p className="font-medium">{policy.premium}</p>
                  </div>
                  <div>
                    <p className="text-sm text-right">Sum Insured</p>
                    <p className="font-medium">{policy.sumInsured}</p>
                  </div>
                  <div>
                    <p className="text-sm text-right">Expiry</p>
                    <p className="font-medium">{new Date(policy.endDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    {getStatusBadge(policy.status)}
                  </div>
                  <div>
                    {expandedItem === policy.id ? (
                      <ChevronUp className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                </div>
              </div>
              
              {expandedItem === policy.id && (
                <CardContent className="border-t pt-4">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Policy Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Policy ID:</span>
                          <span>{policy.id}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Customer:</span>
                          <span>{policy.customerName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Type:</span>
                          <span>{policy.type}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Plan:</span>
                          <span>{policy.plan}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Premium:</span>
                          <span>{policy.premium}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Sum Insured:</span>
                          <span>{policy.sumInsured}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Start Date:</span>
                          <span>{new Date(policy.startDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">End Date:</span>
                          <span>{new Date(policy.endDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Status:</span>
                          <span>{policy.status}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Payment Status:</span>
                          <span>{policy.paymentStatus}</span>
                        </div>
                        {policy.type.includes("Health") && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Members:</span>
                            <span>{policy.members}</span>
                          </div>
                        )}
                        {policy.type.includes("Motor") && (
                          <>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Vehicle:</span>
                              <span>{policy.vehicle}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Model:</span>
                              <span>{policy.model}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Year:</span>
                              <span>{policy.year}</span>
                            </div>
                          </>
                        )}
                        {policy.type.includes("Home") && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Property:</span>
                            <span>{policy.property}</span>
                          </div>
                        )}
                        {policy.type.includes("Life") && policy.nominees && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Nominees:</span>
                            <span>{policy.nominees.join(", ")}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Risk Assessment</h4>
                      <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 space-y-3">
                        <div className="pt-2">
                          <div className="flex justify-between mb-1 text-xs">
                            <span>Risk Score</span>
                            <span>{policy.riskScore}/100</span>
                          </div>
                          <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${
                                policy.riskScore > 80 ? "bg-green-500" :
                                policy.riskScore > 60 ? "bg-yellow-500" :
                                "bg-red-500"
                              }`}
                              style={{ width: `${policy.riskScore}%` }}
                            />
                          </div>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Claims:</span>
                          <span>{policy.claims}</span>
                        </div>
                        {policy.lastClaim && (
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Last Claim:</span>
                            <span>{new Date(policy.lastClaim).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>
                      
                      <h4 className="text-sm font-medium mt-4 mb-2">Documents</h4>
                      <div className="space-y-2">
                        {policy.documents.map((doc, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <span className="text-sm">{doc}</span>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-4">
                    <Button variant="outline" className="mr-2">View Details</Button>
                    {policy.status === "Expiring Soon" && (
                      <Button className="bg-[#07a6ec] hover:bg-[#0696d7]">Process Renewal</Button>
                    )}
                    {policy.status === "Active" && (
                      <Button className="bg-[#07a6ec] hover:bg-[#0696d7]">Manage Policy</Button>
                    )}
                    {policy.status === "Lapsed" && (
                      <Button className="bg-[#07a6ec] hover:bg-[#0696d7]">Reinstate Policy</Button>
                    )}
                  </div>
                </CardContent>
              )}
            </Card>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No policies match your search criteria</p>
          </div>
        )}
      </div>
    </div>
  )
} 