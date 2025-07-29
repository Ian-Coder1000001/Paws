import { FaStar } from 'react-icons/fa'
import { calculateAverageRating } from '@/lib/utils'

export default function ReviewStats({ reviews }) {
  const averageRating = calculateAverageRating(reviews)
  
  const ratingCounts = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  }
  
  reviews.forEach(review => {
    ratingCounts[review.rating]++
  })
  
  const getPercentage = (count) => {
    return reviews.length > 0 ? (count / reviews.length) * 100 : 0
  }

  return (
    <div className="card p-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Overall Rating */}
        <div className="text-center md:text-left">
          <h3 className="text-2xl font-bold mb-4">Overall Rating</h3>
          <div className="flex items-center justify-center md:justify-start mb-2">
            <span className="text-5xl font-bold mr-4">{averageRating}</span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`text-2xl ${
                    i < Math.round(averageRating) ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
          <p className="text-gray-600">Based on {reviews.length} reviews</p>
        </div>

        {/* Rating Distribution */}
        <div>
          <h3 className="text-2xl font-bold mb-4">Rating Distribution</h3>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center">
                <span className="w-4 mr-2">{rating}</span>
                <FaStar className="text-yellow-400 mr-2" />
                <div className="flex-1 bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div
                    className="bg-yellow-400 h-full transition-all duration-500"
                    style={{ width: `${getPercentage(ratingCounts[rating])}%` }}
                  />
                </div>
                <span className="ml-2 text-sm text-gray-600 w-12 text-right">
                  {ratingCounts[rating]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}