'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function useAuth(requireAuth = false) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (requireAuth && status === 'unauthenticated') {
      router.push('/admin/login')
    }
  }, [requireAuth, status, router])

  const login = async (credentials) => {
    const result = await signIn('credentials', {
      redirect: false,
      ...credentials,
    })
    return result
  }

  const logout = async () => {
    await signOut({ redirect: false })
    router.push('/')
  }

  const isAdmin = session?.user?.role === 'admin'
  const isAuthenticated = status === 'authenticated'
  const isLoading = status === 'loading'

  return {
    session,
    status,
    isAuthenticated,
    isLoading,
    isAdmin,
    login,
    logout,
    user: session?.user,
  }
}