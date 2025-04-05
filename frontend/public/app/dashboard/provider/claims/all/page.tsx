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
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  ChevronDown,
  ChevronUp,
  Calendar,
  Brain
} from "lucide-react"

// Comprehensive claims data
const allClaimsData = {
  stats: {
    total: 1250,
    pending: 180,
    approved: 980,
    rejected: 90,
    flaggedForReview: 45
  },
  claims: [
    {
      id: "CLM-2024-001",
      customerName: "Rahul Sharma",
      policyNumber: "POL-H-123456",
      type: "Health Insurance",
      amount: "₹45,000",
      submittedDate: "2024-03-20",
      status: "Under Review",
      priority: "High",
      riskScore: 85,
      documents: ["Medical Bills", "Hospital Report", "ID Proof"],
      aiRecommendation: {
        action: "Approve",
        confidence: 92,
        notes: "All documents verified, claim amount within policy limits"
      }
    },
    {
      id: "CLM-2024-002",
      customerName: "Priya Patel",
      policyNumber: "POL-M-789012",
      type: "Motor Insurance",
      amount: "₹75,000",
      submittedDate: "2024-03-19",
      status: "Pending Documentation",
      priority: "Medium",
      riskScore: 78,
      documents: ["Accident Report", "Repair Estimate"],
      aiRecommendation: {
        action: "Request Additional Documents",
        confidence: 88,
        notes: "Need vehicle inspection report and police FIR"
      }
    },
    {
      id: "CLM-2024-003",
      customerName: "Amit Kumar",
      policyNumber: "POL-H-345678",
      type: "Health Insurance",
      amount: "₹25,000",
      submittedDate: "2024-03-18",
      status: "Approved",
      priority: "Low",
      riskScore: 95,
      documents: ["Medical Bills", "Prescription", "Discharge Summary"],
      aiRecommendation: {
        action: "Approve",
        confidence: 98,
        notes: "Routine claim with complete documentation"
      }
    },
    {
      id: "CLM-2024-004",
      customerName: "Neha Singh",
      policyNumber: "POL-L-901234",
      type: "Life Insurance",
      amount: "₹15,00,000",
      submittedDate: "2024-03-17",
      status: "Fraud Investigation",
      priority: "Critical",
      riskScore: 45,
      documents: ["Death Certificate", "Medical Records", "Nominee ID"],
      aiRecommendation: {
        action: "Investigate",
        confidence: 85,
        notes: "Suspicious circumstances, policy taken recently"
      }
    },
    {
      id: "CLM-2024-005",
      customerName: "Vikram Reddy",
      policyNumber: "POL-M-567890",
      type: "Motor Insurance",
      amount: "₹35,000",
      submittedDate: "2024-03-16",
      status: "Rejected",
      priority: "Low",
      riskScore: 60,
      documents: ["Accident Report", "Repair Estimate", "Police FIR"],
      aiRecommendation: {
        action: "Reject",
        confidence: 90,
        notes: "Accident occurred outside policy coverage period"
      }
    }
  ],
  processingMetrics: {
    averageTime: "4.2 hours",
    aiProcessed: "82%",
    manualReview: "18%",
    fraudDetectionRate: "3.6%"
  }
}

