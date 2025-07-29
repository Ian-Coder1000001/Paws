// FILE: src/app/api/hero/[id]/route.js

import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Hero from '@/models/Hero'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// GET /api/hero/[id] - Get single hero item
export async function GET(request, { params }) {
  try {
    await dbConnect()
    
    const heroItem = await Hero.findById(params.id)
    
    if (!heroItem) {
      return NextResponse.json(
        { error: 'Hero item not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(heroItem)
  } catch (error) {
    console.error('Error fetching hero item:', error)
    return NextResponse.json(
      { error: 'Failed to fetch hero item' },
      { status: 500 }
    )
  }
}

// PUT /api/hero/[id] - Update hero item
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
    const { title, description, mediaUrl, mediaType, active, order } = body

    // Validation
    if (!mediaUrl) {
      return NextResponse.json(
        { error: 'Media URL is required' },
        { status: 400 }
      )
    }

    if (!['image', 'video'].includes(mediaType)) {
      return NextResponse.json(
        { error: 'Media type must be either "image" or "video"' },
        { status: 400 }
      )
    }

    // Update hero item
    const heroItem = await Hero.findByIdAndUpdate(
      params.id,
      {
        title: title?.trim() || '',
        description: description?.trim() || '',
        mediaUrl: mediaUrl.trim(),
        mediaType,
        active: active !== undefined ? active : true,
        order: parseInt(order) || 0,
      },
      { new: true, runValidators: true }
    )

    if (!heroItem) {
      return NextResponse.json(
        { error: 'Hero item not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(heroItem)
  } catch (error) {
    console.error('Error updating hero item:', error)
    return NextResponse.json(
      { error: 'Failed to update hero item' },
      { status: 500 }
    )
  }
}

// DELETE /api/hero/[id] - Delete hero item
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
    
    const heroItem = await Hero.findByIdAndDelete(params.id)
    
    if (!heroItem) {
      return NextResponse.json(
        { error: 'Hero item not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ message: 'Hero item deleted successfully' })
  } catch (error) {
    console.error('Error deleting hero item:', error)
    return NextResponse.json(
      { error: 'Failed to delete hero item' },
      { status: 500 }
    )
  }
}



