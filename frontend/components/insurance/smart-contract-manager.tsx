"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, Key, Lock, CheckCircle } from "lucide-react"

interface SmartContract {
  id: string
  type: string
  status: "active" | "pending" | "expired"
  deployedAt: string
  lastUpdated: string
  transactions: number
  coverage: {
    type: string
    amount: string
    terms: string[]
  }
}

const contractTemplates = [
  {
    id: "health-basic",
    name: "Health Insurance - Basic",
    description: "Standard health insurance contract with basic coverage",
    parameters: ["coverage_amount", "deductible", "waiting_period"]
  },
  {
    id: "health-premium",
    name: "Health Insurance - Premium",
    description: "Premium health insurance with enhanced coverage",
    parameters: ["coverage_amount", "deductible", "waiting_period", "wellness_benefits"]
  }
]

export function SmartContractManager() {
  const [selectedTemplate, setSelectedTemplate] = useState(contractTemplates[0])

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold">Smart Contract Management</h3>
            <p className="text-sm text-muted-foreground">Deploy and manage insurance smart contracts</p>
          </div>
          <Button className="bg-secondary hover:bg-secondary/90">
            <Shield className="h-4 w-4 mr-2" />
            Deploy New Contract
          </Button>
        </div>

        <div className="grid gap-6">
          <div className="space-y-4">
            <h4 className="font-medium">Contract Templates</h4>
            <div className="grid gap-4">
              {contractTemplates.map((template) => (
                <div
                  key={template.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors
                    ${selectedTemplate.id === template.id ? 'border-secondary bg-secondary/5' : 'hover:border-secondary/50'}`}
                  onClick={() => setSelectedTemplate(template)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium">{template.name}</h5>
                      <p className="text-sm text-muted-foreground">{template.description}</p>
                    </div>
                    {selectedTemplate.id === template.id && (
                      <CheckCircle className="h-5 w-5 text-secondary" />
                    )}
                  </div>
                  <div className="mt-3 flex gap-2">
                    {template.parameters.map((param) => (
                      <Badge key={param} variant="outline">
                        {param.replace('_', ' ')}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
} 