export default function AllClaimsPage() {
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
  
  const filteredClaims = allClaimsData.claims.filter(claim => {
    // Apply status filter
    if (statusFilter !== "all" && claim.status.toLowerCase() !== statusFilter.toLowerCase()) {
      return false
    }
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        claim.id.toLowerCase().includes(query) ||
        claim.customerName.toLowerCase().includes(query) ||
        claim.policyNumber.toLowerCase().includes(query)
      )
    }
    
    return true
  })
  
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">{status}</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">{status}</Badge>
      case "under review":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">{status}</Badge>
      case "pending documentation":
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">{status}</Badge>
      case "fraud investigation":
        return <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">{status}</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }
  
  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">All Claims</h1>
          <p className="text-muted-foreground">
            Comprehensive view of all insurance claims
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Date Range
          </Button>
          <Button className="bg-[#07a6ec] hover:bg-[#0696d7] flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Claims
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Claims</p>
                <h3 className="text-2xl font-bold">{allClaimsData.stats.total}</h3>
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
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <h3 className="text-2xl font-bold">{allClaimsData.stats.pending}</h3>
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
                <p className="text-sm font-medium text-muted-foreground">Approved</p>
                <h3 className="text-2xl font-bold">{allClaimsData.stats.approved}</h3>
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
                <p className="text-sm font-medium text-muted-foreground">Rejected</p>
                <h3 className="text-2xl font-bold">{allClaimsData.stats.rejected}</h3>
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
                <p className="text-sm font-medium text-muted-foreground">Flagged</p>
                <h3 className="text-2xl font-bold">{allClaimsData.stats.flaggedForReview}</h3>
              </div>
              <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-purple-600" />
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
              placeholder="Search claims..." 
              className="pl-10 w-[300px]" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select 
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="under review">Under Review</option>
            <option value="pending documentation">Pending Documentation</option>
            <option value="fraud investigation">Fraud Investigation</option>
          </select>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            More Filters
          </Button>
        </div>
      </div>

      {/* Claims List */}
      <div className="space-y-4">
        {filteredClaims.length > 0 ? (
          filteredClaims.map((claim) => (
            <Card key={claim.id} className="overflow-hidden">
              <div 
                className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50"
                onClick={() => toggleExpand(claim.id)}
              >
                <div className="flex items-center gap-4">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                    claim.status === "Approved" ? "bg-green-100 dark:bg-green-900/30" :
                    claim.status === "Rejected" ? "bg-red-100 dark:bg-red-900/30" :
                    claim.status === "Under Review" ? "bg-blue-100 dark:bg-blue-900/30" :
                    claim.status === "Pending Documentation" ? "bg-yellow-100 dark:bg-yellow-900/30" :
                    "bg-purple-100 dark:bg-purple-900/30"
                  }`}>
                    {claim.status === "Approved" ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : claim.status === "Rejected" ? (
                      <XCircle className="h-5 w-5 text-red-600" />
                    ) : claim.status === "Under Review" ? (
                      <Clock className="h-5 w-5 text-blue-600" />
                    ) : claim.status === "Pending Documentation" ? (
                      <FileText className="h-5 w-5 text-yellow-600" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-purple-600" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium">{claim.customerName}</h3>
                    <p className="text-sm text-muted-foreground">{claim.id} • {claim.policyNumber}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div>
                    <p className="text-sm text-right">Type</p>
                    <p className="font-medium">{claim.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-right">Amount</p>
                    <p className="font-medium">{claim.amount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-right">Date</p>
                    <p className="font-medium">{new Date(claim.submittedDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    {getStatusBadge(claim.status)}
                  </div>
                  <div>
                    {expandedItem === claim.id ? (
                      <ChevronUp className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                </div>
              </div>
              
              {expandedItem === claim.id && (
                <CardContent className="border-t pt-4">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Claim Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Claim ID:</span>
                          <span>{claim.id}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Policy Number:</span>
                          <span>{claim.policyNumber}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Customer:</span>
                          <span>{claim.customerName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Type:</span>
                          <span>{claim.type}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Amount:</span>
                          <span>{claim.amount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Submitted:</span>
                          <span>{new Date(claim.submittedDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Status:</span>
                          <span>{claim.status}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Priority:</span>
                          <span>{claim.priority}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">AI Assessment</h4>
                      <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 space-y-3">
                        <div className="flex items-center gap-2">
                          <Brain className="h-5 w-5 text-[#07a6ec]" />
                          <span className="font-medium">AI Recommendation: {claim.aiRecommendation.action}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">Confidence: {claim.aiRecommendation.confidence}%</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">Notes: </span>
                          <span>{claim.aiRecommendation.notes}</span>
                        </div>
                        <div className="pt-2">
                          <div className="flex justify-between mb-1 text-xs">
                            <span>Risk Score</span>
                            <span>{claim.riskScore}/100</span>
                          </div>
                          <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${
                                claim.riskScore > 80 ? "bg-green-500" :
                                claim.riskScore > 60 ? "bg-yellow-500" :
                                "bg-red-500"
                              }`}
                              style={{ width: `${claim.riskScore}%` }}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <h4 className="text-sm font-medium mt-4 mb-2">Documents</h4>
                      <div className="space-y-2">
                        {claim.documents.map((doc, index) => (
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
                    {claim.status === "Under Review" && (
                      <>
                        <Button variant="outline" className="mr-2 border-red-500 text-red-500 hover:bg-red-50">Reject</Button>
                        <Button className="bg-green-600 hover:bg-green-700">Approve</Button>
                      </>
                    )}
                    {claim.status === "Pending Documentation" && (
                      <Button className="bg-[#07a6ec] hover:bg-[#0696d7]">Request Documents</Button>
                    )}
                    {claim.status === "Fraud Investigation" && (
                      <Button className="bg-purple-600 hover:bg-purple-700">Review Investigation</Button>
                    )}
                  </div>
                </CardContent>
              )}
            </Card>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No claims match your search criteria</p>
          </div>
        )}
      </div>
    </div>
  )
} 