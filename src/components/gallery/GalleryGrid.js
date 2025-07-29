// FILE: src/components/gallery/GalleryGrid.js

'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import GalleryItem from './GalleryItem'
import Lightbox from './Lightbox'

export default function GalleryGrid({ items }) {
  const [selectedItem, setSelectedItem] = useState(null)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const handleItemClick = (item, index) => {
    setSelectedItem(item)
    setSelectedIndex(index)
  }

  const handleNext = () => {
    const nextIndex = (selectedIndex + 1) % items.length
    setSelectedItem(items[nextIndex])
    setSelectedIndex(nextIndex)
  }

  const handlePrevious = () => {
    const prevIndex = (selectedIndex - 1 + items.length) % items.length
    setSelectedItem(items[prevIndex])
    setSelectedIndex(prevIndex)
  }

  return (
    <>
      {/* Equal sized grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item, index) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="aspect-square" // This ensures all items are perfect squares
          >
            <GalleryItem
              item={item}
              onClick={() => handleItemClick(item, index)}
            />
          </motion.div>
        ))}
      </div>

      {selectedItem && (
        <Lightbox
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onNext={handleNext}
          onPrevious={handlePrevious}
          hasNext={selectedIndex < items.length - 1}
          hasPrevious={selectedIndex > 0}
        />
      )}
    </>
  )
}


