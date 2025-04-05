"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  Search,
  UserPlus,
  Mail,
  Phone,
  Shield,
  Award,
  Clock,
  CheckCircle,
  AlertTriangle,
  BarChart,
  Star,
  TrendingUp
} from "lucide-react"

// Comprehensive team data
const teamData = {
  stats: {
    totalMembers: 45,
    activeMembers: 42,
    pendingInvites: 3,
    departments: 5,
    avgPerformance: 92
  },
  departments: {
    claims: {
      name: "Claims Processing",
      members: 18,
      lead: "Priya Sharma",
      performance: 92,
      activeTickets: 45,
      metrics: {
        avgProcessingTime: "45 mins",
        accuracyRate: "98%",
        customerSatisfaction: 4.8
      }
    },
    underwriting: {
      name: "Underwriting",
      members: 12,
      lead: "Rajesh Kumar",
      performance: 88,
      policiesReviewed: 156,
      metrics: {
        riskAssessmentAccuracy: "94%",
        avgPolicyReviewTime: "2.5 hours",
        premiumOptimization: "12%"
      }
    },
    customerService: {
      name: "Customer Service",
      members: 8,
      lead: "Amit Patel",
      performance: 94,
      avgResponseTime: "15 mins",
      metrics: {
        firstCallResolution: "85%",
        customerSatisfaction: 4.7,
        responseTime: "< 15 mins"
      }
    }
  },
  members: [
    {
      id: "EMP-001",
      name: "Priya Sharma",
      role: "Claims Manager",
      department: "Claims Processing",
      email: "priya.s@swiftclaim.com",
      phone: "+91 98765 43210",
      joinDate: "2022-03-15",
      status: "Active",
      performance: {
        claimsProcessed: 245,
        accuracy: 98,
        avgProcessingTime: "45 mins",
        customerRating: 4.8
      },
      certifications: ["CPCU", "AIC"],
      recentActivity: [
        {
          type: "Claim Approved",
          id: "CLM-2024-123",
          timestamp: "2024-03-21T10:30:00"
        }
      ],
      photo: "https://i.pravatar.cc/150?img=44"
    },
    {
      id: "EMP-002",
      name: "Rajesh Kumar",
      role: "Senior Underwriter",
      department: "Underwriting",
      email: "rajesh.k@swiftclaim.com",
      phone: "+91 98765 43211",
      joinDate: "2022-05-20",
      status: "Active",
      performance: {
        policiesReviewed: 180,
        accuracy: 96,
        riskAssessments: 120,
        premiumOptimization: "12%"
      },
      certifications: ["AINS", "AU"],
      photo: "https://i.pravatar.cc/150?img=68"
    }
  ],
  performance: {
    topPerformers: [
      {
        name: "Priya Sharma",
        metric: "98% Claim Processing Accuracy",
        achievement: "Top Performer"
      },
      {
        name: "Rajesh Kumar",
        metric: "156 Policies Reviewed",
        achievement: "Most Productive"
      }
    ],
    recentAchievements: [
      {
        member: "Amit Patel",
        achievement: "Customer Service Excellence Award",
        date: "2024-03-15"
      }
    ]
  }
}

export default function TeamPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Team Management</h1>
          <p className="text-muted-foreground">
            Manage team members and track performance
          </p>
        </div>
        <Button className="bg-[#07a6ec] hover:bg-[#0696d7]">
          <UserPlus className="mr-2 h-4 w-4" />
          Add Team Member
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Members</p>
                <h3 className="text-2xl font-bold">{teamData.stats.totalMembers}</h3>
                <p className="text-sm text-green-600">
                  {teamData.stats.activeMembers} active
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-full">
                <Star className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Performance</p>
                <h3 className="text-2xl font-bold">{teamData.stats.avgPerformance}%</h3>
                <p className="text-sm text-green-600">+5% from last month</p>
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
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="members">Team Members</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search team members..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        <TabsContent value="overview">
          {/* Department Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Department Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.entries(teamData.departments).map(([key, dept]) => (
                  <div key={key} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">{dept.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {dept.members} members • Led by {dept.lead}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">Performance</p>
                        <p className="text-sm text-green-600">{dept.performance}%</p>
                      </div>
                      <Button variant="outline">View Team</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Performers */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Top Performers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamData.performance.topPerformers.map((performer, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                      <Award className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">{performer.name}</h4>
                      <p className="text-sm text-muted-foreground">{performer.metric}</p>
                    </div>
                    <Badge className="ml-auto bg-green-100 text-green-800">
                      {performer.achievement}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="members">
          <div className="space-y-4">
            {teamData.members.map(member => (
              <Card key={member.id}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-6">
                    <Image
                      src={member.photo}
                      alt={member.name}
                      width={64}
                      height={64}
                      className="rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-medium">{member.name}</h3>
                        <Badge variant="outline">{member.id}</Badge>
                        <Badge className="bg-green-100 text-green-800">
                          {member.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {member.role} • {member.department}
                      </div>
                      <div className="mt-2 flex gap-4">
                        <div className="flex items-center gap-1">
                          <Mail className="h-4 w-4" />
                          <span className="text-sm">{member.email}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="h-4 w-4" />
                          <span className="text-sm">{member.phone}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button variant="outline">View Profile</Button>
                      <Button className="bg-[#07a6ec]">Manage Access</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Add other tab contents */}
      </Tabs>
    </div>
  )
} 