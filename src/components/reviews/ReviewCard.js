import { FaStar } from 'react-icons/fa'
import { formatDate } from '@/lib/utils'

export default function ReviewCard({ review }) {
  const renderStars = () => {
    return [...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        className={`${
          index < review.rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
      />
    ))
  }

  const getServiceLabel = (service) => {
    const labels = {
      'dog-walking': 'Dog Walking',
      'dog-training': 'Dog Training',
      'dog-grooming': 'Dog Grooming',
    }
    return labels[service] || service
  }

  return (
    <div className="card p-6 h-full flex flex-col">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-3">
            <span className="text-xl font-semibold text-primary-600">
              {review.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h3 className="font-semibold">{review.name}</h3>
            <p className="text-sm text-gray-500">{formatDate(review.createdAt)}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center mb-2">
        {renderStars()}
      </div>

      <p className="text-sm text-primary-600 font-medium mb-3">
        {getServiceLabel(review.service)}
      </p>

      <p className="text-gray-700 flex-grow">
        "{review.comment}"
      </p>
    </div>
  )
}