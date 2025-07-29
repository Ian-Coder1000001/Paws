// FILE: src/components/admin/StatsCard.js

import { motion } from 'framer-motion'

export default function StatsCard({ title, value, subtitle, icon: Icon, color = 'blue' }) {
  const colorClasses = {
    blue: {
      bg: 'bg-blue-500',
      text: 'text-blue-600',
      bgLight: 'bg-blue-50'
    },
    green: {
      bg: 'bg-green-500',
      text: 'text-green-600',
      bgLight: 'bg-green-50'
    },
    purple: {
      bg: 'bg-purple-500',
      text: 'text-purple-600',
      bgLight: 'bg-purple-50'
    },
    pink: {
      bg: 'bg-pink-500',
      text: 'text-pink-600',
      bgLight: 'bg-pink-50'
    },
    yellow: {
      bg: 'bg-yellow-500',
      text: 'text-yellow-600',
      bgLight: 'bg-yellow-50'
    },
    red: {
      bg: 'bg-red-500',
      text: 'text-red-600',
      bgLight: 'bg-red-50'
    }
  }

  const colors = colorClasses[color] || colorClasses.blue

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200"
    >
      <div className="flex items-center">
        <div className={`p-3 rounded-lg ${colors.bgLight} mr-4`}>
          <Icon className={`h-6 w-6 ${colors.text}`} />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {subtitle && (
            <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
          )}
        </div>
      </div>
    </motion.div>
  )
}

