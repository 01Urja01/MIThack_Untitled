"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  FileText,
  Search,
  Filter,
  AlertTriangle,
  Clock,
  CheckCircle,
  XCircle,
  Download,
  Eye,
  DollarSign,
  AlertOctagon
} from "lucide-react"

// Comprehensive claims data
const claimsData = {
  stats: {
    today: {
      total: 45,
      approved: 28,
      pending: 12,
      rejected: 5
    },
    week: {
      total: 312,
      approved: 245,
      pending: 45,
      rejected: 22
    },
    month: {
      total: 1250,
      approved: 980,
      pending: 180,
      rejected: 90
    }
  },
  activeClaims: [
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
    // Add more claims...
  ],
  fraudAlerts: [
    {
      id: "FRD-2024-001",
      claimId: "CLM-2024-001",
      severity: "High",
      type: "Document Manipulation",
      details: "AI detected potential alterations in submitted bills",
      detectedAt: "2024-03-20T11:20:00",
      status: "Under Investigation"
    },
    // Add more fraud alerts...
  ]
}

export default function ClaimsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedClaim, setSelectedClaim] = useState<string | null>(null)

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Claims Management</h1>
          <p className="text-muted-foreground">
            Process and manage insurance claims
          </p>
        </div>
        <Button className="bg-[#07a6ec] hover:bg-[#0696d7]">
          Export Report
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Claims</p>
                <h3 className="text-2xl font-bold">{claimsData.stats.month.total}</h3>
                <p className="text-sm text-green-600">+12.5% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Add more stat cards */}
      </div>

      {/* Claims List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Active Claims</CardTitle>
            <div className="flex gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search claims..."
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
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {claimsData.activeClaims.map((claim) => (
              <div key={claim.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div>
                      <h4 className="font-medium">{claim.customerName}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{claim.id}</span>
                        <span>•</span>
                        <span>{claim.type}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge
                      className={
                        claim.status === "Approved"
                          ? "bg-green-100 text-green-800"
                          : claim.status === "Under Review"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }
                    >
                      {claim.status}
                    </Badge>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    <Button size="sm" className="bg-[#07a6ec] hover:bg-[#0696d7]">
                      Process Claim
                    </Button>
                  </div>
                </div>
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
            {claimsData.fraudAlerts.map((alert) => (
              <div key={alert.id} className="p-4 border rounded-lg bg-red-50">
                <div className="flex items-center gap-4">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  <div>
                    <h4 className="font-medium">Alert: {alert.type}</h4>
                    <p className="text-sm text-muted-foreground">{alert.details}</p>
                  </div>
                  <Badge className="ml-auto bg-red-100 text-red-800">
                    {alert.severity} Risk
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 