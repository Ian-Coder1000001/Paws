'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaPlus, FaEdit, FaTrash, FaUpload, FaImage, FaVideo } from 'react-icons/fa'
import toast from 'react-hot-toast'
import Modal from '@/components/ui/Modal'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'
import { useForm } from '@/hooks/useForm'

export default function AdminGalleryPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [uploading, setUploading] = useState(false)

  const { values, errors, handleChange, handleSubmit, reset, setFieldValue } = useForm({
    title: '',
    description: '',
    mediaUrl: '',
    mediaType: 'image',
    category: 'general',
    order: 0,
  })

  const categories = [
    { value: 'general', label: 'Happy Dogs' },
    { value: 'dog-walking', label: 'Dog Walking' },
    { value: 'dog-training', label: 'Dog Training' },
    { value: 'dog-grooming', label: 'Dog Grooming' },
  ]

  useEffect(() => {
    fetchGalleryItems()
  }, [])

  const fetchGalleryItems = async () => {
    try {
      const response = await fetch('/api/gallery')
      if (response.ok) {
        const data = await response.json()
        setItems(data)
      }
    } catch (error) {
      console.error('Error fetching gallery items:', error)
      toast.error('Failed to load gallery')
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Validate file type
    const isImage = file.type.startsWith('image/')
    const isVideo = file.type.startsWith('video/')
    
    if (!isImage && !isVideo) {
      toast.error('Please upload an image or video file')
      return
    }

    // File size validation
    const maxSize = isVideo ? 50 * 1024 * 1024 : 10 * 1024 * 1024
    if (file.size > maxSize) {
      toast.error(`File too large. Max size: ${isVideo ? '50MB' : '10MB'}`)
      return
    }

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('folder', 'gallery')

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const { url } = await response.json()
        setFieldValue('mediaUrl', url)
        setFieldValue('mediaType', isVideo ? 'video' : 'image')
        toast.success('File uploaded successfully')
      } else {
        const error = await response.json()
        toast.error(error.error || 'Failed to upload file')
      }
    } catch (error) {
      console.error('Upload error:', error)
      toast.error('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const handleSave = async (formValues) => {
    // Validation
    if (!formValues.title.trim()) {
      toast.error('Please enter a title')
      return
    }

    if (!formValues.mediaUrl.trim()) {
      toast.error('Please provide an image or video')
      return
    }

    try {
      const url = editingItem 
        ? `/api/gallery/${editingItem._id}`
        : '/api/gallery'
      
      const method = editingItem ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formValues.title.trim(),
          description: formValues.description.trim(),
          mediaUrl: formValues.mediaUrl.trim(),
          mediaType: formValues.mediaType,
          category: formValues.category,
          order: parseInt(formValues.order) || 0,
        }),
      })

      if (response.ok) {
        toast.success(editingItem ? 'Item updated!' : 'Item added!')
        fetchGalleryItems()
        handleCloseModal()
      } else {
        const error = await response.json()
        toast.error(error.error || 'Failed to save item')
      }
    } catch (error) {
      console.error('Save error:', error)
      toast.error('Something went wrong')
    }
  }

  const handleEdit = (item) => {
    setEditingItem(item)
    setFieldValue('title', item.title)
    setFieldValue('description', item.description || '')
    setFieldValue('mediaUrl', item.mediaUrl)
    setFieldValue('mediaType', item.mediaType)
    setFieldValue('category', item.category)
    setFieldValue('order', item.order || 0)
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this item?')) return

    try {
      const response = await fetch(`/api/gallery/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast.success('Item deleted successfully')
        setItems(items.filter(item => item._id !== id))
      } else {
        const error = await response.json()
        toast.error(error.error || 'Failed to delete item')
      }
    } catch (error) {
      console.error('Delete error:', error)
      toast.error('Something went wrong')
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingItem(null)
    reset()
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Gallery</h1>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <>
          {items.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {items.map((item) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-lg shadow-lg overflow-hidden group"
                >
                  <div className="relative aspect-square">
                    {item.mediaType === 'image' ? (
                      <img
                        src={item.mediaUrl}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="relative w-full h-full">
                        <video
                          src={item.mediaUrl}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <FaVideo className="text-white text-3xl" />
                        </div>
                      </div>
                    )}
                    
                    {/* Overlay Actions */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                      <button
                        onClick={() => handleEdit(item)}
                        className="p-3 bg-white rounded-full text-primary-600 hover:bg-gray-100 transition-colors"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="p-3 bg-white rounded-full text-red-600 hover:bg-gray-100 transition-colors"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold">{item.title}</h3>
                    {item.description && (
                      <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-2">
                      {categories.find(c => c.value === item.category)?.label}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FaImage className="text-6xl text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">No media in gallery yet.</p>
            </div>
          )}
          
          {/* Add Media Button at Bottom */}
          <div className="mt-12 text-center">
            <Button
              onClick={() => setShowModal(true)}
              variant="primary"
              size="large"
            >
              <FaPlus className="mr-2" />
              Add New Media
            </Button>
          </div>
        </>
      )}

      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingItem ? 'Edit Gallery Item' : 'Add Gallery Item'}
        size="large"
      >
        <form onSubmit={handleSubmit(handleSave)} className="space-y-6">
          <Input
            label="Title"
            name="title"
            value={values.title}
            onChange={handleChange}
            error={errors.title}
            required
            placeholder="e.g., Happy Golden Retriever"
          />

          <Textarea
            label="Description (optional)"
            name="description"
            value={values.description}
            onChange={handleChange}
            error={errors.description}
            rows={2}
            placeholder="Brief description of the photo/video..."
          />

          <div className="grid md:grid-cols-2 gap-6">
            <Select
              label="Category"
              name="category"
              value={values.category}
              onChange={handleChange}
              error={errors.category}
              options={categories}
              required
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
                {uploading ? 'Uploading...' : 'Upload File'}
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileUpload}
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
          </div>

          {values.mediaUrl && (
            <div className="mt-4">
              <p className="text-sm text-gray-700 mb-2">Preview:</p>
              {values.mediaType === 'image' ? (
                <img
                  src={values.mediaUrl}
                  alt="Preview"
                  className="w-full max-w-md h-48 object-cover rounded-lg"
                />
              ) : (
                <video
                  src={values.mediaUrl}
                  controls
                  className="w-full max-w-md h-48 rounded-lg"
                />
              )}
            </div>
          )}

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="ghost"
              onClick={handleCloseModal}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {editingItem ? 'Update Item' : 'Add Item'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}