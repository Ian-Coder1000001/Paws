// FILE: src/app/api/reviews/route.js

import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Review from '@/models/Review'

// GET /api/reviews - Get all reviews
export async function GET(request) {
  try {
    await dbConnect()
    
    const { searchParams } = new URL(request.url)
    const approvedOnly = searchParams.get('approved') === 'true'
    
    const query = approvedOnly ? { approved: true } : {}
    const reviews = await Review.find(query).sort({ createdAt: -1 })
    
    return NextResponse.json(reviews)
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    )
  }
}

// POST /api/reviews - Create new review
export async function POST(request) {
  try {
    await dbConnect()
    
    const body = await request.json()
    const { name, email, rating, comment, service } = body

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

    // Create review - auto-approved
    const reviewData = {
      name: name.trim(),
      rating: parseInt(rating),
      comment: comment.trim(),
      approved: true, // Auto-approve reviews - changed from false to true
    }

    // Add optional fields only if provided
    if (email && email.trim()) {
      reviewData.email = email.trim()
    }

    if (service && service.trim()) {
      reviewData.service = service.trim()
    }

    const review = new Review(reviewData)
    await review.save()

    return NextResponse.json(review, { status: 201 })
  } catch (error) {
    console.error('Error creating review:', error)
    
    // Handle validation errors specifically
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message)
      return NextResponse.json(
        { error: `Validation failed: ${validationErrors.join(', ')}` },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to create review' },
      { status: 500 }
    )
  }
}