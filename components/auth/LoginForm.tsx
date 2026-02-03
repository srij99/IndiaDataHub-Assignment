"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { login } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { UserCircle } from "lucide-react"

export default function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = () => {
    const success = login(email, password)
    if (success) router.push("/")
    else alert("Invalid credentials")
  }

  return (
    <Card className="w-[360px] p-4 space-y-3">
      {/* Icon */}
      <div className="flex justify-center">
        <UserCircle className="h-12 w-12 text-primary" />
      </div>

      {/* Title */}
      <h1 className="text-xl font-semibold text-primary text-center">Sign In</h1>

      {/* Inputs */}
      <Input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <Input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

      {/* Button */}
      <Button className="w-full" onClick={handleLogin}>
        Login
      </Button>

      {/* Signup link */}
      <p className="text-sm text-center text-muted-foreground">
        Don’t have an account yet?{" "}
        <span
          className="text-primary font-medium cursor-pointer hover:underline"
          onClick={() => router.push("/signup")}
        >
          Sign up
        </span>
      </p>
    </Card>
  )
}
