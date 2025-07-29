'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import GalleryGrid from '@/components/gallery/GalleryGrid'
import { FaFilter } from 'react-icons/fa'

export default function GalleryPage() {
  const [items, setItems] = useState([])
  const [filteredItems, setFilteredItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { value: 'all', label: 'All' },
    { value: 'dog-walking', label: 'Dog Walking' },
    { value: 'dog-training', label: 'Dog Training' },
    { value: 'dog-grooming', label: 'Dog Grooming' },
    { value: 'general', label: 'Happy Dogs' },
  ]

  useEffect(() => {
    fetchGalleryItems()
  }, [])

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredItems(items)
    } else {
      setFilteredItems(items.filter(item => item.category === selectedCategory))
    }
  }, [items, selectedCategory])

  const fetchGalleryItems = async () => {
    try {
      const response = await fetch('/api/gallery')
      if (response.ok) {
        const data = await response.json()
        setItems(data)
      }
    } catch (error) {
      console.error('Error fetching gallery items:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="section-title">Our Gallery</h1>
          <p className="section-subtitle">
            A glimpse into the happy moments we share with our furry clients
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          <FaFilter className="text-gray-500" />
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedCategory === category.value
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-square bg-gray-200 animate-pulse rounded-lg"></div>
            ))}
          </div>
        ) : (
          <GalleryGrid items={filteredItems} />
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-600 mb-6">
            Want to see your furry friend in our gallery?
          </p>
          <a href="/services" className="btn-primary">
            Book a Service
          </a>
        </motion.div>
      </div>
    </div>
  )
}