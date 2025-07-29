// FILE: src/models/About.js

import mongoose from 'mongoose'

const aboutSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    default: 'About Pawsome Pals',
  },
  subtitle: {
    type: String,
    required: true,
    trim: true,
    default: 'Your trusted partner in professional dog care since 2014',
  },
  story: {
    title: {
      type: String,
      required: true,
      trim: true,
      default: 'Our Story',
    },
    paragraphs: [{
      type: String,
      required: true,
      trim: true,
    }],
  },
  mission: {
    title: {
      type: String,
      required: true,
      trim: true,
      default: 'Our Mission & Values',
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  funFacts: [{
    number: {
      type: String,
      required: true,
      trim: true,
    },
    label: {
      type: String,
      required: true,
      trim: true,
    },
  }],
  heroImage: {
    type: String,
    required: true,
    trim: true,
  },
}, {
  timestamps: true,
})

// Ensure only one about document exists
aboutSchema.index({}, { unique: true })

const About = mongoose.models.About || mongoose.model('About', aboutSchema)

export default About



