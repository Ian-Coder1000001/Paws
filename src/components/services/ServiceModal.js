import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes } from 'react-icons/fa'

export default function ServiceModal({ service, onClose }) {
  if (!service) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold">{service.title}</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>
            
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
            
            <div className="space-y-4">
              <p className="text-gray-700">{service.description}</p>
              
              <div>
                <h3 className="font-semibold mb-2">Duration:</h3>
                <p className="text-gray-600">{service.duration}</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Starting Price:</h3>
                <p className="text-2xl text-primary-500 font-bold">{service.price}</p>
              </div>
              
              <div className="pt-4">
                <a
                  href="/contact"
                  className="btn-primary w-full text-center"
                >
                  Book This Service
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}