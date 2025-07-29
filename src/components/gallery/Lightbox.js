'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

export default function Lightbox({ item, onClose, onNext, onPrevious, hasNext, hasPrevious }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-60"
        >
          <FaTimes className="text-2xl" />
        </button>

        {/* Navigation Buttons */}
        {hasPrevious && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onPrevious()
            }}
            className="absolute left-4 text-white hover:text-gray-300 transition-colors"
          >
            <FaChevronLeft className="text-3xl" />
          </button>
        )}

        {hasNext && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onNext()
            }}
            className="absolute right-4 text-white hover:text-gray-300 transition-colors"
          >
            <FaChevronRight className="text-3xl" />
          </button>
        )}

        {/* Content */}
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
          className="max-w-6xl max-h-[90vh] relative"
          onClick={(e) => e.stopPropagation()}
        >
          {item.mediaType === 'image' ? (
            <img
              src={item.mediaUrl}
              alt={item.title}
              className="max-w-full max-h-[90vh] object-contain"
            />
          ) : (
            <video
              src={item.mediaUrl}
              controls
              autoPlay
              className="max-w-full max-h-[90vh]"
            />
          )}

          {/* Caption */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
            <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
            {item.description && (
              <p className="opacity-90">{item.description}</p>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}