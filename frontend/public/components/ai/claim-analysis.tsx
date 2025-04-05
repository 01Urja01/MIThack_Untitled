"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Brain, AlertTriangle, CheckCircle, TrendingUp } from "lucide-react"

// Dummy AI analysis data
const aiAnalysisData = {
  riskScore: 85,
  fraudProbability: 2,
  recommendations: [
    {
      type: "Approval",
      confidence: 98,
      reason: "Medical records and policy terms match",
    }
  ],
  insights: [
    {
      title: "Pattern Analysis",
      description: "No suspicious claim patterns detected",
      status: "positive",
    },
    {
      title: "Document Verification",
      description: "All documents are authentic and verified",
      status: "positive",
    },
    {
      title: "Risk Assessment",
      description: "Low risk profile based on history",
      status: "positive",
    }
  ],
  processingMetrics: {
    documentAnalysis: "2.1 seconds",
    fraudCheck: "1.5 seconds",
    totalProcessing: "4.8 seconds",
  }
}

export function ClaimAnalysis() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Brain className="h-6 w-6 text-[#fa6724]" />
        <div>
          <h3 className="text-lg font-semibold">AI Claim Analysis</h3>
          <p className="text-sm text-muted-foreground">
            Automated analysis and risk assessment
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-6">
          <h4 className="font-medium mb-4">Risk Score</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Overall Risk</span>
              <span className="font-medium">{aiAnalysisData.riskScore}%</span>
            </div>
            <Progress value={aiAnalysisData.riskScore} className="h-2" />
          </div>
        </Card>

        <Card className="p-6">
          <h4 className="font-medium mb-4">Fraud Detection</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Probability</span>
              <span className="font-medium">{aiAnalysisData.fraudProbability}%</span>
            </div>
            <Progress value={aiAnalysisData.fraudProbability} className="h-2" />
          </div>
        </Card>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium">AI Insights</h4>
        {aiAnalysisData.insights.map((insight, index) => (
          <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
            {insight.status === "positive" ? (
              <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-yellow-500 mt-1" />
            )}
            <div>
              <p className="font-medium">{insight.title}</p>
              <p className="text-sm text-muted-foreground">{insight.description}</p>
            </div>
          </div>
        ))}
      </div>

      <Card className="p-6">
        <h4 className="font-medium mb-4">Processing Metrics</h4>
        <div className="space-y-4">
          {Object.entries(aiAnalysisData.processingMetrics).map(([key, value]) => (
            <div key={key} className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </span>
              <span className="font-medium">{value}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
} 