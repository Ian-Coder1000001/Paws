import mongoose from 'mongoose'

const GallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  mediaUrl: {
    type: String,
    required: true,
  },
  mediaType: {
    type: String,
    enum: ['image', 'video'],
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['dog-walking', 'dog-training', 'dog-grooming', 'general'],
  },
  tags: [{
    type: String,
  }],
  order: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.Gallery || mongoose.model('Gallery', GallerySchema)