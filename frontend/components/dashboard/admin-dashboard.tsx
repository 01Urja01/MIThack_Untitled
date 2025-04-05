"use client"

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Brain, Shield, AlertTriangle, CheckCircle, TrendingUp, Users, FileText } from "lucide-react"

// Insurance company admin dashboard metrics
const adminMetrics = {
  claimsOverview: {
    total: 1250,
    pending: 180,
    approved: 950,
    rejected: 120,
    fraudDetected: 45,
    averageProcessingTime: "4.2 hours",
  },
  aiInsights: {
    fraudPrevention: "₹2.5M",
    accuracyRate: "99.2%",
    automatedApprovals: "82%",
    manualReviewNeeded: "18%",
  },
  realtimeAlerts: [
    {
      type: "Fraud Alert",
      description: "Multiple claims from same hospital within 24hrs",
      severity: "high",
      claimIds: ["CLM-123", "CLM-124"],
    },
    // ... more alerts
  ]
}

export function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 ai-card animate-gradient">
          <div className="flex items-center gap-4">
            <Brain className="h-8 w-8" />
            <div>
              <p className="text-sm font-medium">AI Processing</p>
              <h3 className="text-2xl font-bold">{adminMetrics.aiInsights.automatedApprovals}</h3>
            </div>
          </div>
        </Card>
        
        {/* Add more stat cards */}
      </div>

      {/* Fraud Detection & Alerts */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Real-time Fraud Alerts</h3>
        <div className="space-y-4">
          {adminMetrics.realtimeAlerts.map((alert, index) => (
            <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
              <AlertTriangle className={`h-5 w-5 ${
                alert.severity === 'high' ? 'text-red-500' : 'text-yellow-500'
              }`} />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{alert.type}</p>
                  <Badge variant={alert.severity === 'high' ? 'destructive' : 'outline'}>
                    {alert.severity}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{alert.description}</p>
                <div className="flex gap-2 mt-2">
                  {alert.claimIds.map(id => (
                    <Badge key={id} variant="outline">{id}</Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Processing Efficiency */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Claims Processing</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Automated Processing</span>
                <span>{adminMetrics.aiInsights.automatedApprovals}</span>
              </div>
              <Progress value={82} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Manual Review</span>
                <span>{adminMetrics.aiInsights.manualReviewNeeded}</span>
              </div>
              <Progress value={18} className="h-2" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Fraud Prevention Impact</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Amount Saved</span>
              <span className="text-xl font-bold text-green-600">
                {adminMetrics.aiInsights.fraudPrevention}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Detection Accuracy</span>
              <span className="text-xl font-bold text-blue-600">
                {adminMetrics.aiInsights.accuracyRate}
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
} 