// FILE: src/app/api/reviews/[id]/route.js

import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Review from '@/models/Review'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// GET /api/reviews/[id] - Get single review
export async function GET(request, { params }) {
  try {
    await dbConnect()
    
    const review = await Review.findById(params.id)
    
    if (!review) {
      return NextResponse.json(
        { error: 'Review not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(review)
  } catch (error) {
    console.error('Error fetching review:', error)
    return NextResponse.json(
      { error: 'Failed to fetch review' },
      { status: 500 }
    )
  }
}

// PUT /api/reviews/[id] - Update review (admin only)
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
    const { name, email, rating, comment, service, approved } = body

    // Validation
    if (!name?.trim()) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      )
    }

    if (!comment?.trim()) {
      return NextResponse.json(
        { error: 'Comment is required' },
        { status: 400 }
      )
    }

    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      )
    }

    // Validate service enum if provided
    const validServices = ['dog-walking', 'dog-training', 'dog-grooming', 'pet-sitting', 'daycare', '']
    if (service && !validServices.includes(service)) {
      return NextResponse.json(
        { error: 'Invalid service type' },
        { status: 400 }
      )
    }

    // Update review
    const updateData = {
      name: name.trim(),
      rating: parseInt(rating),
      comment: comment.trim(),
      approved: approved !== undefined ? approved : true,
    }

    // Add optional fields only if provided
    if (email !== undefined) {
      updateData.email = email?.trim() || ''
    }

    if (service !== undefined) {
      updateData.service = service?.trim() || ''
    }

    const review = await Review.findByIdAndUpdate(
      params.id,
      updateData,
      { new: true, runValidators: true }
    )

    if (!review) {
      return NextResponse.json(
        { error: 'Review not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(review)
  } catch (error) {
    console.error('Error updating review:', error)
    
    // Handle validation errors specifically
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message)
      return NextResponse.json(
        { error: `Validation failed: ${validationErrors.join(', ')}` },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to update review' },
      { status: 500 }
    )
  }
}

// DELETE /api/reviews/[id] - Delete review (admin only)
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
    
    const review = await Review.findByIdAndDelete(params.id)
    
    if (!review) {
      return NextResponse.json(
        { error: 'Review not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ message: 'Review deleted successfully' })
  } catch (error) {
    console.error('Error deleting review:', error)
    return NextResponse.json(
      { error: 'Failed to delete review' },
      { status: 500 }
    )
  }
}