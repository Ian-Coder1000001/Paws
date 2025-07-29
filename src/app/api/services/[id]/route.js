// FILE: src/app/api/services/[id]/route.js

import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Service from '@/models/Service'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// GET /api/services/[id] - Get single service
export async function GET(request, { params }) {
  try {
    await dbConnect()
    
    const service = await Service.findById(params.id)
    
    if (!service) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(service)
  } catch (error) {
    console.error('Error fetching service:', error)
    return NextResponse.json(
      { error: 'Failed to fetch service' },
      { status: 500 }
    )
  }
}

// PUT /api/services/[id] - Update service
export async function PUT(request, { params }) {
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
    const { name, description, price, duration, image, features, active } = body

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

    // Create slug from name
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

    // Update service
    const service = await Service.findByIdAndUpdate(
      params.id,
      {
        name: name.trim(),
        description: description.trim(),
        price: price?.trim() || '',
        duration: duration?.trim() || '',
        image: image.trim(),
        features: Array.isArray(features) ? features : [],
        active: active !== undefined ? active : true,
        slug,
      },
      { new: true, runValidators: true }
    )

    if (!service) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(service)
  } catch (error) {
    console.error('Error updating service:', error)
    return NextResponse.json(
      { error: 'Failed to update service' },
      { status: 500 }
    )
  }
}

// DELETE /api/services/[id] - Delete service
export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.isAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 401 }
      )
    }

    await dbConnect()
    
    const service = await Service.findByIdAndDelete(params.id)
    
    if (!service) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ message: 'Service deleted successfully' })
  } catch (error) {
    console.error('Error deleting service:', error)
    return NextResponse.json(
      { error: 'Failed to delete service' },
      { status: 500 }
    )
  }
}