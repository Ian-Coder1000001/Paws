import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaArrowRight } from 'react-icons/fa'
import Card from '@/components/ui/Card'

export default function ServiceCard({ service, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -10 }}
    >
      <Card className="h-full flex flex-col">
        <div className="relative h-48 -mx-6 -mt-6 mb-6">
          <img
            src={service.image}
            alt={service.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-4 left-6">
            <h3 className="text-2xl font-bold text-white">{service.name}</h3>
          </div>
        </div>

        <p className="text-gray-600 mb-4 flex-grow">{service.description}</p>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Starting at</span>
            <span className="text-2xl font-bold text-primary-500">{service.price}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Duration</span>
            <span className="font-medium">{service.duration}</span>
          </div>

          {service.features && service.features.length > 0 && (
            <div className="pt-4 border-t">
              <h4 className="font-semibold mb-2">Includes:</h4>
              <ul className="space-y-1">
                {service.features.slice(0, 3).map((feature, idx) => (
                  <li key={idx} className="text-sm text-gray-600 flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Link
            href={`/services#${service.slug}`}
            className="btn-primary w-full text-center inline-flex items-center justify-center group"
          >
            Learn More
            <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </Card>
    </motion.div>
  )
}