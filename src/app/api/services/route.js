// FILE: src/app/api/services/route.js

import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Service from '@/models/Service'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// GET /api/services - Get all services
export async function GET(request) {
  try {
    await dbConnect()
    
    const { searchParams } = new URL(request.url)
    const activeOnly = searchParams.get('active') === 'true'
    
    const query = activeOnly ? { active: true } : {}
    const services = await Service.find(query).sort({ createdAt: -1 })
    
    return NextResponse.json(services)
  } catch (error) {
    console.error('Error fetching services:', error)
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    )
  }
}

// POST /api/services - Create new service
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.isAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 401 }
      )
    }

    await dbConnect()
    
    const body = await request.json()
    const { name, description, price, duration, image, features, active = true } = body

    // Validation
    if (!name?.trim()) {
      return NextResponse.json(
        { error: 'Service name is required' },
        { status: 400 }
      )
    }

    if (!description?.trim()) {
      return NextResponse.json(
        { error: 'Service description is required' },
        { status: 400 }
      )
    }

    if (!image?.trim()) {
      return NextResponse.json(
        { error: 'Service image is required' },
        { status: 400 }
      )
    }

    // Generate initial slug
    let baseSlug = name.trim().toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
    
    let slug = baseSlug
    let counter = 1
    
    // Check if slug exists and increment if needed
    while (await Service.findOne({ slug })) {
      slug = `${baseSlug}-${counter}`
      counter++
    }

    // Create service
    const service = new Service({
      name: name.trim(),
      slug, // Set the unique slug here
      description: description.trim(),
      price: price?.trim() || '',
      duration: duration?.trim() || '',
      image: image.trim(),
      features: Array.isArray(features) ? features : [],
      active,
    })

    await service.save()

    return NextResponse.json(service, { status: 201 })
  } catch (error) {
    console.error('Error creating service:', error)
    
    // Handle duplicate key error specifically
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'A service with similar name already exists. Please choose a different name.' },
        { status: 400 }
      )
    }
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message)
      return NextResponse.json(
        { error: `Validation failed: ${validationErrors.join(', ')}` },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to create service' },
      { status: 500 }
    )
  }
}