"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Brain, Shield, FileCheck, AlertTriangle, Clock } from "lucide-react"

interface ClaimStage {
  id: string
  title: string
  status: "completed" | "in-progress" | "pending" | "failed"
  aiVerified: boolean
  blockchainVerified: boolean
  timestamp: string
  details: string
}

const claimWorkflow = {
  stages: [
    {
      id: "doc-verification",
      title: "Document Verification",
      status: "completed",
      aiVerified: true,
      blockchainVerified: true,
      timestamp: "2024-03-21 10:30:00",
      details: "All documents verified using AI OCR and blockchain hash verification"
    },
    {
      id: "fraud-check",
      title: "Fraud Detection",
      status: "completed",
      aiVerified: true,
      blockchainVerified: true,
      timestamp: "2024-03-21 10:32:00",
      details: "No fraud patterns detected. Risk score: 92/100"
    },
    {
      id: "policy-validation",
      title: "Policy Terms Validation",
      status: "in-progress",
      aiVerified: true,
      blockchainVerified: false,
      timestamp: "2024-03-21 10:35:00",
      details: "Smart contract verification in progress"
    }
  ],
  metrics: {
    completionPercentage: 65,
    estimatedTime: "10 minutes",
    riskScore: 92,
    confidenceScore: 95
  }
}

export function ClaimWorkflow() {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Claim Processing Workflow</h3>
          <div className="flex items-center gap-2">
            <Progress value={claimWorkflow.metrics.completionPercentage} className="w-32" />
            <span className="text-sm text-muted-foreground">
              {claimWorkflow.metrics.completionPercentage}% Complete
            </span>
          </div>
        </div>

        <div className="space-y-4">
          {claimWorkflow.stages.map((stage) => (
            <div key={stage.id} className="flex items-start gap-4 p-4 border rounded-lg">
              <StatusIcon status={stage.status} />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{stage.title}</p>
                    <p className="text-sm text-muted-foreground">{stage.details}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {stage.aiVerified && (
                      <Badge variant="outline" className="bg-primary/10 text-primary">
                        <Brain className="h-3 w-3 mr-1" />
                        AI Verified
                      </Badge>
                    )}
                    {stage.blockchainVerified && (
                      <Badge variant="outline" className="bg-secondary/10 text-secondary">
                        <Shield className="h-3 w-3 mr-1" />
                        Blockchain Verified
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  {stage.timestamp}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

function StatusIcon({ status }: { status: ClaimStage["status"] }) {
  switch (status) {
    case "completed":
      return <FileCheck className="h-5 w-5 text-green-500" />
    case "in-progress":
      return <Clock className="h-5 w-5 text-blue-500" />
    case "failed":
      return <AlertTriangle className="h-5 w-5 text-red-500" />
    default:
      return <Clock className="h-5 w-5 text-gray-400" />
  }
} 