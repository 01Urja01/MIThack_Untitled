"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  FileText,
  Shield,
  Brain,
  Settings,
  User,
  Bell,
  Wallet,
  History,
  HelpCircle,
} from "lucide-react"

const menuItems = [
  {
    title: "Overview",
    href: "/dashboard/user",
    icon: LayoutDashboard,
  },
  {
    title: "Claims",
    href: "/dashboard/user/claims",
    icon: FileText,
    submenu: [
      { title: "Active Claims", href: "/dashboard/user/claims" },
      { title: "File New Claim", href: "/dashboard/user/claims/new" },
      { title: "Claim History", href: "/dashboard/user/claims/history" },
    ]
  },
  {
    title: "Policies",
    href: "/dashboard/user/policies",
    icon: Shield,
    submenu: [
      { title: "My Policies", href: "/dashboard/user/policies" },
      { title: "Policy Details", href: "/dashboard/user/policies/details" },
      { title: "Renewals", href: "/dashboard/user/policies/renewals" },
    ]
  },
  {
    title: "AI Analysis",
    href: "/dashboard/user/ai",
    icon: Brain,
    submenu: [
      { title: "Risk Assessment", href: "/dashboard/user/ai/risk" },
      { title: "Fraud Detection", href: "/dashboard/user/ai/fraud" },
      { title: "Insights", href: "/dashboard/user/ai/insights" },
    ]
  },
  {
    title: "Notifications",
    href: "/dashboard/user/notifications",
    icon: Bell,
  },
  {
    title: "Wallet",
    href: "/dashboard/user/wallet",
    icon: Wallet,
  },
  {
    title: "Profile",
    href: "/dashboard/user/profile",
    icon: User,
  },
  {
    title: "Settings",
    href: "/dashboard/user/settings",
    icon: Settings,
  },
  {
    title: "Help & Support",
    href: "/dashboard/user/help",
    icon: HelpCircle,
  },
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <nav className="space-y-2">
      {menuItems.map((item) => {
        const Icon = item.icon
        const isActive = pathname === item.href

        return (
          <div key={item.href}>
            <Link
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
                isActive ? "bg-accent" : "transparent"
              )}
            >
              <Icon className={cn(
                "h-4 w-4",
                isActive ? "text-[#fa6724]" : "text-muted-foreground"
              )} />
              <span className={cn(
                isActive ? "text-foreground font-medium" : "text-muted-foreground"
              )}>
                {item.title}
              </span>
            </Link>
            
            {item.submenu && isActive && (
              <div className="ml-6 mt-2 space-y-1">
                {item.submenu.map((subItem) => (
                  <Link
                    key={subItem.href}
                    href={subItem.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
                      pathname === subItem.href ? "text-[#07a6ec] font-medium" : "text-muted-foreground"
                    )}
                  >
                    {subItem.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </nav>
  )
} 