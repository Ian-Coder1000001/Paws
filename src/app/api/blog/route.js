// FILE: src/app/api/blog/route.js

import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import BlogPost from '@/models/BlogPost'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// Helper function to generate slug
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export async function GET(request) {
  try {
    await dbConnect()
    const posts = await BlogPost.find().sort({ createdAt: -1 })
    return NextResponse.json(posts)
  } catch (error) {
    console.error('Blog GET error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.isAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    await dbConnect()
    const body = await request.json()
    
    const slug = slugify(body.title)
    const existingPost = await BlogPost.findOne({ slug })
    
    if (existingPost) {
      return NextResponse.json(
        { error: 'A post with this title already exists' },
        { status: 400 }
      )
    }

    const post = await BlogPost.create({
      ...body,
      slug,
    })

    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error('Blog POST error:', error)
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    )
  }
}

