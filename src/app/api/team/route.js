// FILE: src/app/api/team/route.js

import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Team from '@/models/Team'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// GET /api/team - Get all team members
export async function GET(request) {
  try {
    await dbConnect()
    
    const { searchParams } = new URL(request.url)
    const activeOnly = searchParams.get('active') === 'true'
    
    const query = activeOnly ? { active: true } : {}
    const teamMembers = await Team.find(query).sort({ order: 1, createdAt: -1 })
    
    return NextResponse.json(teamMembers)
  } catch (error) {
    console.error('Error fetching team members:', error)
    return NextResponse.json(
      { error: 'Failed to fetch team members' },
      { status: 500 }
    )
  }
}

// POST /api/team - Create new team member
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
      name, 
      role, 
      bio, 
      image, 
      email, 
      phone, 
      experience, 
      specialties, 
      active = true, 
      order = 0 
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

    // Create team member
    const teamMember = new Team({
      name: name.trim(),
      role: role.trim(),
      bio: bio.trim(),
      image: image.trim(),
      email: email?.trim() || '',
      phone: phone?.trim() || '',
      experience: experience?.trim() || '',
      specialties: Array.isArray(specialties) ? specialties.filter(s => s.trim()) : [],
      active,
      order: parseInt(order) || 0,
    })

    await teamMember.save()

    return NextResponse.json(teamMember, { status: 201 })
  } catch (error) {
    console.error('Error creating team member:', error)
    return NextResponse.json(
      { error: 'Failed to create team member' },
      { status: 500 }
    )
  }
}