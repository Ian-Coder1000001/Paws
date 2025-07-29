// FILE: src/models/Service.js

import mongoose from 'mongoose'

const ServiceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  features: [{
    type: String,
  }],
  packages: [{
    name: String,
    price: String,
    features: [String],
  }],
  active: {
    type: Boolean,
    default: true,
  },
  order: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

// Generate unique slug before saving
ServiceSchema.pre('save', async function(next) {
  if (this.isModified('name') || this.isNew) {
    let baseSlug = this.name.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
    
    let slug = baseSlug
    let counter = 1
    
    // Use the constructor instead of mongoose.models to avoid issues
    const ServiceModel = this.constructor
    
    // Check if slug exists and increment if needed
    while (await ServiceModel.findOne({ slug, _id: { $ne: this._id } })) {
      slug = `${baseSlug}-${counter}`
      counter++
    }
    
    this.slug = slug
  }
  next()
})

// Ensure we always get a fresh model
if (mongoose.models.Service) {
  delete mongoose.models.Service
}

export default mongoose.model('Service', ServiceSchema)