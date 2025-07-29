// FILE: src/app/admin/login/page.js

'use client'

import { useState, useEffect } from 'react'
import { signIn, getSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaPaw } from 'react-icons/fa'
import toast from 'react-hot-toast'

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  useEffect(() => {
    if (error) {
      toast.error('Authentication failed. Please try again.')
    }
  }, [error])

  useEffect(() => {
    // Check if already logged in
    const checkSession = async () => {
      const session = await getSession()
      if (session?.user?.isAdmin) {
        router.push('/admin/dashboard')
      }
    }
    checkSession()
  }, [router])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!credentials.email || !credentials.password) {
      toast.error('Please fill in all fields')
      return
    }

    setLoading(true)

    try {
      const result = await signIn('credentials', {
        email: credentials.email,
        password: credentials.password,
        redirect: false,
      })

      if (result?.error) {
        toast.error('Invalid email or password')
      } else if (result?.ok) {
        toast.success('Login successful!')
        router.push('/admin/dashboard')
      }
    } catch (error) {
      console.error('Login error:', error)
      toast.error('An error occurred during login')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setCredentials(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg mb-4"
          >
            <svg viewBox="0 0 120 120" className="w-12 h-12">
              <defs>
                <radialGradient id="loginDogGradient" cx="50%" cy="40%" r="60%">
                  <stop offset="0%" stopColor="#ff6b6b" />
                  <stop offset="100%" stopColor="#f15043" />
                </radialGradient>
              </defs>
              <circle cx="60" cy="60" r="55" fill="#fff" stroke="#f1f5f9" strokeWidth="2" />
              <ellipse cx="60" cy="55" rx="28" ry="30" fill="url(#loginDogGradient)" />
              <path d="M35 45 Q30 25 45 35 Q50 45 45 55" fill="url(#loginDogGradient)" />
              <path d="M85 45 Q90 25 75 35 Q70 45 75 55" fill="url(#loginDogGradient)" />
              <ellipse cx="60" cy="65" rx="20" ry="15" fill="#ffab91" />
              <ellipse cx="60" cy="62" rx="6" ry="4" fill="#37474f" />
              <circle cx="48" cy="50" r="4" fill="#2c3e50" />
              <circle cx="72" cy="50" r="4" fill="#2c3e50" />
              <circle cx="49" cy="48" r="1.5" fill="#ffffff" />
              <circle cx="73" cy="48" r="1.5" fill="#ffffff" />
              <path d="M60 68 Q50 75 45 68" stroke="#37474f" strokeWidth="2" fill="none" strokeLinecap="round" />
              <path d="M60 68 Q70 75 75 68" stroke="#37474f" strokeWidth="2" fill="none" strokeLinecap="round" />
              <path d="M60 70 Q55 78 60 82 Q65 78 60 70" fill="#ff5722" />
            </svg>
          </motion.div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
          <p className="text-gray-600 mt-2">Access your Pawsome Pals dashboard</p>
        </div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={credentials.email}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  placeholder="admin@pawsomepals.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={credentials.password}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <FaEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </motion.button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Protected admin area for authorized personnel only
            </p>
            <div className="mt-3 flex items-center justify-center space-x-2">
              <FaPaw className="h-4 w-4 text-primary-500" />
              <span className="text-xs text-gray-500">Pawsome Pals Admin</span>
            </div>
          </div>
        </motion.div>

        {/* Back to Website */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-6"
        >
          <a
            href="/"
            className="text-sm text-gray-600 hover:text-primary-600 transition-colors"
          >
            ← Back to Website
          </a>
        </motion.div>
      </motion.div>
    </div>
  )
}



