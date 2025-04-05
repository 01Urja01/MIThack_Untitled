"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, CheckCircle, Clock, AlertTriangle } from "lucide-react"

// Dummy smart contract data
const smartContractData = {
  contractAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
  transactions: [
    {
      id: "TX123",
      type: "Claim Verification",
      status: "Completed",
      timestamp: "2024-03-20 14:30:00",
      details: "Health claim verified via Aadhaar",
      hash: "0x8a24...",
    },
    {
      id: "TX124",
      type: "Policy Update",
      status: "Pending",
      timestamp: "2024-03-20 14:35:00",
      details: "Premium payment verification",
      hash: "0x9b35...",
    },
    // Add more transactions...
  ],
  metrics: {
    totalClaims: 156,
    successfulPayouts: 142,
    averageProcessingTime: "4.2 minutes",
    fraudPrevented: 14,
  }
}

export function SmartContractViewer() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Shield className="h-6 w-6 text-[#07a6ec]" />
        <div>
          <h3 className="text-lg font-semibold">Smart Contract Status</h3>
          <p className="text-sm text-muted-foreground">
            Contract: {smartContractData.contractAddress.slice(0, 6)}...
            {smartContractData.contractAddress.slice(-4)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(smartContractData.metrics).map(([key, value]) => (
          <Card key={key} className="p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </p>
              <p className="text-lg font-semibold">{value}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="space-y-4">
        <h4 className="font-medium">Recent Transactions</h4>
        {smartContractData.transactions.map((tx) => (
          <div key={tx.id} className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-4">
              {tx.status === "Completed" ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <Clock className="h-5 w-5 text-yellow-500" />
              )}
              <div>
                <p className="font-medium">{tx.type}</p>
                <p className="text-sm text-muted-foreground">{tx.details}</p>
              </div>
            </div>
            <div className="text-right">
              <Badge variant={tx.status === "Completed" ? "default" : "outline"}>
                {tx.status}
              </Badge>
              <p className="text-xs text-muted-foreground mt-1">{tx.hash}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 