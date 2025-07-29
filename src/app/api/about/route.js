// FILE: src/app/api/about/route.js

import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import About from '@/models/About'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// GET /api/about - Get about page data
export async function GET(request) {
  try {
    await dbConnect()
    
    const aboutData = await About.findOne().sort({ updatedAt: -1 })
    
    if (!aboutData) {
      // Return default structure if no data exists
      return NextResponse.json({
        title: 'About Pawsome Pals',
        subtitle: 'Your trusted partner in professional dog care since 2014',
        story: {
          title: 'Our Story',
          paragraphs: [
            'Pawsome Pals was born from a simple belief: every dog deserves love, care, and professional attention. Founded in 2014 by Sarah Johnson, a lifelong dog lover and certified trainer, we started as a small neighborhood dog walking service.',
            'What began as walks in the park has grown into a comprehensive dog care facility offering walking, training, and grooming services. Our team has expanded, but our core mission remains the same: treating every dog with the love and respect they deserve.',
            'Today, we\'re proud to be the trusted choice for hundreds of dog owners in our community. When you choose Pawsome Pals, you\'re not just getting a service – you\'re joining a family that cares deeply about your furry friend\'s wellbeing.'
          ]
        },
        mission: {
          title: 'Our Mission & Values',
          description: 'To provide exceptional dog care services that enhance the lives of pets and bring peace of mind to their owners, all while building a community of dog lovers.'
        },
        funFacts: [
          { number: '500+', label: 'Happy Dogs' },
          { number: '10+', label: 'Years of Service' },
          { number: '50+', label: 'Five-Star Reviews' },
          { number: '24/7', label: 'Emergency Support' }
        ],
        heroImage: 'https://res.cloudinary.com/dtpnfedy5/image/upload/v1/pawsome-pals/about-hero.jpg'
      })
    }
    
    return NextResponse.json(aboutData)
  } catch (error) {
    console.error('Error fetching about data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch about data' },
      { status: 500 }
    )
  }
}

// POST /api/about - Create or update about page data
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
      subtitle,
      story,
      mission,
      funFacts,
      heroImage
    } = body

    // Validation
    if (!title?.trim()) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      )
    }

    if (!subtitle?.trim()) {
      return NextResponse.json(
        { error: 'Subtitle is required' },
        { status: 400 }
      )
    }

    if (!heroImage?.trim()) {
      return NextResponse.json(
        { error: 'Hero image is required' },
        { status: 400 }
      )
    }

    if (!story?.title?.trim() || !story?.paragraphs?.length) {
      return NextResponse.json(
        { error: 'Story section is required with at least one paragraph' },
        { status: 400 }
      )
    }

    if (!mission?.title?.trim() || !mission?.description?.trim()) {
      return NextResponse.json(
        { error: 'Mission section is required' },
        { status: 400 }
      )
    }

    // Prepare data
    const aboutData = {
      title: title.trim(),
      subtitle: subtitle.trim(),
      story: {
        title: story.title.trim(),
        paragraphs: story.paragraphs.filter(p => p.trim()).map(p => p.trim())
      },
      mission: {
        title: mission.title.trim(),
        description: mission.description.trim()
      },
      funFacts: funFacts?.filter(f => f.number && f.label) || [],
      heroImage: heroImage.trim(),
    }

    // Update or create (upsert)
    const result = await About.findOneAndUpdate(
      {},
      aboutData,
      { 
        upsert: true, 
        new: true,
        runValidators: true
      }
    )

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error saving about data:', error)
    return NextResponse.json(
      { error: 'Failed to save about data' },
      { status: 500 }
    )
  }
}


