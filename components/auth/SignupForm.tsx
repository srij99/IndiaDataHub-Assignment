"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { signup } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { UserPlus } from "lucide-react"

export default function SignupForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSignup = () => {
    signup(email, password)
    router.push("/login")
  }

  return (
    <Card className="w-[360px] p-4 space-y-3">
      {/* Icon */}
      <div className="flex justify-center">
        <UserPlus className="h-12 w-12 text-primary" />
      </div>

      {/* Title */}
      <h1 className="text-xl font-semibold text-primary text-center">Create Account</h1>

      {/* Inputs */}
      <Input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <Input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

      {/* Button */}
      <Button className="w-full" onClick={handleSignup}>
        Sign Up
      </Button>

      {/* Login link */}
      <p className="text-sm text-center text-muted-foreground">
        Already have an account?{" "}
        <span className="text-primary font-medium cursor-pointer hover:underline" onClick={() => router.push("/login")}>
          Sign in
        </span>
      </p>
    </Card>
  )
}
