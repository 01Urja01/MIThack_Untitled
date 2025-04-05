"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Search, Menu, X, Zap, User, LogOut, Settings, HelpCircle } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/providers/auth-provider"

export default function DashboardHeader() {
  const router = useRouter()
  const { logoutUser } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const handleLogout = () => {
    logoutUser()
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Toggle menu</span>
          </Button>

          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2">
            <Image 
              src="https://i.ibb.co/5Xn2hrY3/logo-white-bg.png"
              alt="Swift Claim Logo"
              width={32}
              height={32}
              className="rounded-lg"
            />
            <span className="font-bold text-xl hidden md:inline-block">Swift Claim</span>
          </Link>
        </div>

        {/* Search - Desktop */}
        <div className="hidden md:flex items-center w-full max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search claims, policies..." className="w-full pl-9 bg-background" />
          </div>
        </div>

        {/* Search - Mobile */}
        <div className="flex md:hidden">
          {isSearchOpen ? (
            <div className="absolute inset-x-0 top-0 h-16 bg-background flex items-center px-4 z-50">
              <Input type="search" placeholder="Search claims, policies..." className="w-full" autoFocus />
              <Button variant="ghost" size="icon" className="ml-2" onClick={() => setIsSearchOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          )}
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold">Dashboard</h2>
          
          <div className="flex items-center gap-2 ml-auto">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-white flex items-center justify-center">
                3
              </span>
            </Button>
            <ModeToggle />
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t">
          <nav className="flex flex-col p-4 space-y-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Zap className="h-5 w-5 text-[#fa6724]" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/dashboard/claims"
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Bell className="h-5 w-5 text-[#07a6ec]" />
              <span>My Claims</span>
            </Link>
            <Link
              href="/dashboard/policies"
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Settings className="h-5 w-5 text-[#fa6724]" />
              <span>Policies</span>
            </Link>
            <Link
              href="/dashboard/profile"
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <User className="h-5 w-5 text-[#07a6ec]" />
              <span>Profile</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

