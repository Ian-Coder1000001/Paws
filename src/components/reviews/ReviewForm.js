// FILE: src/components/reviews/ReviewForm.js

'use client'

import { useState } from 'react'
import { FaStar, FaUser, FaEnvelope } from 'react-icons/fa'
import toast from 'react-hot-toast'

export default function ReviewForm({ onSubmit, onCancel }) {
  const [rating, setRating] = useState(5)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    comment: '',
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validation
    if (!formData.name.trim()) {
      toast.error('Please enter your name')
      return
    }

    if (!formData.comment.trim()) {
      toast.error('Please enter your review')
      return
    }

    if (rating === 0) {
      toast.error('Please select a rating')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          service: formData.service,
          comment: formData.comment.trim(),
          rating,
        }),
      })

      if (response.ok) {
        const newReview = await response.json()
        toast.success('Thank you for your review! It has been published.')
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          service: '',
          comment: '',
        })
        setRating(5)
        
        if (onSubmit) onSubmit(newReview)
      } else {
        const error = await response.json()
        toast.error(error.error || 'Failed to submit review')
      }
    } catch (error) {
      console.error('Review submission error:', error)
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card p-8">
      <h3 className="text-2xl font-bold mb-6">Leave a Review</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name and Email */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Your Name *</label>
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your name"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Email (Optional)</label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your.email@example.com"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
        </div>

        {/* Rating */}
        <div>
          <label className="block text-sm font-medium mb-2">Your Rating *</label>
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="text-3xl focus:outline-none transition-colors p-1"
              >
                <FaStar
                  className={`${
                    star <= (hoveredRating || rating)
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
            <span className="ml-2 text-sm text-gray-600">
              {rating} out of 5 stars
            </span>
          </div>
        </div>

        {/* Service */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Which service did you use? (Optional)
          </label>
          <select
            value={formData.service}
            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">Select a service</option>
            <option value="dog-walking">Dog Walking</option>
            <option value="dog-training">Dog Training</option>
            <option value="dog-grooming">Dog Grooming</option>
            <option value="pet-sitting">Pet Sitting</option>
            <option value="daycare">Daycare</option>
          </select>
        </div>

        {/* Comment */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Your Review *
          </label>
          <textarea
            required
            rows={4}
            value={formData.comment}
            onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
            placeholder="Share your experience with Pawsome Pals..."
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 btn-primary"
          >
            {loading ? 'Submitting...' : 'Submit Review'}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
      
      <p className="text-sm text-gray-500 text-center mt-4">
        Your review will be published immediately.
      </p>
    </div>
  )
}


// // FILE: src/components/reviews/ReviewForm.js

