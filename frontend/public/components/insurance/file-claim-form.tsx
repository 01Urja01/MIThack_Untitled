"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "lucide-react"
import { format } from "date-fns"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export function FileClaimForm() {
  const [date, setDate] = useState<Date>()

  return (
    <Card className="file-claim-form">
      <h3 className="text-lg font-semibold mb-4">File a New Claim</h3>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="policyNumber">Policy Number</Label>
          <Input id="policyNumber" placeholder="Enter your policy number" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="incidentDate">Date of Incident</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="claimType">Claim Type</Label>
          <select
            id="claimType"
            className="w-full rounded-md border border-input bg-background px-3 py-2"
          >
            <option value="">Select claim type</option>
            <option value="medical">Medical Claim</option>
            <option value="accident">Accident Claim</option>
            <option value="property">Property Claim</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Incident Description</Label>
          <textarea
            id="description"
            className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2"
            placeholder="Describe what happened..."
          />
        </div>

        <div className="pt-4">
          <Button className="w-full bg-primary hover:bg-primary/90">
            Submit Claim
          </Button>
        </div>
      </div>
    </Card>
  )
} 