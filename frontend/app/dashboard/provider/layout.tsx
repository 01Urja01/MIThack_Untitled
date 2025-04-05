"use client"

import type { ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { 
  BarChart3, 
  FileText, 
  Shield, 
  Users, 
  Settings, 
  LogOut,
  DollarSign,
  Calculator,
  RefreshCw,
  CreditCard,
  Brain,
  AlertTriangle,
  ChevronDown,
  ClaimIcon,
  Dashboard,
  Database,
  FileCheck,
  HelpCircle,
  InboxIcon,
  PieChart,
  Upload
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ModeToggle } from "@/components/mode-toggle"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/providers/auth-provider"

interface ProviderLayoutProps {
  children: ReactNode
}

export default function ProviderLayout({ children }: ProviderLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { logoutUser } = useAuth()

  const navigationItems = [
    {
      title: "Analytics",
      href: "/dashboard/provider/analytics",
      icon: BarChart3,
      submenu: [
        { title: "Overview", href: "/dashboard/provider/analytics" },
        { title: "Claims Analytics", href: "/dashboard/provider/analytics/claims" },
        { title: "Fraud Detection", href: "/dashboard/provider/analytics/fraud" },
        { title: "Performance", href: "/dashboard/provider/analytics/performance" }
      ]
    },
    {
      title: "Claims",
      href: "/dashboard/provider/claims",
      icon: FileText,
      submenu: [
        { title: "All Claims", href: "/dashboard/provider/claims/all" },
        { title: "Active Claims", href: "/dashboard/provider/claims/active" },
        { title: "Fraud Alerts", href: "/dashboard/provider/claims/fraud" },
        { title: "Processing Metrics", href: "/dashboard/provider/claims/metrics" }
      ]
    },
    {
      title: "Claim Payments",
      href: "/dashboard/provider/claim-payments",
      icon: DollarSign,
      submenu: [
        { title: "Pending Approvals", href: "/dashboard/provider/claim-payments" },
        { title: "Disbursement History", href: "/dashboard/provider/claim-payments/history" },
        { title: "Payment Analytics", href: "/dashboard/provider/claim-payments/analytics" },
        { title: "Metrics", href: "/dashboard/provider/claim-payments/metrics" }
      ]
    },
    {
      title: "Payments",
      href: "/dashboard/provider/payments",
      icon: CreditCard,
      submenu: [
        { title: "Overview", href: "/dashboard/provider/payments" },
        { title: "Transactions", href: "/dashboard/provider/payments/transactions" },
        { title: "Reports", href: "/dashboard/provider/payments/reports" }
      ]
    },
    {
      title: "Policies",
      href: "/dashboard/provider/policies",
      icon: Shield,
      submenu: [
        { title: "All Policies", href: "/dashboard/provider/policies/all" },
        { title: "Active Policies", href: "/dashboard/provider/policies/active" },
        { title: "Renewals", href: "/dashboard/provider/policies/renewals" },
        { title: "Premium Calculations", href: "/dashboard/provider/policies/premium" }
      ]
    },
    {
      title: "Premium Recalculation",
      href: "/dashboard/provider/premium-recalculation",
      icon: Calculator,
      submenu: [
        { title: "Queue", href: "/dashboard/provider/premium-recalculation" },
        { title: "History", href: "/dashboard/provider/premium-recalculation/history" },
        { title: "AI Insights", href: "/dashboard/provider/premium-recalculation/insights" },
        { title: "Risk Analysis", href: "/dashboard/provider/premium-recalculation/risk" }
      ]
    },
    {
      title: "Renewals",
      href: "/dashboard/provider/renewals",
      icon: RefreshCw,
      submenu: [
        { title: "Overview", href: "/dashboard/provider/renewals" },
        { title: "Upcoming Renewals", href: "/dashboard/provider/renewals/upcoming" },
        { title: "Renewal Metrics", href: "/dashboard/provider/renewals/metrics" },
        { title: "Trends", href: "/dashboard/provider/renewals/trends" }
      ]
    },
    {
      title: "Team",
      href: "/dashboard/provider/team",
      icon: Users,
      submenu: [
        { title: "Overview", href: "/dashboard/provider/team" },
        { title: "Members", href: "/dashboard/provider/team/members" },
        { title: "Departments", href: "/dashboard/provider/team/departments" },
        { title: "Performance", href: "/dashboard/provider/team/performance" }
      ]
    },
    {
      title: "Settings",
      href: "/dashboard/provider/settings",
      icon: Settings,
      submenu: [
        { title: "Company Profile", href: "/dashboard/provider/settings" },
        { title: "AI & Blockchain", href: "/dashboard/provider/settings/ai" },
        { title: "Notifications", href: "/dashboard/provider/settings/notifications" },
        { title: "Security", href: "/dashboard/provider/settings/security" },
        { title: "API", href: "/dashboard/provider/settings/api" },
        { title: "Documents", href: "/dashboard/provider/settings/documents" }
      ]
    }
  ]

  const handleLogout = () => {
    logoutUser()
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <Image
              src="https://i.ibb.co/5Xn2hrY3/logo-white-bg.png"
              alt="Swift Claim"
              width={40}
              height={40}
              className="rounded-lg"
            />
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">Swift Claim</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Provider Portal</p>
            </div>
          </div>

          <nav className="space-y-1">
            {navigationItems.map((item) => {
              const isActive = pathname.startsWith(item.href)
              return (
                <div key={item.href} className="space-y-1">
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive 
                        ? "bg-[#07a6ec] text-white" 
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </Link>
                  
                  {/* Submenu */}
                  {isActive && item.submenu && (
                    <div className="ml-9 space-y-1">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className={`block px-3 py-2 text-sm rounded-lg transition-colors ${
                            pathname === subItem.href
                              ? "bg-[#07a6ec]/10 text-[#07a6ec]"
                              : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                          }`}
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className="flex items-center gap-3 px-3 py-2 w-full text-left text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">
                  <LogOut className="h-5 w-5" />
                  Logout
                </button>
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
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between px-8 py-4">
            <div className="flex items-center gap-3">
              <Image
                src="https://i.ibb.co/8nHxb4zN/claimsaathi-snapping-winking.png"
                alt="Claim Saathi"
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">AI Assistant Active</span>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                <Settings className="h-5 w-5" />
              </button>
              
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none">
                  <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <span className="text-xs font-medium">AD</span>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Admin User</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onSelect={() => router.push("/dashboard/provider/settings")}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <DropdownMenuItem className="text-red-500" onSelect={(e) => e.preventDefault()}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Logout</span>
                      </DropdownMenuItem>
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
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="h-[calc(100vh-4rem)]">
          {children}
        </div>
      </main>
    </div>
  )
} 