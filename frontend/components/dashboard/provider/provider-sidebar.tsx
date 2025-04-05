"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  ChartBar,
  Shield,
  Brain,
  FileCheck,
  AlertTriangle,
} from "lucide-react"

const providerMenuItems = [
  {
    title: "Dashboard",
    href: "/dashboard/provider",
    icon: LayoutDashboard,
  },
  {
    title: "Policy Management",
    href: "/dashboard/provider/policies",
    icon: FileText,
    submenu: [
      { title: "Active Policies", href: "/dashboard/provider/policies" },
      { title: "Policy Templates", href: "/dashboard/provider/policies/templates" },
      { title: "Create Policy", href: "/dashboard/provider/policies/new" },
    ],
  },
  {
    title: "Claims Processing",
    href: "/dashboard/provider/claims",
    icon: FileCheck,
    submenu: [
      { title: "Pending Claims", href: "/dashboard/provider/claims/pending" },
      { title: "Approved Claims", href: "/dashboard/provider/claims/approved" },
      { title: "Rejected Claims", href: "/dashboard/provider/claims/rejected" },
    ],
  },
  {
    title: "Risk Assessment",
    href: "/dashboard/provider/risk",
    icon: AlertTriangle,
  },
  {
    title: "Analytics",
    href: "/dashboard/provider/analytics",
    icon: ChartBar,
  },
  {
    title: "Team Management",
    href: "/dashboard/provider/team",
    icon: Users,
  },
  {
    title: "Settings",
    href: "/dashboard/provider/settings",
    icon: Settings,
  },
]

export default function ProviderSidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden lg:flex lg:flex-col lg:w-72 lg:border-r">
      <div className="p-6">
        <Link href="/dashboard/provider" className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">SwiftClaim Pro</span>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {providerMenuItems.map((item) => (
          <div key={item.href}>
            <Link
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
                pathname === item.href ? "bg-accent" : "transparent"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
            {item.submenu && (
              <div className="ml-6 mt-2 space-y-1">
                {item.submenu.map((subItem) => (
                  <Link
                    key={subItem.href}
                    href={subItem.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
                      pathname === subItem.href ? "text-primary font-medium" : "text-muted-foreground"
                    )}
                  >
                    {subItem.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  )
} 