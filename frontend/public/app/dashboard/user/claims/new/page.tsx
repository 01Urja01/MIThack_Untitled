"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Upload,
  Camera,
  FileText,
  Calendar,
  MapPin,
  Clock,
  CheckCircle,
  AlertTriangle,
  Loader2,
  Plane,
  Hospital,
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import apiClient from "@/lib/api-client"

export default function NewClaimPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationResult, setVerificationResult] = useState<null | {
    status: "success" | "warning" | "error"
    message: string
  }>(null)
  const [alertInfo, setAlertInfo] = useState<null | {
    type: "success" | "error" | "warning" | "info"
    title: string
    message: string | React.ReactNode
    show: boolean
  }>(null)
  const [showFullScreenAlert, setShowFullScreenAlert] = useState(false)
  const [formData, setFormData] = useState({
    policyType: "health",
    policyNumber: "",
    incidentDate: "",
    incidentLocation: "",
    description: "",
    amount: "",
    documents: [] as string[],
    paymentMethod: "upi",
    upiId: "",
    billStartDate: "",
    billEndDate: "",
    aabhaId: "",
    flightId: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFileUpload = () => {
    setIsUploading(true)
    setUploadProgress(0)

    // Simulate file upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)

          // Generate a document name based on policy type
          let documentName = "";
          if (formData.policyType === "health") {
            const healthDocs = [
              "Hospital_Bill.pdf",
              "Medical_Report.pdf",
              "Discharge_Summary.pdf",
              "AABHA_Record.pdf",
              "Prescription.pdf"
            ];
            documentName = healthDocs[Math.floor(Math.random() * healthDocs.length)];
          } else {
            const travelDocs = [
              "Flight_Ticket.pdf",
              "Boarding_Pass.pdf",
              "Delay_Certificate.pdf",
              "Baggage_Claim.pdf",
              "Travel_Expense_Receipt.pdf"
            ];
            documentName = travelDocs[Math.floor(Math.random() * travelDocs.length)];
          }

          // Add document to the list
          setFormData((prev) => ({
            ...prev,
            documents: [...prev.documents, documentName],
          }))

          return 0
        }
        return prev + 5
      })
    }, 100)
  }

  const handleVerifyDocuments = () => {
    setIsVerifying(true)

    // Simulate document verification
    setTimeout(() => {
      setIsVerifying(false)
      setVerificationResult({
        status: "success",
        message: "Documents verified successfully. Your claim is eligible for processing.",
      })
    }, 2000)
  }

  const handleNextStep = () => {
    // Validate current step
    if (step === 1) {
      if (!formData.policyType || !formData.policyNumber || !formData.incidentDate || !formData.incidentLocation) {
        toast({
          title: "Missing information",
          description: "Please fill in all required fields",
          variant: "destructive",
        })
        return
      }
    } else if (step === 2) {
      if (!formData.description || !formData.amount || !formData.billStartDate || !formData.billEndDate) {
        toast({
          title: "Missing information",
          description: "Please fill in all required fields",
          variant: "destructive",
        })
        return
      }
      
      // Validate policy-specific fields
      if (formData.policyType === "health" && !formData.aabhaId) {
        toast({
          title: "Missing AABHA ID",
          description: "AABHA ID is required for health insurance claims",
          variant: "destructive",
        })
        return
      }
      
      if (formData.policyType === "travel" && !formData.flightId) {
        toast({
          title: "Missing Flight ID",
          description: "Flight ID is required for travel insurance claims",
          variant: "destructive",
        })
        return
      }
    } else if (step === 3) {
      if (formData.documents.length === 0) {
        toast({
          title: "Missing documents",
          description: "Please upload at least one document",
          variant: "destructive",
        })
        return
      }
    }

    setStep(step + 1)
  }

  const handlePrevStep = () => {
    setStep(step - 1)
  }

  const handleSubmitClaim = async () => {
    if (!formData.paymentMethod || (formData.paymentMethod === "upi" && !formData.upiId)) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Format the request based on API requirements
      const requestData: any = {
        policyNumber: parseInt(formData.policyNumber.replace(/\D/g, "") || "0"),
        claimAmount: parseFloat(formData.amount || "0"),
        incidentDescription: formData.description,
        billStartDate: formData.billStartDate,
        billEndDate: formData.billEndDate,
      }

      // Add policy-specific fields
      if (formData.policyType === "health") {
        requestData.aabhaId = formData.aabhaId
      } else if (formData.policyType === "travel") {
        requestData.flightId = parseInt(formData.flightId || "0")
      }

      console.log("Submitting claim with data:", JSON.stringify(requestData, null, 2))

      // Make API call to submit claim
      console.log("Sending request to API")
      
      let apiSuccess = false;
      let responseData = null;
      
      try {
        responseData = await apiClient.post('insurance/claim', requestData);
        apiSuccess = true;
        
        console.log("API response:", JSON.stringify(responseData, null, 2))

        // Display response in an alert format regardless of success or failure
        if (!responseData.success || responseData.success === false) {
          // Handle error response according to the format in the README.md
          // Error format: { success: false, error: "Error message", details: "Detailed explanation" }
          const errorMessage = responseData.error || "Unknown error occurred";
          const errorDetails = responseData.details || "";
          
          // Set visible alert for error
          setAlertInfo({
            type: "error",
            title: `Error: ${errorMessage}`,
            message: (
              <div>
                {errorDetails && <p className="text-lg font-medium text-red-500 mb-4">{errorDetails}</p>}
                
                {/* Show specific guidance based on error type */}
                {errorMessage.includes("Invalid claim amount") && (
                  <div className="mt-4 p-4 bg-red-100 dark:bg-red-950/30 rounded-md">
                    <h4 className="font-medium text-red-800 dark:text-red-300">Suggestion:</h4>
                    <p className="text-sm text-red-700 dark:text-red-200 mt-1">
                      {errorDetails || "The amount you're claiming exceeds your policy coverage or is invalid. Please check your policy details and enter a valid amount."}
                    </p>
                  </div>
                )}
                
                {errorMessage.includes("Policy not found") && (
                  <div className="mt-4 p-4 bg-red-100 dark:bg-red-950/30 rounded-md">
                    <h4 className="font-medium text-red-800 dark:text-red-300">Suggestion:</h4>
                    <p className="text-sm text-red-700 dark:text-red-200 mt-1">
                      The policy number you entered doesn't exist or is inactive. Please verify your policy number and try again.
                    </p>
                  </div>
                )}
                
                {errorMessage.includes("Duplicate claim") && (
                  <div className="mt-4 p-4 bg-yellow-100 dark:bg-yellow-950/30 rounded-md">
                    <h4 className="font-medium text-yellow-800 dark:text-yellow-300">Note:</h4>
                    <p className="text-sm text-yellow-700 dark:text-yellow-200 mt-1">
                      There is already an active claim for this policy. You cannot submit multiple claims for the same policy while one is still being processed.
                    </p>
                    {responseData.existingClaimId && (
                      <p className="text-sm font-medium text-yellow-700 dark:text-yellow-200 mt-2">
                        Existing Claim ID: {responseData.existingClaimId}
                      </p>
                    )}
                  </div>
                )}
                
                {errorMessage.includes("Missing") && (
                  <div className="mt-4 p-4 bg-red-100 dark:bg-red-950/30 rounded-md">
                    <h4 className="font-medium text-red-800 dark:text-red-300">Missing Information:</h4>
                    <p className="text-sm text-red-700 dark:text-red-200 mt-1">
                      Please provide all required information for your claim type.
                    </p>
                  </div>
                )}
                
                {errorMessage.includes("Claim type mismatch") && (
                  <div className="mt-4 p-4 bg-red-100 dark:bg-red-950/30 rounded-md">
                    <h4 className="font-medium text-red-800 dark:text-red-300">Policy Type Mismatch:</h4>
                    <p className="text-sm text-red-700 dark:text-red-200 mt-1">
                      The claim type you selected doesn't match your policy type. Please select the correct claim type.
                    </p>
                  </div>
                )}
              </div>
            ),
            show: true
          });
          
          // Also use toast for notification
          toast({
            title: `Error: ${errorMessage}`,
            description: errorDetails || "Please check the error details and try again.",
            variant: "destructive",
            duration: 10000, // Show for 10 seconds
          })
          
          throw new Error(`${errorMessage}${errorDetails ? `: ${errorDetails}` : ""}`);
        } else {
          // Handle success response
          // Set visible alert for success
          setAlertInfo({
            type: "success",
            title: "API Response (Success)",
            message: (
              <div>
                <p className="text-lg font-medium text-green-500 mb-4">Claim submitted successfully!</p>
                <div className="bg-slate-950 rounded-md p-4 overflow-x-auto">
                  <pre className="text-white text-sm whitespace-pre-wrap">
                    {JSON.stringify(responseData, null, 2)}
                  </pre>
                </div>
              </div>
            ),
            show: true
          });
          
          // Also use toast for notification
          toast({
            title: "API Response (Success)",
            description: (
              <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4 overflow-x-auto">
                <code className="text-white text-xs">
                  {JSON.stringify(responseData, null, 2)}
                </code>
              </pre>
            ),
            variant: "default",
            duration: 10000, // Show for 10 seconds
          })
        }
      } catch (networkError: any) {
        console.error("Network error:", networkError)
        console.warn("API connection failed, will use fallback for development")
        
        // Set visible alert for network error
        setAlertInfo({
          type: "error",
          title: "Network Error",
          message: (
            <div>
              <p className="mb-2 text-red-400 font-medium">Failed to connect to API server</p>
              <p className="mb-2">{networkError.message}</p>
            </div>
          ),
          show: true
        });
        
        // Also use toast for notification
        toast({
          title: "Network Error",
          description: (
            <div>
              <p className="mb-2 text-red-400 font-medium">Failed to connect to API server</p>
              <p className="mb-2">{networkError.message}</p>
            </div>
          ),
          variant: "destructive",
          duration: 10000, // Show for 10 seconds
        })
      }
      
      // Only proceed with success handling if API call was successful
      if (!apiSuccess) {
        // Return early without showing claim status alert
        return;
      }
      
      // If API call succeeded, use the response, otherwise use a mock response for development
      const data = apiSuccess ? responseData : {
        success: true,
        claim: {
          claimId: Math.floor(Math.random() * 10000) + 1,
          policyNumber: requestData.policyNumber,
          claimAmount: requestData.claimAmount,
          claimType: formData.policyType,
          status: "pending"
        },
        blockchain: {
          chainClaimId: "1",
          transactionHash: "0x" + Math.random().toString(16).slice(2, 34),
          blockchainStatus: "submitted_with_claim_id"
        }
      };
      
      // Log the final data we're using (real or fallback)
      console.log("Final processed data:", data);

      // Display fallback data alert if mock data is used
      if (!apiSuccess) {
        // Set visible alert for fallback data
        setAlertInfo({
          type: "info",
          title: "Using Fallback Data (Development Mode)",
          message: (
            <pre className="mt-2 w-full rounded-md bg-slate-950 p-4 overflow-x-auto">
              <code className="text-white text-xs">
                {JSON.stringify(data, null, 2)}
              </code>
            </pre>
          ),
          show: true
        });
        
        // Also use toast for notification
        toast({
          title: "Using Fallback Data (Development Mode)",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4 overflow-x-auto">
              <code className="text-white text-xs">
                {JSON.stringify(data, null, 2)}
              </code>
            </pre>
          ),
          variant: "default",
          duration: 10000, // Show for 10 seconds
        })
      }

      // Show appropriate claim status alert based on response
      // Only if we have a successful response
      if (apiSuccess) {
        const claimStatus = data.claim?.status || 'unknown';
        const blockchainStatus = data.blockchain?.blockchainStatus || 'unknown';
        const transactionHash = data.blockchain?.transactionHash || 'unknown';

        // Show claim status toast and update alert
        let statusTitle = "Claim submitted successfully";
        let statusDescription = `Your claim #${data.claim?.claimId || 'unknown'} has been submitted and is being processed`;
        let statusVariant: "default" | "destructive" | "success" = "default";
        let alertType: "success" | "error" | "warning" | "info" = "info";

        if (claimStatus === "approved") {
          statusTitle = "Claim approved!";
          statusDescription = `Your claim #${data.claim?.claimId || 'unknown'} has been approved for ₹${data.claim?.claimAmount || 0}`;
          statusVariant = "success";
          alertType = "success";
        } else if (claimStatus === "rejected") {
          statusTitle = "Claim rejected";
          statusDescription = `Your claim #${data.claim?.claimId || 'unknown'} has been rejected. Please contact support for more information.`;
          statusVariant = "destructive";
          alertType = "error";
        } else if (claimStatus === "pending") {
          statusTitle = "Claim pending";
          statusDescription = `Your claim #${data.claim?.claimId || 'unknown'} has been submitted and is pending review.`;
          statusVariant = "default";
          alertType = "warning";
        }
        
        // Update alert with claim status
        setAlertInfo({
          type: alertType,
          title: statusTitle,
          message: (
            <div>
              <p className="text-lg font-medium mb-4">{statusDescription}</p>
              {blockchainStatus && (
                <div className="mt-4 p-6 bg-blue-100 dark:bg-blue-950/50 rounded-md">
                  <h4 className="text-lg font-medium text-blue-700 dark:text-blue-300 mb-3">Blockchain Information</h4>
                  <p className="text-md mb-3">Status: <span className="font-semibold">{blockchainStatus}</span></p>
                  {transactionHash && transactionHash !== 'unknown' && (
                    <div className="mt-4">
                      <p className="text-sm mb-2">
                        Transaction ID: <span className="font-mono">{transactionHash.substring(0, 12)}...{transactionHash.substring(transactionHash.length - 8)}</span>
                      </p>
                      <a href={`https://etherscan.io/tx/${transactionHash}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm">
                        View on Etherscan
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          ),
          show: true
        });
        
        toast({
          title: statusTitle,
          description: statusDescription,
          variant: statusVariant as any,
        });
        
        // Redirect to claim success page after a short delay
        setTimeout(() => {
          router.push(`/dashboard/user/claims/success?claimId=${data.claim?.claimId || 'unknown'}`);
        }, 2000); // 2-second delay to allow the user to see the success message
      }
        
      // If API call succeeded but we need to use the dashboard overview page
      // router.push('/dashboard/user')
    } catch (error: any) {
      console.error("Error submitting claim:", error)
      console.error("Error details:", {
        message: error.message,
        stack: error.stack,
      })
      
      // Set visible alert for error
      setAlertInfo({
        type: "error",
        title: "Failed to submit claim",
        message: (
          <div>
            <p className="font-medium text-red-400 mb-2">Error Processing Claim</p>
            <p className="mb-2">{error.message || "An unknown error occurred"}</p>
            {error.stack && (
              <details>
                <summary className="text-xs text-gray-400 cursor-pointer mb-1">View Error Details</summary>
                <pre className="mt-1 w-full rounded-md bg-slate-950 p-4 overflow-x-auto">
                  <code className="text-white text-xs">
                    {error.stack}
                  </code>
                </pre>
              </details>
            )}
          </div>
        ),
        show: true
      });
      
      toast({
        title: "Failed to submit claim",
        description: (
          <div>
            <p className="font-medium text-red-400 mb-2">Error Processing Claim</p>
            <p className="mb-2">{error.message || "An unknown error occurred"}</p>
            {error.stack && (
              <details>
                <summary className="text-xs text-gray-400 cursor-pointer mb-1">View Error Details</summary>
                <pre className="mt-1 w-[340px] rounded-md bg-slate-950 p-4 overflow-x-auto">
                  <code className="text-white text-xs">
                    {error.stack}
                  </code>
                </pre>
              </details>
            )}
          </div>
        ),
        variant: "destructive",
        duration: 10000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Full Screen Alert Overlay */}
      {alertInfo && alertInfo.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 overflow-y-auto p-4">
          <div className={`relative max-w-2xl w-full rounded-lg shadow-xl p-6 ${
            alertInfo.type === "error" ? "bg-red-50 text-red-800 dark:bg-red-950 dark:text-red-300" : 
            alertInfo.type === "success" ? "bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-300" :
            alertInfo.type === "warning" ? "bg-yellow-50 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-300" :
            "bg-blue-50 text-blue-800 dark:bg-blue-950 dark:text-blue-300"
          }`}>
            <div className="absolute top-4 right-4">
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => setAlertInfo(null)}
                className="h-8 w-8 p-0 rounded-full"
              >
                <span className="sr-only">Close</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </Button>
            </div>
            
            <div className="flex items-start">
              <div className="flex-1">
                <h3 className="text-lg font-medium mb-2">{alertInfo.title}</h3>
                <div className="text-sm">{alertInfo.message}</div>
                <div className="mt-6 flex justify-end">
                  <Button 
                    onClick={() => setAlertInfo(null)}
                    className="bg-[#fa6724] hover:bg-[#e55613] text-white"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mb-6">
        <Link href="/dashboard" className="inline-flex items-center text-[#07a6ec] hover:underline">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold mt-2">File a New Claim</h1>
        <p className="text-muted-foreground">Complete the form below to submit your insurance claim</p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center">
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full ${
              step >= 1 ? "bg-[#fa6724] text-white" : "bg-gray-200 text-gray-500"
            }`}
          >
            1
          </div>
          <div className={`flex-1 h-1 mx-2 ${step >= 2 ? "bg-[#fa6724]" : "bg-gray-200"}`}></div>
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full ${
              step >= 2 ? "bg-[#fa6724] text-white" : "bg-gray-200 text-gray-500"
            }`}
          >
            2
          </div>
          <div className={`flex-1 h-1 mx-2 ${step >= 3 ? "bg-[#fa6724]" : "bg-gray-200"}`}></div>
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full ${
              step >= 3 ? "bg-[#fa6724] text-white" : "bg-gray-200 text-gray-500"
            }`}
          >
            3
          </div>
          <div className={`flex-1 h-1 mx-2 ${step >= 4 ? "bg-[#fa6724]" : "bg-gray-200"}`}></div>
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full ${
              step >= 4 ? "bg-[#fa6724] text-white" : "bg-gray-200 text-gray-500"
            }`}
          >
            4
          </div>
        </div>
        <div className="flex justify-between mt-2 text-sm">
          <span className={step >= 1 ? "text-[#fa6724] font-medium" : "text-muted-foreground"}>Policy Details</span>
          <span className={step >= 2 ? "text-[#fa6724] font-medium" : "text-muted-foreground"}>Claim Details</span>
          <span className={step >= 3 ? "text-[#fa6724] font-medium" : "text-muted-foreground"}>Documents</span>
          <span className={step >= 4 ? "text-[#fa6724] font-medium" : "text-muted-foreground"}>Payment</span>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          {/* Step 1: Policy Details */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Policy Details</h2>
                <p className="text-muted-foreground">Select your policy type and provide basic information</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Policy Type</Label>
                  <Tabs
                    defaultValue={formData.policyType}
                    onValueChange={(value) => handleSelectChange("policyType", value)}
                    className="mt-2"
                  >
                    <TabsList className="grid grid-cols-2">
                      <TabsTrigger value="health">Health Insurance</TabsTrigger>
                      <TabsTrigger value="travel">Travel Insurance</TabsTrigger>
                    </TabsList>
                    <TabsContent value="health" className="mt-4">
                      <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
                        <h3 className="font-medium flex items-center">
                          <FileText className="h-4 w-4 mr-2 text-[#07a6ec]" />
                          Health Insurance Claim
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          For medical expenses, hospitalization, and treatment costs
                        </p>
                      </div>
                    </TabsContent>
                    <TabsContent value="travel" className="mt-4">
                      <div className="bg-purple-50 dark:bg-purple-950/20 p-4 rounded-lg">
                        <h3 className="font-medium flex items-center">
                          <MapPin className="h-4 w-4 mr-2 text-purple-600" />
                          Travel Insurance Claim
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          For trip cancellations, delays, lost baggage, and medical emergencies during travel
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="policyNumber">Policy Number</Label>
                  <Input
                    id="policyNumber"
                    name="policyNumber"
                    value={formData.policyNumber}
                    onChange={handleChange}
                    placeholder={formData.policyType === "health" ? "HL-1234-5678" : "TR-5678-9012"}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="incidentDate">Date of Incident</Label>
                    <div className="relative">
                      <Input
                        id="incidentDate"
                        name="incidentDate"
                        type="date"
                        value={formData.incidentDate}
                        onChange={handleChange}
                      />
                      <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="incidentLocation">Location</Label>
                    <div className="relative">
                      <Input
                        id="incidentLocation"
                        name="incidentLocation"
                        value={formData.incidentLocation}
                        onChange={handleChange}
                        placeholder="City, State"
                      />
                      <MapPin className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleNextStep} className="bg-[#fa6724] hover:bg-[#e55613]">
                  Next Step
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Claim Details */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Claim Details</h2>
                <p className="text-muted-foreground">Provide information about your claim</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="description">Description of Incident</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Please describe what happened..."
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Claim Amount (₹)</Label>
                  <Input
                    id="amount"
                    name="amount"
                    type="number"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="Enter amount in INR"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="billStartDate">Bill Start Date</Label>
                    <div className="relative">
                      <Input
                        id="billStartDate"
                        name="billStartDate"
                        type="date"
                        value={formData.billStartDate}
                        onChange={handleChange}
                      />
                      <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="billEndDate">Bill End Date</Label>
                    <div className="relative">
                      <Input
                        id="billEndDate"
                        name="billEndDate"
                        type="date"
                        value={formData.billEndDate}
                        onChange={handleChange}
                      />
                      <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>
                </div>

                {formData.policyType === "health" && (
                  <div className="space-y-2">
                    <Label htmlFor="aabhaId">AABHA ID <span className="text-red-500">*</span></Label>
                    <div className="relative">
                      <Input
                        id="aabhaId"
                        name="aabhaId"
                        value={formData.aabhaId}
                        onChange={handleChange}
                        placeholder="Enter your AABHA ID"
                      />
                      <Hospital className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Your AABHA ID is required for health insurance claims verification
                    </p>
                  </div>
                )}

                {formData.policyType === "travel" && (
                  <div className="space-y-2">
                    <Label htmlFor="flightId">Flight ID <span className="text-red-500">*</span></Label>
                    <div className="relative">
                      <Input
                        id="flightId"
                        name="flightId"
                        type="number"
                        value={formData.flightId}
                        onChange={handleChange}
                        placeholder="Enter the Flight ID"
                      />
                      <Plane className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Flight ID is required for travel insurance claims verification
                    </p>
                  </div>
                )}
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={handlePrevStep}>
                  Previous Step
                </Button>
                <Button onClick={handleNextStep} className="bg-[#fa6724] hover:bg-[#e55613]">
                  Next Step
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Documents */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Upload Documents</h2>
                <p className="text-muted-foreground">Upload supporting documents for your claim</p>
              </div>

              <div className="space-y-6">
                {/* Document requirements based on policy type */}
                <div className={`p-4 rounded-lg ${formData.policyType === "health" ? "bg-blue-50 dark:bg-blue-950/20" : "bg-purple-50 dark:bg-purple-950/20"}`}>
                  <h3 className="font-medium flex items-center">
                    {formData.policyType === "health" ? (
                      <><Hospital className="h-4 w-4 mr-2 text-[#07a6ec]" /> Required Health Insurance Documents</>
                    ) : (
                      <><Plane className="h-4 w-4 mr-2 text-purple-600" /> Required Travel Insurance Documents</>
                    )}
                  </h3>
                  <ul className="text-sm text-muted-foreground mt-2 space-y-1 list-disc pl-5">
                    {formData.policyType === "health" ? (
                      <>
                        <li>Hospital bills and receipts</li>
                        <li>Medical prescription and reports</li>
                        <li>Discharge summary</li>
                        <li>AABHA ID proof document</li>
                      </>
                    ) : (
                      <>
                        <li>Boarding pass or e-ticket</li>
                        <li>Flight delay/cancellation certificate</li>
                        <li>Baggage loss report (if applicable)</li>
                        <li>Expense receipts related to travel incident</li>
                      </>
                    )}
                  </ul>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={handleFileUpload}
                  >
                    <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                    <h3 className="font-medium">Upload Files</h3>
                    <p className="text-sm text-muted-foreground mt-1">Click to upload documents, bills, or receipts</p>
                  </div>

                  <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted/50 transition-colors">
                    <Camera className="h-10 w-10 text-muted-foreground mb-2" />
                    <h3 className="font-medium">Scan Documents</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Use camera to scan documents with AI assistance
                    </p>
                  </div>
                </div>

                {isUploading && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Uploading...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                  </div>
                )}

                {formData.documents.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="font-medium">Uploaded Documents</h3>
                    <div className="space-y-2">
                      {formData.documents.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 text-[#07a6ec] mr-2" />
                            <span>{doc}</span>
                          </div>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <span className="sr-only">Remove</span>
                            <AlertTriangle className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>

                    <Button
                      onClick={handleVerifyDocuments}
                      disabled={isVerifying}
                      className="w-full bg-[#07a6ec] hover:bg-[#0695d3]"
                    >
                      {isVerifying ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Verifying Documents...
                        </>
                      ) : (
                        <>Verify Documents with AI</>
                      )}
                    </Button>

                    {verificationResult && (
                      <div
                        className={`p-4 rounded-lg ${
                          verificationResult.status === "success"
                            ? "bg-green-50 dark:bg-green-950/20"
                            : verificationResult.status === "warning"
                              ? "bg-yellow-50 dark:bg-yellow-950/20"
                              : "bg-red-50 dark:bg-red-950/20"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {verificationResult.status === "success" ? (
                            <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500 flex-shrink-0 mt-0.5" />
                          ) : verificationResult.status === "warning" ? (
                            <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-500 flex-shrink-0 mt-0.5" />
                          ) : (
                            <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-500 flex-shrink-0 mt-0.5" />
                          )}
                          <div>
                            <p className="text-sm font-medium">
                              {verificationResult.status === "success"
                                ? "Verification Successful"
                                : verificationResult.status === "warning"
                                  ? "Verification Warning"
                                  : "Verification Failed"}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">{verificationResult.message}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={handlePrevStep}>
                  Previous Step
                </Button>
                <Button
                  onClick={handleNextStep}
                  className="bg-[#fa6724] hover:bg-[#e55613]"
                  disabled={formData.documents.length === 0}
                >
                  Next Step
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Payment */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Payment Details</h2>
                <p className="text-muted-foreground">Specify how you would like to receive your claim payment</p>
              </div>

              <div className="space-y-6">
                <div className="space-y-4">
                  <Label>Payment Method</Label>
                  <RadioGroup
                    value={formData.paymentMethod}
                    onValueChange={(value) => handleSelectChange("paymentMethod", value)}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                  >
                    <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                      <RadioGroupItem value="upi" id="upi" />
                      <Label htmlFor="upi" className="cursor-pointer flex-1">
                        <div className="font-medium">UPI</div>
                        <div className="text-xs text-muted-foreground">Instant transfer</div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                      <RadioGroupItem value="bank" id="bank" />
                      <Label htmlFor="bank" className="cursor-pointer flex-1">
                        <div className="font-medium">Bank Transfer</div>
                        <div className="text-xs text-muted-foreground">1-2 business days</div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                      <RadioGroupItem value="wallet" id="wallet" />
                      <Label htmlFor="wallet" className="cursor-pointer flex-1">
                        <div className="font-medium">Digital Wallet</div>
                        <div className="text-xs text-muted-foreground">Instant transfer</div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {formData.paymentMethod === "upi" && (
                  <div className="space-y-2">
                    <Label htmlFor="upiId">UPI ID</Label>
                    <Input
                      id="upiId"
                      name="upiId"
                      value={formData.upiId}
                      onChange={handleChange}
                      placeholder="name@upi"
                    />
                    <p className="text-xs text-muted-foreground">
                      Enter your UPI ID to receive instant payment upon claim approval
                    </p>
                  </div>
                )}

                <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
                  <h3 className="font-medium flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-[#07a6ec]" />
                    Blockchain-Verified Instant Payments
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your claim will be processed through our blockchain network for secure and transparent verification.
                    Once approved, payment will be instantly transferred to your selected payment method.
                  </p>
                </div>

                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">Claim Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Policy Type:</span>
                      <span className="font-medium">
                        {formData.policyType === "health" ? "Health Insurance" : "Travel Insurance"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Policy Number:</span>
                      <span className="font-medium">{formData.policyNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Incident Date:</span>
                      <span className="font-medium">{formData.incidentDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Bill Period:</span>
                      <span className="font-medium">{formData.billStartDate} to {formData.billEndDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Claim Amount:</span>
                      <span className="font-medium">₹{formData.amount}</span>
                    </div>
                    {formData.policyType === "health" && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">AABHA ID:</span>
                        <span className="font-medium">{formData.aabhaId}</span>
                      </div>
                    )}
                    {formData.policyType === "travel" && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Flight ID:</span>
                        <span className="font-medium">{formData.flightId}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Documents:</span>
                      <span className="font-medium">{formData.documents.length} files</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={handlePrevStep}>
                  Previous Step
                </Button>
                <Button onClick={handleSubmitClaim} className="bg-[#fa6724] hover:bg-[#e55613]" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>Submit Claim</>
                  )}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

