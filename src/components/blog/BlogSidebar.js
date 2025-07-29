// FILE: src/components/blog/BlogSidebar.js

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FaTag, FaNewspaper, FaEnvelope } from 'react-icons/fa'
import toast from 'react-hot-toast'

export default function BlogSidebar({ recentPosts, tags, selectedTag, onTagSelect }) {
  const [email, setEmail] = useState('')
  const [subscribing, setSubscribing] = useState(false)

  const handleNewsletterSubmit = async (e) => {
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

    setSubscribing(true)

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
      setSubscribing(false)
    }
  }

  return (
    <aside className="space-y-8">
      {/* Recent Posts */}
      <div className="card p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <FaNewspaper className="mr-2 text-primary-500" />
          Recent Posts
        </h3>
        <div className="space-y-4">
          {recentPosts.map((post) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug}`}
              className="block group"
            >
              <h4 className="font-medium group-hover:text-primary-500 transition-colors line-clamp-2">
                {post.title}
              </h4>
              <p className="text-sm text-gray-500 mt-1">
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div className="card p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <FaTag className="mr-2 text-primary-500" />
          Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onTagSelect('all')}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              selectedTag === 'all'
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Posts
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => onTagSelect(tag)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedTag === tag
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="card p-6 bg-primary-50">
        <h3 className="text-xl font-bold mb-4">Newsletter</h3>
        <p className="text-gray-700 mb-4">
          Get the latest dog care tips delivered to your inbox!
        </p>
        <form onSubmit={handleNewsletterSubmit} className="space-y-3">
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              disabled={subscribing}
              required
            />
          </div>
          <button
            type="submit"
            disabled={subscribing}
            className="w-full btn-primary disabled:opacity-50"
          >
            {subscribing ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
      </div>
    </aside>
  )
}