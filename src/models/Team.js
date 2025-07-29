// FILE: src/models/Team.js

import mongoose from 'mongoose'

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    required: true,
    trim: true,
  },
  bio: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        return !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v)
      },
      message: 'Please enter a valid email'
    }
  },
  phone: {
    type: String,
    trim: true,
  },
  experience: {
    type: String,
    trim: true,
  },
  specialties: [{
    type: String,
    trim: true,
  }],
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
teamSchema.index({ active: 1, order: 1 })
teamSchema.index({ name: 1 })

const Team = mongoose.models.Team || mongoose.model('Team', teamSchema)

export default Team

