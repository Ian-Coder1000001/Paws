

import mongoose from 'mongoose'

const ReviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false, // Make email optional
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
  },
  service: {
    type: String,
    required: false, // Make service optional
    enum: ['dog-walking', 'dog-training', 'dog-grooming', 'pet-sitting', 'daycare', ''],
  },
  approved: {
    type: Boolean,
    default: true, // Auto-approve reviews - changed from false to true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

// Ensure we always get a fresh model
if (mongoose.models.Review) {
  delete mongoose.models.Review
}

export default mongoose.model('Review', ReviewSchema)