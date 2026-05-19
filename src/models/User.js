// FILE: src/models/User.js

//Admin@2024@

import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    select: false, // Don't include password in queries by default
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  avatar: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
})

// Only add indexes if they don't exist (prevents duplicate index warning)
if (!userSchema.indexes().find(index => index[0].email)) {
  userSchema.index({ email: 1 })
}

if (!userSchema.indexes().find(index => index[0].isAdmin)) {
  userSchema.index({ isAdmin: 1 })
}

const User = mongoose.models.User || mongoose.model('User', userSchema)

export default User
//User File


