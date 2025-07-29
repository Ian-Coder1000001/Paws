// FILE: src/app/api/team/[id]/route.js

import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Team from '@/models/Team'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// GET /api/team/[id] - Get single team member
export async function GET(request, { params }) {
  try {
    await dbConnect()
    
    const teamMember = await Team.findById(params.id)
    
    if (!teamMember) {
      return NextResponse.json(
        { error: 'Team member not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(teamMember)
  } catch (error) {
    console.error('Error fetching team member:', error)
    return NextResponse.json(
      { error: 'Failed to fetch team member' },
      { status: 500 }
    )
  }
}

// PUT /api/team/[id] - Update team member
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
    const { 
      name, 
      role, 
      bio, 
      image, 
      email, 
      phone, 
      experience, 
      specialties, 
      active, 
      order 
    } = body

    // Validation
    if (!name?.trim()) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      )
    }

    if (!role?.trim()) {
      return NextResponse.json(
        { error: 'Role is required' },
        { status: 400 }
      )
    }

    if (!bio?.trim()) {
      return NextResponse.json(
        { error: 'Bio is required' },
        { status: 400 }
      )
    }

    if (!image?.trim()) {
      return NextResponse.json(
        { error: 'Profile image is required' },
        { status: 400 }
      )
    }

    // Update team member
    const teamMember = await Team.findByIdAndUpdate(
      params.id,
      {
        name: name.trim(),
        role: role.trim(),
        bio: bio.trim(),
        image: image.trim(),
        email: email?.trim() || '',
        phone: phone?.trim() || '',
        experience: experience?.trim() || '',
        specialties: Array.isArray(specialties) ? specialties.filter(s => s.trim()) : [],
        active: active !== undefined ? active : true,
        order: parseInt(order) || 0,
      },
      { new: true, runValidators: true }
    )

    if (!teamMember) {
      return NextResponse.json(
        { error: 'Team member not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(teamMember)
  } catch (error) {
    console.error('Error updating team member:', error)
    return NextResponse.json(
      { error: 'Failed to update team member' },
      { status: 500 }
    )
  }
}

// DELETE /api/team/[id] - Delete team member
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
    
    const teamMember = await Team.findByIdAndDelete(params.id)
    
    if (!teamMember) {
      return NextResponse.json(
        { error: 'Team member not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ message: 'Team member deleted successfully' })
  } catch (error) {
    console.error('Error deleting team member:', error)
    return NextResponse.json(
      { error: 'Failed to delete team member' },
      { status: 500 }
    )
  }
}