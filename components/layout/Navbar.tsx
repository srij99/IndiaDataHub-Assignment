"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { LogOut, User, Database, Calendar, HelpCircle, BarChart3 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { isAuthenticated, logout } from "@/lib/auth"

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname() // triggers re-render on navigation

  const [loggedIn, setLoggedIn] = useState(false)
  useEffect(() => {
    setLoggedIn(isAuthenticated())
  }, [pathname]) // re-check on navigation

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <header className="h-14 bg-primary flex items-center justify-between px-6">
      {/* Left: Logo + Title */}
      <div className="flex items-center gap-2 text-primary-foreground">
        <BarChart3 className="h-5 w-5" />
        <h1 className="text-lg font-semibold">IndiaDataHub</h1>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4">
        {/* Static links */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="text-primary-foreground flex items-center gap-1">
              <Database className="h-4 w-4" />
              Database
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem>Datasets</DropdownMenuItem>
            <DropdownMenuItem>Sources</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" className="text-primary-foreground flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          Calendar
        </Button>

        <Button variant="ghost" className="text-primary-foreground flex items-center gap-1">
          <HelpCircle className="h-4 w-4" />
          Help
        </Button>

        {/* User menu (only if logged in) */}
        {loggedIn && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-primary-foreground">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  )
}
