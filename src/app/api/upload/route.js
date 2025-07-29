// FILE: src/app/api/upload/route.js

import { NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.isAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 401 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('file')
    const folder = formData.get('folder') || 'general'
    const transformation = formData.get('transformation')

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Determine file type
    const isVideo = file.type.startsWith('video/')
    const isImage = file.type.startsWith('image/')

    if (!isVideo && !isImage) {
      return NextResponse.json(
        { error: 'Only image and video files are allowed' },
        { status: 400 }
      )
    }

    // File size validation
    const maxSize = isVideo ? 50 * 1024 * 1024 : 10 * 1024 * 1024 // 50MB for videos, 10MB for images
    if (buffer.length > maxSize) {
      return NextResponse.json(
        { error: `File too large. Max size: ${isVideo ? '50MB' : '10MB'}` },
        { status: 400 }
      )
    }

    // Upload options
    const uploadOptions = {
      folder: `pawsome-pals/${folder}`,
      resource_type: isVideo ? 'video' : 'image',
      quality: 'auto',
      fetch_format: 'auto',
    }

    // Add transformations based on folder/use case
    if (isImage) {
      switch (folder) {
        case 'hero':
          uploadOptions.transformation = [
            { width: 1920, height: 1080, crop: 'fill', quality: 'auto:good' }
          ]
          break
        case 'about':
          uploadOptions.transformation = [
            { width: 800, height: 600, crop: 'fill', quality: 'auto:good' }
          ]
          break
        case 'team':
          uploadOptions.transformation = [
            { width: 400, height: 400, crop: 'fill', gravity: 'face', quality: 'auto:good' }
          ]
          break
        case 'services':
          uploadOptions.transformation = [
            { width: 600, height: 400, crop: 'fill', quality: 'auto:good' }
          ]
          break
        case 'gallery':
          uploadOptions.transformation = [
            { width: 800, height: 600, crop: 'fill', quality: 'auto:good' }
          ]
          break
        default:
          uploadOptions.transformation = [
            { width: 1200, height: 800, crop: 'limit', quality: 'auto:good' }
          ]
      }
    } else if (isVideo) {
      uploadOptions.transformation = [
        { width: 1920, height: 1080, crop: 'limit', quality: 'auto:good', video_codec: 'h264' }
      ]
    }

    // Custom transformation if provided
    if (transformation) {
      uploadOptions.transformation = transformation.split(',').map(t => {
        const [key, value] = t.split('_')
        return { [key]: value }
      })
    }

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        uploadOptions,
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error)
            reject(error)
          } else {
            resolve(result)
          }
        }
      ).end(buffer)
    })

    return NextResponse.json({
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
      resourceType: result.resource_type,
    })

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    )
  }
}

// DELETE endpoint for removing uploaded files
export async function DELETE(request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.isAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const publicId = searchParams.get('publicId')
    const resourceType = searchParams.get('resourceType') || 'image'

    if (!publicId) {
      return NextResponse.json(
        { error: 'Public ID is required' },
        { status: 400 }
      )
    }

    // Delete from Cloudinary
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType
    })

    if (result.result === 'ok') {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json(
        { error: 'Failed to delete file' },
        { status: 400 }
      )
    }

  } catch (error) {
    console.error('Delete error:', error)
    return NextResponse.json(
      { error: 'Failed to delete file' },
      { status: 500 }
    )
  }
}