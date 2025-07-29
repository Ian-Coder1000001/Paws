// FILE: src/app/api/hero/route.js

import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Hero from '@/models/Hero'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// GET /api/hero - Get all hero items
export async function GET(request) {
  try {
    await dbConnect()
    
    const { searchParams } = new URL(request.url)
    const activeOnly = searchParams.get('active') === 'true'
    
    const query = activeOnly ? { active: true } : {}
    const heroItems = await Hero.find(query).sort({ order: 1, createdAt: -1 })
    
    return NextResponse.json(heroItems)
  } catch (error) {
    console.error('Error fetching hero items:', error)
    return NextResponse.json(
      { error: 'Failed to fetch hero items' },
      { status: 500 }
    )
  }
}

// POST /api/hero - Create new hero item
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
    const { title, description, mediaUrl, mediaType, active = true, order = 0 } = body

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

    // Create hero item
    const heroItem = new Hero({
      title: title?.trim() || '',
      description: description?.trim() || '',
      mediaUrl: mediaUrl.trim(),
      mediaType,
      active,
      order: parseInt(order) || 0,
    })

    await heroItem.save()

    return NextResponse.json(heroItem, { status: 201 })
  } catch (error) {
    console.error('Error creating hero item:', error)
    return NextResponse.json(
      { error: 'Failed to create hero item' },
      { status: 500 }
    )
  }
}


