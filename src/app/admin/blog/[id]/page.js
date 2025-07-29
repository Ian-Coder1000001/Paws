


'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Button from '@/components/ui/Button'
import RichTextEditor from '@/components/admin/RichTextEditor'
import { useForm } from '@/hooks/useForm'
import { FaArrowLeft, FaSave, FaEye, FaUpload, FaImage } from 'react-icons/fa'
import Link from 'next/link'

export default function AdminBlogEditPage({ params }) {
  const { id } = use(params)
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [postSlug, setPostSlug] = useState('')
  const isNew = id === 'new'

  const { values, errors, handleChange, handleSubmit, setFieldValue } = useForm({
    title: '',
    excerpt: '',
    content: '',
    featuredImage: '',
    tags: '',
    published: false,
  })

  useEffect(() => {
    if (!isNew) {
      fetchPost()
    } else {
      setLoading(false)
    }
  }, [id])

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/blog/${id}`)
      if (response.ok) {
        const post = await response.json()
        setFieldValue('title', post.title)
        setFieldValue('excerpt', post.excerpt)
        setFieldValue('content', post.content)
        setFieldValue('featuredImage', post.featuredImage)
        setFieldValue('tags', post.tags.join(', '))
        setFieldValue('published', post.published)
        setPostSlug(post.slug)
      } else {
        toast.error('Post not found')
        router.push('/admin/blog')
      }
    } catch (error) {
      toast.error('Failed to load post')
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const { url } = await response.json()
        setFieldValue('featuredImage', url)
        toast.success('Image uploaded successfully')
      } else {
        toast.error('Failed to upload image')
      }
    } catch (error) {
      toast.error('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const handleSave = async (formValues) => {
    if (!formValues.featuredImage) {
      toast.error('Featured image is required')
      return
    }

    setSaving(true)
    
    try {
      const tags = formValues.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag)

      const postData = {
        ...formValues,
        tags,
      }

      const url = isNew 
        ? '/api/blog'
        : `/api/blog/${id}`
      
      const method = isNew ? 'POST' : 'PUT'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      })

      if (response.ok) {
        toast.success(isNew ? 'Post created!' : 'Post updated!')
        router.push('/admin/blog')
      } else {
        const error = await response.json()
        toast.error(error.error || 'Failed to save post')
      }
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="loading-spinner"></div>
      </div>
    )
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Link
              href="/admin/blog"
              className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FaArrowLeft />
            </Link>
            <h1 className="text-3xl font-bold">
              {isNew ? 'Create New Post' : 'Edit Post'}
            </h1>
          </div>
          
          {!isNew && values.published && postSlug && (
            <a
              href={`/blog/${postSlug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-primary-600 hover:text-primary-700"
            >
              <FaEye className="mr-2" />
              View Post
            </a>
          )}
        </div>

        <form onSubmit={handleSubmit(handleSave)} className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
            <Input
              label="Post Title"
              name="title"
              value={values.title}
              onChange={handleChange}
              error={errors.title}
              required
              placeholder="Enter a compelling title..."
            />

            <Textarea
              label="Excerpt"
              name="excerpt"
              value={values.excerpt}
              onChange={handleChange}
              error={errors.excerpt}
              rows={3}
              required
              placeholder="A brief summary of the post..."
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Featured Image *
              </label>
              <div className="flex items-center space-x-4">
                <label className="btn-primary cursor-pointer inline-flex items-center">
                  <FaUpload className="mr-2" />
                  {uploading ? 'Uploading...' : 'Upload Image'}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={uploading}
                  />
                </label>
                <span className="text-sm text-gray-500">or</span>
                <Input
                  placeholder="Enter image URL"
                  name="featuredImage"
                  value={values.featuredImage}
                  onChange={handleChange}
                  className="flex-1"
                />
              </div>
              {!values.featuredImage && (
                <p className="text-red-500 text-sm mt-1">Featured image is required</p>
              )}
            </div>

            {values.featuredImage && (
              <div>
                <p className="text-sm text-gray-700 mb-2">Preview:</p>
                <img
                  src={values.featuredImage}
                  alt="Featured"
                  className="w-full max-w-md h-48 object-cover rounded-lg"
                />
              </div>
            )}

            <Input
              label="Tags (comma-separated)"
              name="tags"
              value={values.tags}
              onChange={handleChange}
              error={errors.tags}
              placeholder="dog care, training tips, grooming"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content
              </label>
              <RichTextEditor
                content={values.content}
                onChange={(content) => setFieldValue('content', content)}
                placeholder="Write your blog post content here..."
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="published"
                name="published"
                checked={values.published}
                onChange={handleChange}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="published" className="ml-2 block text-sm text-gray-900">
                Publish this post
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="ghost"
              onClick={() => router.push('/admin/blog')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              loading={saving}
              disabled={saving}
            >
              <FaSave className="mr-2" />
              {isNew ? 'Create Post' : 'Update Post'}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}