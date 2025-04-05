"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Car, 
  Home, 
  Heart, 
  Plane, 
  Shield, 
  FileText, 
  Download, 
  Calendar, 
  AlertTriangle, 
  Search,
  PlusCircle,
  ChevronRight,
  CheckCircle
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function PoliciesPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const policies = [
    {
      id: "POL-123456",
      name: "Comprehensive Health Insurance",
      type: "health",
      provider: "Max Bupa Health Insurance",
      status: "Active",
      premium: "₹15,000 / year",
      coverage: "₹5,00,000",
      startDate: "15 Jan 2023",
      endDate: "14 Jan 2024",
      members: ["Self", "Spouse", "Children (2)"],
      documents: ["Policy Document", "Health Cards", "Terms & Conditions"],
      claims: 2,
    },
    {
      id: "POL-789012",
      name: "Motor Insurance - Premium",
      type: "motor",
      provider: "ICICI Lombard",
      status: "Active",
      premium: "₹8,500 / year",
      coverage: "₹3,50,000",
      startDate: "10 Mar 2023",
      endDate: "09 Mar 2024",
      vehicle: "Honda City (KA-01-AB-1234)",
      documents: ["Policy Document", "RC Copy", "Insurance Certificate"],
      claims: 1,
    },
    {
      id: "POL-345678",
      name: "Home Insurance Plus",
      type: "home",
      provider: "HDFC ERGO",
      status: "Active",
      premium: "₹4,200 / year",
      coverage: "₹50,00,000",
      startDate: "05 May 2023",
      endDate: "04 May 2024",
      address: "123 Main Street, Bangalore",
      documents: ["Policy Document", "Property Papers", "Valuation Certificate"],
      claims: 0,
    },
    {
      id: "POL-901234",
      name: "Travel Insurance - Asia Pacific",
      type: "travel",
      provider: "Bajaj Allianz",
      status: "Expiring Soon",
      premium: "₹2,800 / 3 months",
      coverage: "₹25,00,000",
      startDate: "20 Jun 2023",
      endDate: "19 Sep 2023",
      countries: ["Singapore", "Thailand", "Malaysia", "Indonesia"],
      documents: ["Policy Document", "E-Card", "Emergency Contacts"],
      claims: 0,
    },
  ]

  const getPolicyIcon = (type) => {
    switch (type) {
      case "health":
        return <Heart className="h-6 w-6 text-red-500" />
      case "motor":
        return <Car className="h-6 w-6 text-blue-500" />
      case "home":
        return <Home className="h-6 w-6 text-green-500" />
      case "travel":
        return <Plane className="h-6 w-6 text-purple-500" />
      default:
        return <Shield className="h-6 w-6 text-gray-500" />
    }
  }

  const getPolicyColor = (type) => {
    switch (type) {
      case "health":
        return "bg-red-100 dark:bg-red-950/30"
      case "motor":
        return "bg-blue-100 dark:bg-blue-950/30"
      case "home":
        return "bg-green-100 dark:bg-green-950/30"
      case "travel":
        return "bg-purple-100 dark:bg-purple-950/30"
      default:
        return "bg-gray-100 dark:bg-gray-800"
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 dark:bg-green-950/50 dark:text-green-400"
      case "Expiring Soon":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-950/50 dark:text-yellow-400"
      case "Expired":
        return "bg-red-100 text-red-800 dark:bg-red-950/50 dark:text-red-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
    }
  }

  const filteredPolicies = policies.filter(policy => {
    // Filter by tab
    if (activeTab !== "all" && policy.type !== activeTab) return false;
    
    // Filter by search query
    if (searchQuery && !policy.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !policy.id.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    
    return true;
  });

  const handleRenew = (policyId) => {
    toast({
      title: "Renewal initiated",
      description: `Renewal process started for policy ${policyId}`,
      action: (
        <div className="flex items-center gap-2">
          <Image
            src="https://i.ibb.co/8nHxb4zN/claimsaathi-snapping-winking.png"
            alt="Claim Saathi"
            width={24}
            height={24}
            className="rounded-full"
          />
          <span>Great choice!</span>
        </div>
      ),
    })
  }

  const handleDownload = (document) => {
    toast({
      title: "Document download",
      description: `Downloading ${document}...`,
      action: (
        <div className="flex items-center gap-2">
          <Image
            src="https://i.ibb.co/DgLw71WX/claimsaathi-happy-tooexcited-smilingwithopenmouth.png"
            alt="Claim Saathi"
            width={24}
            height={24}
            className="rounded-full"
          />
          <span>Coming right up!</span>
        </div>
      ),
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Policies</h1>
          <p className="text-muted-foreground">Manage and track all your insurance policies in one place</p>
        </div>
        <Link href="/dashboard/policies/new">
          <Button className="bg-[#fa6724] hover:bg-[#e55613]">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Policy
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-3 mb-3">
        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-[#07a6ec] to-[#fa6724] flex items-center justify-center flex-shrink-0">
          <Image
            src="https://i.ibb.co/XZP3h1bN/claimsaathi-neutral-firm.png"
            alt="Claim Saathi"
            width={24}
            height={24}
            className="rounded-full"
          />
        </div>
        <div className="bg-muted p-3 rounded-lg rounded-bl-none">
          <p className="text-sm">
            Your travel policy is expiring soon! Would you like to renew it before your next trip?
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search policies..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-5 w-full">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="health">Health</TabsTrigger>
            <TabsTrigger value="motor">Motor</TabsTrigger>
            <TabsTrigger value="home">Home</TabsTrigger>
            <TabsTrigger value="travel">Travel</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {filteredPolicies.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="rounded-full bg-muted p-3 mb-4">
              <FileText className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">No policies found</h3>
            <p className="text-muted-foreground text-center mb-4">
              We couldn't find any policies matching your search criteria.
            </p>
            <Button variant="outline" onClick={() => {setSearchQuery(""); setActiveTab("all");}}>
              Clear filters
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {filteredPolicies.map((policy) => (
            <Card key={policy.id} className="overflow-hidden">
              <div className={`h-2 ${getPolicyColor(policy.type)}`} />
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${getPolicyColor(policy.type)}`}>
                      {getPolicyIcon(policy.type)}
                    </div>
                    <div>
                      <CardTitle>{policy.name}</CardTitle>
                      <CardDescription>{policy.provider}</CardDescription>
                    </div>
                  </div>
                  <Badge className={getStatusColor(policy.status)}>{policy.status}</Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Policy Number</p>
                    <p className="font-medium">{policy.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Premium</p>
                    <p className="font-medium">{policy.premium}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Coverage</p>
                    <p className="font-medium">{policy.coverage}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Policy Period</p>
                      <p className="font-medium">{policy.startDate} - {policy.endDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Claims Filed</p>
                      <p className="font-medium">{policy.claims} claims</p>
                    </div>
                  </div>
                </div>

                {policy.status === "Expiring Soon" && (
                  <div className="bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded-lg flex items-start gap-3 mb-4">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Policy Expiring Soon</p>
                      <p className="text-xs text-muted-foreground">
                        Your policy will expire on {policy.endDate}. Renew now to maintain continuous coverage.
                      </p>
                    </div>
                  </div>
                )}

                <div className="border-t pt-4">
                  <p className="text-sm font-medium mb-2">Policy Documents</p>
                  <div className="flex flex-wrap gap-2">
                    {policy.documents.map((doc) => (
                      <Button 
                        key={doc} 
                        variant="outline" 
                        size="sm" 
                        className="flex items-center gap-1"
                        onClick={() => handleDownload(doc)}
                      >
                        <Download className="h-3 w-3" />
                        {doc}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <Button variant="outline" asChild>
                  <Link href={`/dashboard/policies/${policy.id}`}>
                    View Details
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
                {policy.status === "Expiring Soon" && (
                  <Button 
                    className="bg-[#fa6724] hover:bg-[#e55613]"
                    onClick={() => handleRenew(policy.id)}
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Renew Policy
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
} 