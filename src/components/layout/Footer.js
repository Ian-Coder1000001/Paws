// FILE: src/components/layout/Footer.js

'use client'

import Link from 'next/link'
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaPhone, FaClock, FaHeart } from 'react-icons/fa'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const currentYear = new Date().getFullYear()

  const handleNewsletter = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        toast.success('Successfully subscribed to newsletter!')
        setEmail('')
      } else {
        toast.error('Failed to subscribe. Please try again.')
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Pawsome Pals</h3>
            <p className="text-gray-400 mb-4">
              Professional dog care services with love and expertise. For All the Dogs!
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="hover:text-primary-400 transition-colors">
                <FaFacebookF size={20} />
              </a>
              <a href="https://twitter.com" className="hover:text-primary-400 transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="https://instagram.com" className="hover:text-primary-400 transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="https://youtube.com" className="hover:text-primary-400 transition-colors">
                <FaYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/services" className="text-gray-400 hover:text-white transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-400 hover:text-white transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="text-gray-400 hover:text-white transition-colors">
                  Admin Access
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center space-x-3">
                <FaPhone className="text-primary-400" />
                <a href="tel:+1234567890" className="hover:text-white transition-colors">
                  +1 (234) 567-890
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <FaClock className="text-primary-400 mt-1" />
                <div>
                  <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
                  <p>Sat - Sun: 10:00 AM - 4:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <p className="text-gray-400 mb-4">
              Subscribe to get updates on our services and dog care tips!
            </p>
            <form onSubmit={handleNewsletter} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                required
                className="w-full px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary"
              >
                {loading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left text-gray-400 space-y-2 md:space-y-0">
            <p>&copy; {currentYear} Pawsome Pals. All rights reserved.</p>
            <p className="flex items-center justify-center">
              Created with 
              <FaHeart className="text-red-500 mx-1 animate-pulse" />
              by 
              <a 
                href="https://iansh.netlify.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="ml-1 text-primary-400 hover:text-primary-300 transition-colors font-medium"
              >
                Sheezy
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

