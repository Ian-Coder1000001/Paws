// FILE: src/components/common/NewsletterFormspree.js

'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaEnvelope, FaPaw } from 'react-icons/fa'
import toast from 'react-hot-toast'

export default function NewsletterFormspree() {
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!email.trim()) {
      toast.error('Please enter your email address')
      return
    }

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    if (!emailRegex.test(email.trim())) {
      toast.error('Please enter a valid email address')
      return
    }

    setSubmitting(true)

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
        }),
      })

      if (response.ok) {
        toast.success('Successfully subscribed to our newsletter!')
        setEmail('')
      } else {
        const error = await response.json()
        toast.error(error.error || 'Failed to subscribe')
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error)
      toast.error('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-8 text-white"
    >
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
          <FaPaw className="h-8 w-8" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Stay Updated!</h3>
        <p className="text-primary-100">
          Get the latest news, tips, and special offers for your furry friends
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="w-full pl-12 pr-4 py-3 rounded-lg border-0 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-white focus:outline-none"
            disabled={submitting}
            required
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-white text-primary-500 hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50"
        >
          {submitting ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-500 mr-2"></div>
              Subscribing...
            </div>
          ) : (
            'Subscribe to Newsletter'
          )}
        </button>
      </form>

      <p className="text-sm text-primary-200 text-center mt-4">
        No spam, unsubscribe at any time. We respect your privacy.
      </p>
    </motion.div>
  )
}