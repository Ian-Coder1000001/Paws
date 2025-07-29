'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaCheck, FaTimes, FaTrash, FaStar } from 'react-icons/fa'
import toast from 'react-hot-toast'
import DataTable from '@/components/admin/DataTable'
import { formatDate } from '@/lib/utils'

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchReviews()
  }, [])

  const fetchReviews = async () => {
    try {
      const response = await fetch('/api/reviews')
      if (response.ok) {
        const data = await response.json()
        setReviews(data)
      }
    } catch (error) {
      console.error('Error fetching reviews:', error)
      toast.error('Failed to load reviews')
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (id, approved) => {
    try {
      const response = await fetch(`/api/reviews/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ approved }),
      })

      if (response.ok) {
        toast.success(approved ? 'Review approved' : 'Review rejected')
        fetchReviews()
      } else {
        toast.error('Failed to update review')
      }
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this review?')) return

    try {
      const response = await fetch(`/api/reviews/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast.success('Review deleted successfully')
        setReviews(reviews.filter(r => r._id !== id))
      } else {
        toast.error('Failed to delete review')
      }
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  const getServiceLabel = (service) => {
    const labels = {
      'dog-walking': 'Dog Walking',
      'dog-training': 'Dog Training',
      'dog-grooming': 'Dog Grooming',
    }
    return labels[service] || service
  }

  const columns = [
    {
      key: 'name',
      label: 'Customer',
      render: (value, row) => (
        <div>
          <div className="font-medium">{value}</div>
          <div className="text-sm text-gray-500">{row.email}</div>
        </div>
      ),
    },
    {
      key: 'service',
      label: 'Service',
      render: (value) => getServiceLabel(value),
    },
    {
      key: 'rating',
      label: 'Rating',
      render: (value) => (
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={`${
                i < value ? 'text-yellow-400' : 'text-gray-300'
              }`}
            />
          ))}
          <span className="ml-2 text-sm text-gray-600">({value})</span>
        </div>
      ),
    },
    {
      key: 'comment',
      label: 'Comment',
      render: (value) => (
        <div className="max-w-xs">
          <p className="text-sm text-gray-700 line-clamp-2">{value}</p>
        </div>
      ),
    },
    {
      key: 'createdAt',
      label: 'Date',
      render: (value) => formatDate(value),
    },
    {
      key: 'approved',
      label: 'Status',
      render: (value) => (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
          value ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
        }`}>
          {value ? 'Approved' : 'Pending'}
        </span>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      sortable: false,
      render: (_, row) => (
        <div className="flex items-center space-x-2">
          {!row.approved && (
            <>
              <button
                onClick={() => handleApprove(row._id, true)}
                className="text-green-600 hover:text-green-900"
                title="Approve"
              >
                <FaCheck />
              </button>
              <button
                onClick={() => handleApprove(row._id, false)}
                className="text-red-600 hover:text-red-900"
                title="Reject"
              >
                <FaTimes />
              </button>
            </>
          )}
          <button
            onClick={() => handleDelete(row._id)}
            className="text-red-600 hover:text-red-900"
            title="Delete"
          >
            <FaTrash />
          </button>
        </div>
      ),
    },
  ]

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold mb-8">Reviews</h1>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="loading-spinner"></div>
          </div>
        ) : (
          <>
            {/* Review Stats */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-sm font-medium text-gray-500">Total Reviews</h3>
                <p className="text-3xl font-bold mt-2">{reviews.length}</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-sm font-medium text-gray-500">Approved</h3>
                <p className="text-3xl font-bold mt-2 text-green-600">
                  {reviews.filter(r => r.approved).length}
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-sm font-medium text-gray-500">Pending</h3>
                <p className="text-3xl font-bold mt-2 text-yellow-600">
                  {reviews.filter(r => !r.approved).length}
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-sm font-medium text-gray-500">Average Rating</h3>
                <p className="text-3xl font-bold mt-2">
                  {reviews.length > 0
                    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
                    : '0.0'}
                </p>
              </div>
            </div>

            {/* Reviews Table */}
            <DataTable
              columns={columns}
              data={reviews}
              searchable
              sortable
            />
          </>
        )}
      </motion.div>
    </div>
  )
}