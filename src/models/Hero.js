// FILE: src/models/Hero.js

import mongoose from 'mongoose'

const heroSchema = new mongoose.Schema({
  title: {
    type: String,
    default: '',
    trim: true,
  },
  description: {
    type: String,
    default: '',
    trim: true,
  },
  mediaUrl: {
    type: String,
    required: true,
    trim: true,
  },
  mediaType: {
    type: String,
    required: true,
    enum: ['image', 'video'],
    default: 'image',
  },
  active: {
    type: Boolean,
    default: true,
  },
  order: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
})

// Index for efficient querying
heroSchema.index({ active: 1, order: 1 })

const Hero = mongoose.models.Hero || mongoose.model('Hero', heroSchema)

export default Hero

