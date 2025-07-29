
// FILE: src/app/api/gallery/[id]/route.js

import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Gallery from '@/models/Gallery'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// GET /api/gallery/[id] - Get single gallery item
export async function GET(request, { params }) {
  try {
    await dbConnect()
    
    const galleryItem = await Gallery.findById(params.id)
    
    if (!galleryItem) {
      return NextResponse.json(
        { error: 'Gallery item not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(galleryItem)
  } catch (error) {
    console.error('Error fetching gallery item:', error)
    return NextResponse.json(
      { error: 'Failed to fetch gallery item' },
      { status: 500 }
    )
  }
}

// PUT /api/gallery/[id] - Update gallery item
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
    const { title, description, image, category, active } = body

    // Validation
    if (!image?.trim()) {
      return NextResponse.json(
        { error: 'Image URL is required' },
        { status: 400 }
      )
    }

    // Update gallery item
    const galleryItem = await Gallery.findByIdAndUpdate(
      params.id,
      {
        title: title?.trim() || '',
        description: description?.trim() || '',
        image: image.trim(),
        category: category?.trim() || 'general',
        active: active !== undefined ? active : true,
      },
      { new: true, runValidators: true }
    )

    if (!galleryItem) {
      return NextResponse.json(
        { error: 'Gallery item not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(galleryItem)
  } catch (error) {
    console.error('Error updating gallery item:', error)
    return NextResponse.json(
      { error: 'Failed to update gallery item' },
      { status: 500 }
    )
  }
}

// DELETE /api/gallery/[id] - Delete gallery item
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
    
    const galleryItem = await Gallery.findByIdAndDelete(params.id)
    
    if (!galleryItem) {
      return NextResponse.json(
        { error: 'Gallery item not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ message: 'Gallery item deleted successfully' })
  } catch (error) {
    console.error('Error deleting gallery item:', error)
    return NextResponse.json(
      { error: 'Failed to delete gallery item' },
      { status: 500 }
    )
  }
}