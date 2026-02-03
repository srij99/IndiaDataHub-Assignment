export const signup = (email: string, password: string) => {
  localStorage.setItem("user", JSON.stringify({ email, password }))
}

export const login = (email: string, password: string) => {
  const user = localStorage.getItem("user")
  if (!user) return false

  const parsed = JSON.parse(user)
  if (parsed.email === email && parsed.password === password) {
    localStorage.setItem("isAuthenticated", "true")
    return true
  }
  return false
}

export const logout = () => {
  localStorage.removeItem("isAuthenticated")
}

export const isAuthenticated = (): boolean => {
  if (typeof window === "undefined") {
    return false
  }
  return localStorage.getItem("isAuthenticated") === "true"
}
