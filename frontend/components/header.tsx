"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Zap, User } from "lucide-react"
import { ModeToggle } from "./mode-toggle"
import { useAuth } from "@/providers/auth-provider"
import { useRouter } from "next/navigation"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, isLoggedIn, logoutUser } = useAuth()
  const router = useRouter()

  const handleLoginClick = () => {
    router.push('/auth/login')
  }

  const handleSignupClick = () => {
    router.push('/auth/register')
  }

  const handleDashboardClick = () => {
    if (user?.role === 'customer') {
      router.push('/dashboard/user')
    } else if (user?.role === 'insurer') {
      router.push('/dashboard/provider')
    } else {
      router.push('/dashboard/user') // Default fallback
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-8 w-8 rounded-full bg-gradient-to-br from-[#fa6724] to-[#07a6ec]">
              <div className="absolute inset-1 rounded-full bg-white dark:bg-black flex items-center justify-center">
                <Zap className="h-4 w-4 text-[#fa6724]" />
              </div>
            </div>
            <span className="font-bold text-xl">Swift Claim</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/features" className="text-sm font-medium hover:text-[#fa6724] transition-colors">
            Features
          </Link>
          <Link href="/blockchain" className="text-sm font-medium hover:text-[#fa6724] transition-colors">
            Blockchain
          </Link>
          <Link href="/pricing" className="text-sm font-medium hover:text-[#fa6724] transition-colors">
            Pricing
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-[#fa6724] transition-colors">
            About
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <ModeToggle />
          
          {isLoggedIn ? (
            <>
              <Button 
                variant="outline" 
                className="border-[#07a6ec] text-[#07a6ec] hover:bg-[#07a6ec] hover:text-white flex items-center gap-2"
                onClick={handleDashboardClick}
              >
                <User className="h-4 w-4" />
                Dashboard
              </Button>
              <Button 
                className="bg-[#fa6724] hover:bg-[#e55613] text-white"
                onClick={logoutUser}
              >
                Log out
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="outline" 
                className="border-[#07a6ec] text-[#07a6ec] hover:bg-[#07a6ec] hover:text-white"
                onClick={handleLoginClick}
              >
                Log in
              </Button>
              <Button 
                className="bg-[#fa6724] hover:bg-[#e55613] text-white"
                onClick={handleSignupClick}
              >
                Sign up
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-4">
          <ModeToggle />
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t py-4">
          <nav className="container flex flex-col gap-4">
            <Link
              href="/features"
              className="px-4 py-2 text-sm font-medium hover:bg-muted rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="/blockchain"
              className="px-4 py-2 text-sm font-medium hover:bg-muted rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Blockchain
            </Link>
            <Link
              href="/pricing"
              className="px-4 py-2 text-sm font-medium hover:bg-muted rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="/about"
              className="px-4 py-2 text-sm font-medium hover:bg-muted rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <div className="flex flex-col gap-2 mt-2 px-4">
              {isLoggedIn ? (
                <>
                  <Button 
                    variant="outline" 
                    className="w-full border-[#07a6ec] text-[#07a6ec] flex items-center gap-2"
                    onClick={handleDashboardClick}
                  >
                    <User className="h-4 w-4" />
                    Dashboard
                  </Button>
                  <Button 
                    className="w-full bg-[#fa6724] hover:bg-[#e55613] text-white"
                    onClick={logoutUser}
                  >
                    Log out
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    className="w-full border-[#07a6ec] text-[#07a6ec] flex items-center gap-2"
                    onClick={handleLoginClick}
                  >
                    Log in
                  </Button>
                  <Button 
                    className="w-full bg-[#fa6724] hover:bg-[#e55613] text-white"
                    onClick={handleSignupClick}
                  >
                    Sign up
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

