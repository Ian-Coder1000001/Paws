// FILE: src/components/layout/AdminSidebar.js

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaHome, 
  FaUsers, 
  FaConciergeBell, 
  FaImages, 
  FaStar, 
  FaEnvelope,
  FaPaw,
  FaChevronDown,
  FaChevronRight,
  FaVideo,
  FaInfoCircle,
  FaUserFriends,
  FaCog,
  FaSignOutAlt,
  FaTachometerAlt,
  FaBlog
} from 'react-icons/fa'
import { signOut } from 'next-auth/react'

export default function AdminSidebar() {
  const pathname = usePathname()
  const [expandedSections, setExpandedSections] = useState({
    media: true,
    content: true
  })

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const navigation = [
    {
      name: 'Dashboard',
      href: '/admin/dashboard',
      icon: FaTachometerAlt,
    },
    {
      name: 'Media Management',
      icon: FaVideo,
      key: 'media',
      children: [
        {
          name: 'Hero Videos & Images',
          href: '/admin/hero',
          icon: FaImages,
          description: 'Manage homepage hero media'
        },
        {
          name: 'Gallery',
          href: '/admin/gallery',
          icon: FaImages,
          description: 'Manage gallery images'
        }
      ]
    },
    {
      name: 'Content Management',
      icon: FaInfoCircle,
      key: 'content',
      children: [
        {
          name: 'About Page',
          href: '/admin/about',
          icon: FaInfoCircle,
          description: 'Manage about page content & images'
        },
        {
          name: 'Team Members',
          href: '/admin/team',
          icon: FaUserFriends,
          description: 'Manage team photos & profiles'
        },
        {
          name: 'Services',
          href: '/admin/services',
          icon: FaConciergeBell,
          description: 'Manage service listings'
        },
        {
          name: 'Reviews',
          href: '/admin/reviews',
          icon: FaStar,
          description: 'Manage customer reviews'
        },
        {
          name: 'Blog Posts',
          href: '/admin/blog',
          icon: FaBlog,
          description: 'Manage blog posts & articles'
        }
      ]
    }
  ]

  const isActiveRoute = (href) => {
    return pathname === href || pathname.startsWith(href + '/')
  }

  const hasActiveChild = (children) => {
    return children?.some(child => isActiveRoute(child.href))
  }

  return (
    <div className="bg-white shadow-lg h-full flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-200">
        <Link href="/admin/dashboard" className="flex items-center space-x-3">
          <div className="relative w-10 h-10">
            <svg viewBox="0 0 120 120" className="w-full h-full">
              <defs>
                <radialGradient id="adminDogGradient" cx="50%" cy="40%" r="60%">
                  <stop offset="0%" stopColor="#ff6b6b" />
                  <stop offset="100%" stopColor="#f15043" />
                </radialGradient>
              </defs>
              <circle cx="60" cy="60" r="55" fill="#fff" stroke="#f1f5f9" strokeWidth="2" />
              <ellipse cx="60" cy="55" rx="28" ry="30" fill="url(#adminDogGradient)" />
              <path d="M35 45 Q30 25 45 35 Q50 45 45 55" fill="url(#adminDogGradient)" />
              <path d="M85 45 Q90 25 75 35 Q70 45 75 55" fill="url(#adminDogGradient)" />
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
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">Admin Panel</h2>
            <p className="text-xs text-gray-500">Pawsome Pals</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {navigation.map((item) => {
          if (item.children) {
            const isExpanded = expandedSections[item.key]
            const hasActive = hasActiveChild(item.children)

            return (
              <div key={item.key}>
                <button
                  onClick={() => toggleSection(item.key)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    hasActive || isExpanded
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </div>
                  {isExpanded ? (
                    <FaChevronDown className="h-4 w-4" />
                  ) : (
                    <FaChevronRight className="h-4 w-4" />
                  )}
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mt-2 ml-4 space-y-1 overflow-hidden"
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`group flex items-start px-3 py-2 text-sm rounded-lg transition-colors ${
                            isActiveRoute(child.href)
                              ? 'text-primary-600 bg-primary-50 border-l-2 border-primary-500'
                              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                          }`}
                        >
                          <child.icon className="mr-3 h-4 w-4 mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="font-medium">{child.name}</div>
                            {child.description && (
                              <div className="text-xs text-gray-500 mt-0.5">
                                {child.description}
                              </div>
                            )}
                          </div>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActiveRoute(item.href)
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* Quick Actions */}
      <div className="p-4 border-t border-gray-200">
        <div className="space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <FaHome className="mr-3 h-4 w-4" />
            View Website
          </Link>
          
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="w-full flex items-center px-3 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
          >
            <FaSignOutAlt className="mr-3 h-4 w-4" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Media Management Tips */}
      <div className="p-4 bg-blue-50 border-t border-blue-100">
        <div className="flex items-start space-x-2">
          <FaPaw className="text-blue-500 mt-1 flex-shrink-0" />
          <div>
            <p className="text-xs font-medium text-blue-900">Media Tips</p>
            <p className="text-xs text-blue-700 mt-1">
              Upload high-quality images for best results. Videos auto-optimize for web.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}




// // FILE: src/components/layout/AdminSidebar.js

