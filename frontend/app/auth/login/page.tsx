"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Fingerprint, ArrowLeft, Zap, Eye, EyeOff } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Loader } from "@/components/ui/loader"
import { login } from "@/lib/auth"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [loginMethod, setLoginMethod] = useState<"password" | "otp" | "biometric">("password")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [otp, setOtp] = useState(["", "", "", ""])
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [userType, setUserType] = useState<"user" | "insurer" | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value[0]
    }

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      if (nextInput) {
        nextInput.focus()
      }
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setIsTransitioning(true)

    try {
      // Call the login API function
      const response = await login({ email, password })
      
      // Handle successful login
      toast({
        title: "Login successful",
        description: "Welcome back to Swift Claim!",
      })
      
      // Redirect based on user role (from the response)
      if (response.user.role === 'customer') {
        router.push("/dashboard/user")
      } else if (response.user.role === 'insurer') {
        router.push("/dashboard/provider")
      } else if (response.user.role === 'admin') {
        router.push("/dashboard/admin")
      } else {
        router.push("/dashboard/user") // Default fallback
      }
    } catch (error) {
      // Handle login error
      const errorMessage = error instanceof Error ? error.message : "Login failed. Please try again."
      setError(errorMessage)
      toast({
        title: "Login failed",
        description: errorMessage,
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
      setIsTransitioning(false)
    }
  }

  const handleBiometricLogin = async () => {
    setIsLoading(true)

    // Note: Real biometric implementation would go here
    // For now we'll simulate it
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Biometric authentication successful",
        description: "Welcome back to Swift Claim!",
      })
      // Redirect based on user type
      if (userType === "user") {
        router.push("/dashboard/user")
      } else {
        router.push("/dashboard/provider")
      }
    }, 1500)
  }

  const handleSendOtp = async () => {
    setIsLoading(true)

    // Note: Real OTP implementation would go here
    // For now we'll simulate it
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "OTP sent",
        description: `A verification code has been sent to ${phoneNumber}`,
      })
      setLoginMethod("otp")
    }, 1000)
  }

  const handleVerifyOtp = async () => {
    setIsLoading(true)

    // Note: Real OTP verification would go here
    // For now we'll simulate it
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "OTP verified",
        description: "Welcome back to Swift Claim!",
      })
      // Redirect based on user type
      if (userType === "user") {
        router.push("/dashboard/user")
      } else {
        router.push("/dashboard/provider")
      }
    }, 1500)
  }

  return (
    <>
      {isTransitioning && <Loader />}
      <div className="min-h-screen flex">
        {/* Left side - Form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            {!userType ? (
              // User Type Selection Screen
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <Image 
                    src="https://i.ibb.co/5Xn2hrY3/logo-white-bg.png"
                    alt="Swift Claim Logo"
                    width={48}
                    height={48}
                    className="mx-auto rounded-xl mb-4"
                  />
                  <h1 className="text-2xl font-bold mb-2">Welcome to Swift Claim</h1>
                  <p className="text-gray-600 dark:text-gray-400">Choose how you want to continue</p>
                </div>

                <div className="grid gap-4">
                  <Button
                    onClick={() => setUserType("user")}
                    className="h-auto p-4 bg-gradient-to-r from-[#fa6724] to-[#fa8124]"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center">
                        <Image
                          src="https://i.ibb.co/DgLw71WX/claimsaathi-happy-tooexcited-smilingwithopenmouth.png"
                          alt="User"
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                      </div>
                      <div className="text-left">
                        <h3 className="font-semibold">I'm a Policyholder</h3>
                        <p className="text-sm text-white/80">File and track insurance claims</p>
                      </div>
                    </div>
                  </Button>

                  <Button
                    onClick={() => setUserType("insurer")}
                    className="h-auto p-4 bg-gradient-to-r from-[#07a6ec] to-[#07c6ec]"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center">
                        <Image
                          src="https://i.ibb.co/XZP3h1bN/claimsaathi-neutral-firm.png"
                          alt="Insurer"
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                      </div>
                      <div className="text-left">
                        <h3 className="font-semibold">I'm an Insurance Provider</h3>
                        <p className="text-sm text-white/80">Manage and process claims</p>
                      </div>
                    </div>
                  </Button>
                </div>
              </div>
            ) : (
              // Existing Login Form with back button
              <div>
                <Button
                  variant="ghost"
                  onClick={() => setUserType(null)}
                  className="mb-6"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                
                {/* Existing login form code */}
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-bold">
                    {userType === "user" ? "Policyholder Login" : "Insurance Provider Login"}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">
                    {userType === "user" 
                      ? "Access your claims dashboard" 
                      : "Access your claims management system"}
                  </p>
                </div>

                <Tabs defaultValue="password" className="w-full">
                  <TabsList className="grid grid-cols-3 mb-8">
                    <TabsTrigger value="password" onClick={() => setLoginMethod("password")}>
                      Password
                    </TabsTrigger>
                    <TabsTrigger value="otp" onClick={() => setLoginMethod("password")}>
                      OTP
                    </TabsTrigger>
                    <TabsTrigger value="biometric" onClick={() => setLoginMethod("biometric")}>
                      Biometric
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="password">
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="name@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="password">Password</Label>
                          <Link href="/auth/forgot-password" className="text-sm text-[#07a6ec] hover:underline">
                            Forgot password?
                          </Link>
                        </div>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="remember" />
                        <label
                          htmlFor="remember"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Remember me
                        </label>
                      </div>
                      <Button type="submit" className="w-full bg-[#fa6724] hover:bg-[#e55613]" disabled={isLoading}>
                        {isLoading ? "Logging in..." : "Log in"}
                      </Button>
                    </form>
                  </TabsContent>

                  <TabsContent value="otp">
                    {loginMethod === "password" ? (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+91 9876543210"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                          />
                        </div>
                        <Button
                          onClick={handleSendOtp}
                          className="w-full bg-[#fa6724] hover:bg-[#e55613]"
                          disabled={isLoading || !phoneNumber}
                        >
                          {isLoading ? "Sending..." : "Send OTP"}
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div>
                          <Label className="block text-center mb-4">
                            Enter the verification code sent to {phoneNumber}
                          </Label>
                          <div className="flex justify-center gap-2">
                            {otp.map((digit, index) => (
                              <Input
                                key={index}
                                id={`otp-${index}`}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleOtpChange(index, e.target.value)}
                                className="w-12 h-12 text-center text-xl"
                              />
                            ))}
                          </div>
                        </div>
                        <Button
                          onClick={handleVerifyOtp}
                          className="w-full bg-[#fa6724] hover:bg-[#e55613]"
                          disabled={isLoading || otp.some((digit) => !digit)}
                        >
                          {isLoading ? "Verifying..." : "Verify OTP"}
                        </Button>
                        <p className="text-center text-sm">
                          Didn't receive the code?{" "}
                          <button type="button" className="text-[#07a6ec] hover:underline" onClick={handleSendOtp}>
                            Resend
                          </button>
                        </p>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="biometric">
                    <div className="space-y-6 text-center">
                      <div className="mx-auto w-32 h-32 rounded-full bg-white flex items-center justify-center">
                        <Image
                          src="https://i.ibb.co/8nHxb4zN/claimsaathi-snapping-winking.png"
                          alt="Claim Saathi"
                          width={120}
                          height={120}
                          className="rounded-full"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-2">Biometric Authentication</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          Use your fingerprint or face ID to securely log in to your account
                        </p>
                        <Button
                          onClick={handleBiometricLogin}
                          className="bg-[#fa6724] hover:bg-[#e55613]"
                          disabled={isLoading}
                        >
                          {isLoading ? "Authenticating..." : "Authenticate"}
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="mt-8 text-center">
                  <p className="text-gray-600 dark:text-gray-400">
                    Don't have an account?{" "}
                    <Link href="/auth/register" className="text-[#07a6ec] hover:underline">
                      Sign up
                    </Link>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right side - Image */}
        <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-[#fa6724] to-[#07a6ec] relative">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0 flex items-center justify-center p-12">
            <div className="max-w-md text-white">
              <h2 className="text-3xl font-bold mb-4">Revolutionizing Insurance Claims</h2>
              <p className="text-lg mb-6">
                Swift Claim reduces claim settlement time from 90 days to under 3 minutes with AI & blockchain
                technology.
              </p>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                    <Image
                      src="https://i.ibb.co/JFW8D5KV/claimsaathi-goodmood-happy.png"
                      alt="Claim Saathi"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  </div>
                  <div className="bg-white/20 rounded-lg p-3">
                    <p className="text-sm">
                      "Swift Claim processed my health insurance claim in just 2 hours! The blockchain verification gave
                      me confidence that everything was secure."
                    </p>
                  </div>
                </div>
                <p className="text-sm font-medium">Priya Sharma, Health Insurance Policyholder</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
