import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { login as apiLogin, logout as apiLogout, checkAuth } from '../lib/api'

interface AuthUser {
  authenticated: boolean
}

interface AuthContextType {
  user: AuthUser | null
  loading: boolean
  signIn: (password: string) => Promise<{ error: string | null }>
  signOut: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if existing token is still valid
    checkAuth().then((authenticated) => {
      setUser(authenticated ? { authenticated: true } : null)
      setLoading(false)
    })
  }, [])

  const signIn = async (password: string) => {
    try {
      await apiLogin(password)
      setUser({ authenticated: true })
      return { error: null }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Invalid password'
      return { error: message }
    }
  }

  const signOut = () => {
    apiLogout()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
