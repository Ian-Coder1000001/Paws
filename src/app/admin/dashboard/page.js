// FILE: src/app/admin/dashboard/page.js

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  FaVideo, 
  FaInfoCircle, 
  FaUserFriends, 
  FaImages, 
  FaConciergeBell,
  FaStar,
  FaBlog,
  FaPlus,
  FaUpload,
  FaEye,
  FaEdit
} from 'react-icons/fa'
import StatsCard from '@/components/admin/StatsCard'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    heroItems: 0,
    teamMembers: 0,
    services: 0,
    reviews: 0,
    galleryImages: 0,
    blogPosts: 0
  })

  const [recentActivity, setRecentActivity] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      // Fetch stats from various endpoints
      const [heroRes, teamRes, servicesRes, reviewsRes, galleryRes, blogRes] = await Promise.all([
        fetch('/api/hero'),
        fetch('/api/team'),
        fetch('/api/services'),
        fetch('/api/reviews'),
        fetch('/api/gallery'),
        fetch('/api/blog')
      ])

      const [hero, team, services, reviews, gallery, blog] = await Promise.all([
        heroRes.ok ? heroRes.json() : [],
        teamRes.ok ? teamRes.json() : [],
        servicesRes.ok ? servicesRes.json() : [],
        reviewsRes.ok ? reviewsRes.json() : [],
        galleryRes.ok ? galleryRes.json() : [],
        blogRes.ok ? blogRes.json() : []
      ])

      setStats({
        heroItems: hero.length || 0,
        teamMembers: team.length || 0,
        services: services.length || 0,
        reviews: reviews.length || 0,
        galleryImages: gallery.length || 0,
        blogPosts: blog.length || 0
      })

      // Set recent activity
      setRecentActivity([
        { action: 'Hero media updated', time: '2 hours ago', type: 'hero' },
        { action: 'New blog post published', time: '1 day ago', type: 'blog' },
        { action: 'New team member added', time: '1 day ago', type: 'team' },
        { action: 'About page updated', time: '2 days ago', type: 'about' },
        { action: 'Service information updated', time: '3 days ago', type: 'service' }
      ])

    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const quickActions = [
    {
      title: 'Upload Hero Media',
      description: 'Add new videos or images to homepage',
      href: '/admin/hero',
      icon: FaVideo,
      color: 'bg-blue-500',
      action: 'Upload'
    },
    {
      title: 'Create Blog Post',
      description: 'Write a new blog article',
      href: '/admin/blog/new',
      icon: FaBlog,
      color: 'bg-indigo-500',
      action: 'Create'
    },
    {
      title: 'Update About Page',
      description: 'Edit story, mission, and hero image',
      href: '/admin/about',
      icon: FaInfoCircle,
      color: 'bg-green-500',
      action: 'Edit'
    },
    {
      title: 'Manage Team',
      description: 'Add or edit team member profiles',
      href: '/admin/team',
      icon: FaUserFriends,
      color: 'bg-purple-500',
      action: 'Manage'
    }
  ]

  const mediaManagementCards = [
    {
      title: 'Hero Videos & Images',
      description: 'Manage the rotating media on your homepage hero section',
      href: '/admin/hero',
      icon: FaVideo,
      stats: `${stats.heroItems} items`,
      color: 'border-blue-200 bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Blog Posts',
      description: 'Create and manage your blog articles and content',
      href: '/admin/blog',
      icon: FaBlog,
      stats: `${stats.blogPosts} posts`,
      color: 'border-indigo-200 bg-indigo-50',
      iconColor: 'text-indigo-600'
    },
    {
      title: 'About Page Content',
      description: 'Update your story, mission, and about page image',
      href: '/admin/about',
      icon: FaInfoCircle,
      stats: 'Content ready',
      color: 'border-green-200 bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      title: 'Team Member Profiles',
      description: 'Manage team photos, bios, and professional information',
      href: '/admin/team',
      icon: FaUserFriends,
      stats: `${stats.teamMembers} members`,
      color: 'border-purple-200 bg-purple-50',
      iconColor: 'text-purple-600'
    },
    {
      title: 'Gallery Management',
      description: 'Upload and organize your photo gallery',
      href: '/admin/gallery',
      icon: FaImages,
      stats: `${stats.galleryImages} photos`,
      color: 'border-pink-200 bg-pink-50',
      iconColor: 'text-pink-600'
    },
    {
      title: 'Services Management',
      description: 'Manage your service offerings and pricing',
      href: '/admin/services',
      icon: FaConciergeBell,
      stats: `${stats.services} services`,
      color: 'border-orange-200 bg-orange-50',
      iconColor: 'text-orange-600'
    }
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="loading-spinner"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Manage your website content, media, blog posts, and team information
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Hero Media"
          value={stats.heroItems}
          subtitle="Videos & Images"
          icon={FaVideo}
          color="blue"
        />
        <StatsCard
          title="Blog Posts"
          value={stats.blogPosts}
          subtitle="Published Articles"
          icon={FaBlog}
          color="indigo"
        />
        <StatsCard
          title="Team Members"
          value={stats.teamMembers}
          subtitle="Active Profiles"
          icon={FaUserFriends}
          color="green"
        />
        <StatsCard
          title="Services"
          value={stats.services}
          subtitle="Available Services"
          icon={FaConciergeBell}
          color="purple"
        />
      </div>

      {/* Media Management Section */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Content & Media Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mediaManagementCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={card.href}>
                <div className={`p-6 rounded-lg border-2 transition-all duration-200 hover:shadow-lg hover:scale-105 cursor-pointer ${card.color}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <card.icon className={`h-6 w-6 mr-3 ${card.iconColor}`} />
                        <h3 className="text-lg font-semibold text-gray-900">{card.title}</h3>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{card.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-500">{card.stats}</span>
                        <div className="flex items-center space-x-2">
                          <FaEye className="h-4 w-4 text-gray-400" />
                          <FaEdit className="h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <Link href={action.href}>
                <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer border border-gray-200">
                  <div className="flex items-center mb-3">
                    <div className={`p-2 rounded-lg ${action.color} text-white mr-3`}>
                      <action.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{action.title}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{action.description}</p>
                  <div className="flex items-center text-sm font-medium text-primary-600">
                    <span>{action.action}</span>
                    <FaPlus className="h-3 w-3 ml-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {recentActivity.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="px-6 py-4 hover:bg-gray-50"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  activity.type === 'hero' ? 'bg-blue-100 text-blue-800' :
                  activity.type === 'blog' ? 'bg-indigo-100 text-indigo-800' :
                  activity.type === 'team' ? 'bg-green-100 text-green-800' :
                  activity.type === 'about' ? 'bg-purple-100 text-purple-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {activity.type}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Help Section */}
      <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg p-6 text-white">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
            <p className="text-primary-100 mb-4">
              Learn how to make the most of your admin panel and manage your content effectively.
            </p>
            <div className="space-y-2 text-sm">
              <p>• Upload high-quality images for best results</p>
              <p>• Videos are automatically optimized for web</p>
              <p>• Team photos are cropped to square format</p>
              <p>• Hero images are optimized to 1920x1080px</p>
              <p>• About page images are resized to 800x600px</p>
              <p>• Blog posts support rich text formatting</p>
            </div>
          </div>
          <div className="flex-shrink-0">
            <FaUpload className="h-8 w-8 text-primary-200" />
          </div>
        </div>
      </div>
    </div>
  )
}


