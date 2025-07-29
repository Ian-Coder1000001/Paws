// FILE: src/app/api/admin/setup/route.js

import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import User from '@/models/User'
import bcrypt from 'bcryptjs'

export async function POST(request) {
  try {
    await dbConnect()

    // Check if admin already exists
    const existingAdmin = await User.findOne({ isAdmin: true })
    if (existingAdmin) {
      return NextResponse.json(
        { error: 'Admin user already exists' },
        { status: 400 }
      )
    }

    const { email, password, name } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash(password, 12)
    
    const adminUser = new User({
      email: email.toLowerCase(),
      password: hashedPassword,
      name: name || 'Admin',
      isAdmin: true,
    })

    await adminUser.save()

    return NextResponse.json({ 
      message: 'Admin user created successfully',
      user: {
        id: adminUser._id,
        email: adminUser.email,
        name: adminUser.name,
        isAdmin: adminUser.isAdmin
      }
    })

  } catch (error) {
    console.error('Setup error:', error)
    return NextResponse.json(
      { error: 'Failed to create admin user' },
      { status: 500 }
    )
  }
}