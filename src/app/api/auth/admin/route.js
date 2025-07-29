import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import User from '@/models/User'
import { hashPassword } from '@/lib/auth'

export async function GET(request) {
  try {
    await dbConnect()
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({ 
      email: process.env.ADMIN_EMAIL,
      role: 'admin' 
    })
    
    if (!existingAdmin) {
      // Create admin user
      const hashedPassword = await hashPassword(process.env.ADMIN_PASSWORD)
      
      await User.create({
        email: process.env.ADMIN_EMAIL,
        password: hashedPassword,
        name: 'Admin',
        role: 'admin',
      })
      
      return NextResponse.json({ message: 'Admin user created' })
    }
    
    return NextResponse.json({ message: 'Admin already exists' })
  } catch (error) {
    console.error('Admin creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create admin' },
      { status: 500 }
    )
  }
}