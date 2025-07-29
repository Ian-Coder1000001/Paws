// Create this file: scripts/init-admin.js
// Run with: node scripts/init-admin.js

import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

// User schema
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  createdAt: { type: Date, default: Date.now }
})

const User = mongoose.models.User || mongoose.model('User', UserSchema)

async function createAdminUser() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to MongoDB')

    // Check if admin exists
    const existingAdmin = await User.findOne({ email: process.env.ADMIN_EMAIL })
    
    if (existingAdmin) {
      console.log('Admin user already exists')
      
      // Update password if needed
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10)
      existingAdmin.password = hashedPassword
      existingAdmin.role = 'admin'
      await existingAdmin.save()
      console.log('Admin password updated')
    } else {
      // Create new admin
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10)
      
      await User.create({
        email: process.env.ADMIN_EMAIL,
        password: hashedPassword,
        name: 'Admin',
        role: 'admin',
      })
      
      console.log('Admin user created successfully!')
    }
    
    console.log('Email:', process.env.ADMIN_EMAIL)
    console.log('Password:', process.env.ADMIN_PASSWORD)
    
  } catch (error) {
    console.error('Error:', error)
  } finally {
    await mongoose.disconnect()
  }
}

createAdminUser()