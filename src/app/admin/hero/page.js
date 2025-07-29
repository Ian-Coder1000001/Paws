// FILE: src/app/admin/hero/page.js

'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaPlus, FaEdit, FaTrash, FaToggleOn, FaToggleOff, FaUpload, FaPlay, FaImage, FaVideo } from 'react-icons/fa'
import toast from 'react-hot-toast'
import DataTable from '@/components/admin/DataTable'
import Modal from '@/components/ui/Modal'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Button from '@/components/ui/Button'
import Select from '@/components/ui/Select'
import { useForm } from '@/hooks/useForm'

export default function AdminHeroPage() {
  const [heroItems, setHeroItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [previewMedia, setPreviewMedia] = useState(null)

  const { values, errors, handleChange, handleSubmit, reset, setFieldValue } = useForm({
    title: '',
    description: '',
    mediaUrl: '',
    mediaType: 'image',
    active: true,
    order: 0,
  })

  useEffect(() => {
    fetchHeroItems()
  }, [])

  const fetchHeroItems = async () => {
    try {
      const response = await fetch('/api/hero')
      if (response.ok) {
        const data = await response.json()
        setHeroItems(data.sort((a, b) => a.order - b.order))
      }
    } catch (error) {
      console.error('Error fetching hero items:', error)
      toast.error('Failed to load hero items')
    } finally {
      setLoading(false)
    }
  }

  const handleMediaUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Validate file type
    const isImage = file.type.startsWith('image/')
    const isVideo = file.type.startsWith('video/')
    
    if (!isImage && !isVideo) {
      toast.error('Please upload an image or video file')
      return
    }

    // File size validation (50MB for videos, 10MB for images)
    const maxSize = isVideo ? 50 * 1024 * 1024 : 10 * 1024 * 1024
    if (file.size > maxSize) {
      toast.error(`File too large. Max size: ${isVideo ? '50MB' : '10MB'}`)
      return
    }

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('folder', 'hero')

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const { url } = await response.json()
        setFieldValue('mediaUrl', url)
        setFieldValue('mediaType', isVideo ? 'video' : 'image')
        setPreviewMedia({ url, type: isVideo ? 'video' : 'image' })
        toast.success('Media uploaded successfully')
      } else {
        const error = await response.json()
        toast.error(error.error || 'Failed to upload media')
      }
    } catch (error) {
      toast.error('Upload failed')
      console.error('Upload error:', error)
    } finally {
      setUploading(false)
    }
  }

  const handleSave = async (formValues) => {
    if (!formValues.mediaUrl) {
      toast.error('Please provide media (image or video)')
      return
    }

    try {
      const heroData = {
        ...formValues,
        order: parseInt(formValues.order) || 0,
      }

      const url = editingItem 
        ? `/api/hero/${editingItem._id}`
        : '/api/hero'
      
      const method = editingItem ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(heroData),
      })

      if (response.ok) {
        toast.success(editingItem ? 'Hero item updated!' : 'Hero item created!')
        fetchHeroItems()
        handleCloseModal()
      } else {
        const error = await response.json()
        toast.error(error.error || 'Failed to save hero item')
      }
    } catch (error) {
      toast.error('Something went wrong')
      console.error('Save error:', error)
    }
  }

  const handleEdit = (item) => {
    setEditingItem(item)
    setFieldValue('title', item.title || '')
    setFieldValue('description', item.description || '')
    setFieldValue('mediaUrl', item.mediaUrl)
    setFieldValue('mediaType', item.mediaType)
    setFieldValue('active', item.active)
    setFieldValue('order', item.order || 0)
    setPreviewMedia({ url: item.mediaUrl, type: item.mediaType })
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this hero item?')) return

    try {
      const response = await fetch(`/api/hero/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast.success('Hero item deleted successfully')
        setHeroItems(heroItems.filter(item => item._id !== id))
      } else {
        toast.error('Failed to delete hero item')
      }
    } catch (error) {
      toast.error('Something went wrong')
      console.error('Delete error:', error)
    }
  }

  const handleToggleActive = async (item) => {
    try {
      const response = await fetch(`/api/hero/${item._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...item, active: !item.active }),
      })

      if (response.ok) {
        toast.success('Hero item status updated')
        fetchHeroItems()
      } else {
        toast.error('Failed to update hero item')
      }
    } catch (error) {
      toast.error('Something went wrong')
      console.error('Toggle error:', error)
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingItem(null)
    setPreviewMedia(null)
    reset()
  }

  const handlePreview = (item) => {
    setPreviewMedia({ url: item.mediaUrl, type: item.mediaType })
  }

  const columns = [
    {
      key: 'order',
      label: 'Order',
      render: (value) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
          {value}
        </span>
      ),
    },
    {
      key: 'mediaUrl',
      label: 'Preview',
      render: (value, row) => (
        <div className="flex items-center">
          <div className="relative w-16 h-16 rounded-lg overflow-hidden mr-3">
            {row.mediaType === 'video' ? (
              <video 
                src={value} 
                className="w-full h-full object-cover"
                muted
              />
            ) : (
              <img 
                src={value} 
                alt="Hero media"
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              {row.mediaType === 'video' ? (
                <FaVideo className="text-white text-lg" />
              ) : (
                <FaImage className="text-white text-lg" />
              )}
            </div>
          </div>
          <div>
            <div className="font-medium">{row.title || 'Hero Media'}</div>
            <div className="text-sm text-gray-500 capitalize">{row.mediaType}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'title',
      label: 'Title',
      render: (value) => value || 'No title',
    },
    {
      key: 'description',
      label: 'Description',
      render: (value) => value ? (
        <div className="max-w-xs truncate" title={value}>
          {value}
        </div>
      ) : 'No description',
    },
    {
      key: 'active',
      label: 'Status',
      render: (value) => (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
          value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {value ? 'Active' : 'Inactive'}
        </span>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      sortable: false,
      render: (_, row) => (
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handlePreview(row)}
            className="text-blue-600 hover:text-blue-900"
            title="Preview"
          >
            <FaPlay />
          </button>
          <button
            onClick={() => handleToggleActive(row)}
            className={`${
              row.active ? 'text-green-600 hover:text-green-900' : 'text-red-600 hover:text-red-900'
            }`}
            title={row.active ? 'Deactivate' : 'Activate'}
          >
            {row.active ? <FaToggleOn size={20} /> : <FaToggleOff size={20} />}
          </button>
          <button
            onClick={() => handleEdit(row)}
            className="text-primary-600 hover:text-primary-900"
            title="Edit"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => handleDelete(row._id)}
            className="text-red-600 hover:text-red-900"
            title="Delete"
          >
            <FaTrash />
          </button>
        </div>
      ),
    },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Hero Management</h1>
        <p className="text-gray-600 mt-2">Manage homepage hero images and videos</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <>
          <DataTable
            columns={columns}
            data={heroItems}
            searchable
            sortable
          />
          
          {/* Add Hero Media Button at Bottom */}
          <div className="mt-8 text-center">
            <Button
              onClick={() => setShowModal(true)}
              variant="primary"
              size="large"
            >
              <FaPlus className="mr-2" />
              Add Hero Media
            </Button>
          </div>
        </>
      )}

      {/* Add/Edit Modal */}
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingItem ? 'Edit Hero Media' : 'Add Hero Media'}
        size="large"
      >
        <form onSubmit={handleSubmit(handleSave)} className="space-y-6">
          <Input
            label="Title (Optional)"
            name="title"
            value={values.title}
            onChange={handleChange}
            error={errors.title}
            placeholder="e.g., Happy Dogs Playing"
          />

          <Textarea
            label="Description (Optional)"
            name="description"
            value={values.description}
            onChange={handleChange}
            error={errors.description}
            rows={2}
            placeholder="Brief description of the media..."
          />

          <div className="grid md:grid-cols-2 gap-6">
            <Select
              label="Media Type"
              name="mediaType"
              value={values.mediaType}
              onChange={handleChange}
              options={[
                { value: 'image', label: 'Image' },
                { value: 'video', label: 'Video' }
              ]}
            />

            <Input
              label="Display Order"
              name="order"
              type="number"
              value={values.order}
              onChange={handleChange}
              error={errors.order}
              placeholder="0"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Media File *
            </label>
            <div className="flex items-center space-x-4">
              <label className="btn-primary cursor-pointer inline-flex items-center">
                <FaUpload className="mr-2" />
                {uploading ? 'Uploading...' : 'Upload from Device'}
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleMediaUpload}
                  className="hidden"
                  disabled={uploading}
                />
              </label>
              <span className="text-sm text-gray-500">or</span>
              <Input
                placeholder="Enter media URL"
                name="mediaUrl"
                value={values.mediaUrl}
                onChange={handleChange}
                className="flex-1"
                required
              />
            </div>
            {!values.mediaUrl && (
              <p className="text-red-500 text-sm mt-1">Media file is required</p>
            )}
            <p className="text-sm text-gray-500 mt-2">
              Recommended: Images (1920x1080px), Videos (1920x1080px, max 50MB)
            </p>
          </div>

          {previewMedia && (
            <div>
              <p className="text-sm text-gray-700 mb-2">Preview:</p>
              <div className="relative w-full max-w-2xl h-64 rounded-lg overflow-hidden">
                {previewMedia.type === 'video' ? (
                  <video
                    src={previewMedia.url}
                    className="w-full h-full object-cover"
                    controls
                    muted
                  />
                ) : (
                  <img
                    src={previewMedia.url}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </div>
          )}

          <div className="flex items-center">
            <input
              type="checkbox"
              id="active"
              name="active"
              checked={values.active}
              onChange={handleChange}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="active" className="ml-2 block text-sm text-gray-900">
              Media is active
            </label>
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="ghost"
              onClick={handleCloseModal}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {editingItem ? 'Update Media' : 'Add Media'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Preview Modal */}
      <Modal
        isOpen={!!previewMedia && !showModal}
        onClose={() => setPreviewMedia(null)}
        title="Media Preview"
        size="large"
      >
        {previewMedia && (
          <div className="relative w-full h-96 rounded-lg overflow-hidden">
            {previewMedia.type === 'video' ? (
              <video
                src={previewMedia.url}
                className="w-full h-full object-cover"
                controls
                autoPlay
                muted
              />
            ) : (
              <img
                src={previewMedia.url}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            )}
          </div>
        )}
      </Modal>
    </div>
  )
}


