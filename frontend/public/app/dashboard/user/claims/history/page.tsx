"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { 
  ArrowLeft, 
  FileText, 
  Clock, 
  AlertTriangle, 
  CheckCircle,
  Search,
  Loader2,
  RefreshCw,
  User
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useUserClaims, Claim } from "@/hooks/use-user-claims"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ClaimsHistoryPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { claims, isLoading, error } = useUserClaims()
  const [searchTerm, setSearchTerm] = useState("")

  // Filter claims based on search term
  const filteredClaims = claims.filter(claim => {
    return claim.claim_id.toString().includes(searchTerm) ||
      claim.policy_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.incident_description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.policyholder_name.toLowerCase().includes(searchTerm.toLowerCase())
  })

  const getStatusBadgeVariant = (status: string): "default" | "destructive" | "outline" | "secondary" => {
    switch(status.toLowerCase()) {
      case 'pending':
        return "secondary"
      case 'approved':
        return "default"
      case 'paid':
        return "default"
      case 'rejected':
        return "destructive"
      default:
        return "default"
    }
  }

  const getStatusIcon = (status: string) => {
    switch(status.toLowerCase()) {
      case 'pending':
        return <Clock className="mr-1 h-3 w-3" />
      case 'approved':
        return <CheckCircle className="mr-1 h-3 w-3" />
      case 'paid':
        return <CheckCircle className="mr-1 h-3 w-3" />
      case 'rejected':
        return <AlertTriangle className="mr-1 h-3 w-3" />
      default:
        return null
    }
  }

  // Format a date as DD MMM YYYY (e.g., 15 Mar 2024)
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const handleViewClaim = (claimId: number) => {
    toast({
      title: "Viewing Claim Details",
      description: `Loading details for Claim #${claimId}`,
    })
    // In a real app, this would navigate to the claim details page
    // router.push(`/dashboard/user/claims/details/${claimId}`)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="mb-6">
        <Link href="/dashboard/user" className="inline-flex items-center text-[#07a6ec] hover:underline">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Link>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-2">
          <h1 className="text-3xl font-bold">All Claims</h1>
          <Button 
            onClick={() => router.push('/dashboard/user/claims/new')}
            className="bg-[#fa6724] hover:bg-[#e55613] mt-4 md:mt-0"
          >
            File a New Claim
          </Button>
        </div>
        <p className="text-muted-foreground mt-1">View all insurance claims in the system</p>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search claims..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="text-sm text-muted-foreground">
            {filteredClaims.length} {filteredClaims.length === 1 ? 'claim' : 'claims'} found
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-8 w-8 text-[#07a6ec] animate-spin mb-4" />
            <p className="text-muted-foreground">Loading claims...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <AlertTriangle className="h-8 w-8 text-red-500 mb-4" />
            <h3 className="text-lg font-medium mb-2">Failed to load claims</h3>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button 
              onClick={() => window.location.reload()}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Retry
            </Button>
          </div>
        ) : filteredClaims.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <FileText className="h-8 w-8 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No claims found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm 
                ? "No claims match your search criteria. Try a different search term." 
                : "There are no claims in the system yet."}
            </p>
            {!searchTerm && (
              <Button 
                onClick={() => router.push('/dashboard/user/claims/new')}
                className="bg-[#fa6724] hover:bg-[#e55613]"
              >
                File a New Claim
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredClaims.map((claim) => (
              <Card key={claim.claim_id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">Claim #{claim.claim_id}</CardTitle>
                    <Badge variant={getStatusBadgeVariant(claim.claim_status)} className="flex items-center gap-1">
                      {getStatusIcon(claim.claim_status)}
                      {claim.claim_status.charAt(0).toUpperCase() + claim.claim_status.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-muted-foreground">Policy Type</div>
                      <div>{claim.policy_type.charAt(0).toUpperCase() + claim.policy_type.slice(1)}</div>
                      
                      <div className="text-muted-foreground">Policy Number</div>
                      <div>{claim.policy_number}</div>
                      
                      <div className="text-muted-foreground">Filed Date</div>
                      <div>{formatDate(claim.filing_date)}</div>
                      
                      <div className="text-muted-foreground">Amount</div>
                      <div>₹{parseInt(claim.claim_amount).toLocaleString('en-IN')}</div>
                      
                      <div className="text-muted-foreground">Provider</div>
                      <div className="truncate" title={claim.company}>{claim.company}</div>
                      
                      <div className="text-muted-foreground">Policyholder</div>
                      <div className="truncate" title={claim.policyholder_name}>{claim.policyholder_name}</div>
                    </div>
                    
                    <div>
                      <div className="text-muted-foreground text-sm mb-1">Description</div>
                      <div className="text-sm line-clamp-2">{claim.incident_description}</div>
                    </div>
                    
                    <Button 
                      onClick={() => handleViewClaim(claim.claim_id)} 
                      className="w-full bg-[#07a6ec] hover:bg-[#0695d6]"
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 