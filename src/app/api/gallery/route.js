

// FILE: src/app/api/gallery/route.js

import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Gallery from '@/models/Gallery'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// GET /api/gallery - Get all gallery items
export async function GET(request) {
  try {
    await dbConnect()
    
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    
    let query = {}
    if (category) {
      query.category = category
    }
    
    const galleryItems = await Gallery.find(query).sort({ order: 1, createdAt: -1 })
    
    return NextResponse.json(galleryItems)
  } catch (error) {
    console.error('Error fetching gallery items:', error)
    return NextResponse.json(
      { error: 'Failed to fetch gallery items' },
      { status: 500 }
    )
  }
}

// POST /api/gallery - Create new gallery item
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
    const { 
      title, 
      description, 
      mediaUrl, 
      mediaType = 'image', 
      category = 'general',
      tags = [],
      order = 0
    } = body

    // Validation - match your existing model requirements
    if (!title?.trim()) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      )
    }

    if (!mediaUrl?.trim()) {
      return NextResponse.json(
        { error: 'Media URL is required' },
        { status: 400 }
      )
    }

    if (!category?.trim()) {
      return NextResponse.json(
        { error: 'Category is required' },
        { status: 400 }
      )
    }

    // Validate category against your enum
    const validCategories = ['dog-walking', 'dog-training', 'dog-grooming', 'general']
    if (!validCategories.includes(category)) {
      return NextResponse.json(
        { error: 'Invalid category' },
        { status: 400 }
      )
    }

    // Validate media type
    const validMediaTypes = ['image', 'video']
    if (!validMediaTypes.includes(mediaType)) {
      return NextResponse.json(
        { error: 'Invalid media type' },
        { status: 400 }
      )
    }

    // Create gallery item
    const galleryItem = new Gallery({
      title: title.trim(),
      description: description?.trim() || '',
      mediaUrl: mediaUrl.trim(),
      mediaType,
      category,
      tags: Array.isArray(tags) ? tags.filter(tag => tag.trim()) : [],
      order: parseInt(order) || 0,
    })

    await galleryItem.save()

    return NextResponse.json(galleryItem, { status: 201 })
  } catch (error) {
    console.error('Error creating gallery item:', error)
    return NextResponse.json(
      { error: 'Failed to create gallery item' },
      { status: 500 }
    )
  }
}