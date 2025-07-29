// FILE: src/app/api/blog/[id]/route.js

import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import BlogPost from '@/models/BlogPost'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(request, { params }) {
  try {
    const { id } = await params
    await dbConnect()
    const post = await BlogPost.findById(id)
    
    if (!post) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(post)
  } catch (error) {
    console.error('Blog GET error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    )
  }
}

export async function PUT(request, { params }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.isAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id } = await params
    await dbConnect()
    const body = await request.json()
    
    // Update the updatedAt field
    body.updatedAt = new Date()
    
    const post = await BlogPost.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    )
    
    if (!post) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(post)
  } catch (error) {
    console.error('Blog PUT error:', error)
    return NextResponse.json(
      { error: 'Failed to update blog post' },
      { status: 500 }
    )
  }
}

export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.isAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id } = await params
    await dbConnect()
    const post = await BlogPost.findByIdAndDelete(id)
    
    if (!post) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ message: 'Blog post deleted successfully' })
  } catch (error) {
    console.error('Blog DELETE error:', error)
    return NextResponse.json(
      { error: 'Failed to delete blog post' },
      { status: 500 }
    )
  }
}