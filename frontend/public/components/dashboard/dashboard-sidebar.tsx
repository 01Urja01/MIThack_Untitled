"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard,
  FileText,
  Shield,
  User,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
  PlusCircle,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useAuth } from "@/providers/auth-provider"

export default function DashboardSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    claims: true,
  })
  const { logoutUser } = useAuth()

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const isActive = (path: string) => {
    return pathname === path
  }
  
  const handleLogout = () => {
    logoutUser()
  }

  return (
    <aside className="hidden md:flex md:flex-col md:w-64 border-r bg-background">
      <ScrollArea className="flex-1">
        <div className="px-3 py-4">
          <h2 className="mb-2 px-4 text-lg font-semibold">Dashboard</h2>
          <div className="space-y-1">
            <Link href="/dashboard/user">
              <Button
                variant={isActive("/dashboard/user") ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Overview
              </Button>
            </Link>

            <Collapsible
              open={openSections.claims}
              onOpenChange={() => toggleSection("claims")}
              className="space-y-1"
            >
              <CollapsibleTrigger asChild>
                <Button
                  variant={pathname.includes("/dashboard/user/claims") ? "secondary" : "ghost"}
                  className="w-full justify-between"
                >
                  <div className="flex items-center">
                    <FileText className="mr-2 h-4 w-4" />
                    Claims
                  </div>
                  <ChevronRight
                    className={`h-4 w-4 transition-transform ${openSections.claims ? "rotate-90" : ""}`}
                  />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-1 pl-6">
                <Link href="/dashboard/user/claims">
                  <Button
                    variant={isActive("/dashboard/user/claims") ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    size="sm"
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Active Claims
                  </Button>
                </Link>
                <Link href="/dashboard/user/claims/new">
                  <Button
                    variant={isActive("/dashboard/user/claims/new") ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    size="sm"
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    File New Claim
                  </Button>
                </Link>
                <Link href="/dashboard/user/claims/history">
                  <Button
                    variant={isActive("/dashboard/user/claims/history") ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    size="sm"
                  >
                    <Clock className="mr-2 h-4 w-4" />
                    Claim History
                  </Button>
                </Link>
              </CollapsibleContent>
            </Collapsible>

            <Link href="/dashboard/user/policies">
              <Button
                variant={pathname.includes("/dashboard/user/policies") ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                <Shield className="mr-2 h-4 w-4" />
                Policies
              </Button>
            </Link>

            <Link href="/dashboard/user/profile">
              <Button
                variant={isActive("/dashboard/user/profile") ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                <User className="mr-2 h-4 w-4" />
                Profile
              </Button>
            </Link>

            <Link href="/dashboard/user/settings">
              <Button
                variant={isActive("/dashboard/user/settings") ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </Link>

            <Link href="/dashboard/user/help">
              <Button variant={isActive("/dashboard/user/help") ? "secondary" : "ghost"} className="w-full justify-start">
                <HelpCircle className="mr-2 h-4 w-4" />
                Help & Support
              </Button>
            </Link>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log Out
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
                  <AlertDialogDescription>
                    You will be redirected to the login page.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleLogout} className="bg-red-500 hover:bg-red-600">
                    Logout
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <div className="bg-[#fa6724]/10 rounded-lg p-3">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-[#fa6724] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Policy Renewal</p>
              <p className="text-xs text-muted-foreground">Your health policy expires in 15 days</p>
              <Button size="sm" variant="link" className="p-0 h-auto text-xs text-[#fa6724]">
                Renew Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}

