
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaPlus, FaEdit, FaTrash, FaToggleOn, FaToggleOff, FaUpload } from 'react-icons/fa'
import toast from 'react-hot-toast'
import DataTable from '@/components/admin/DataTable'
import Modal from '@/components/ui/Modal'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Button from '@/components/ui/Button'
import { useForm } from '@/hooks/useForm'

export default function AdminServicesPage() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingService, setEditingService] = useState(null)
  const [uploading, setUploading] = useState(false)

  const { values, errors, handleChange, handleSubmit, reset, setFieldValue } = useForm({
    name: '',
    description: '',
    price: '',
    duration: '',
    image: '',
    features: '',
    active: true,
  })

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services')
      if (response.ok) {
        const data = await response.json()
        setServices(data)
      }
    } catch (error) {
      console.error('Error fetching services:', error)
      toast.error('Failed to load services')
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
        setFieldValue('image', url)
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
    if (!formValues.image) {
      toast.error('Please provide a service image')
      return
    }

    try {
      const features = formValues.features.split('\n').filter(f => f.trim())
      const serviceData = {
        ...formValues,
        features,
      }

      const url = editingService 
        ? `/api/services/${editingService._id}`
        : '/api/services'
      
      const method = editingService ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(serviceData),
      })

      if (response.ok) {
        toast.success(editingService ? 'Service updated!' : 'Service created!')
        fetchServices()
        handleCloseModal()
      } else {
        const error = await response.json()
        toast.error(error.error || 'Failed to save service')
      }
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  const handleEdit = (service) => {
    setEditingService(service)
    setFieldValue('name', service.name)
    setFieldValue('description', service.description)
    setFieldValue('price', service.price)
    setFieldValue('duration', service.duration)
    setFieldValue('image', service.image)
    setFieldValue('features', service.features.join('\n'))
    setFieldValue('active', service.active)
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this service?')) return

    try {
      const response = await fetch(`/api/services/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast.success('Service deleted successfully')
        setServices(services.filter(s => s._id !== id))
      } else {
        toast.error('Failed to delete service')
      }
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  const handleToggleActive = async (service) => {
    try {
      const response = await fetch(`/api/services/${service._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...service, active: !service.active }),
      })

      if (response.ok) {
        toast.success('Service status updated')
        fetchServices()
      } else {
        toast.error('Failed to update service')
      }
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingService(null)
    reset()
  }

  const columns = [
    {
      key: 'name',
      label: 'Service Name',
      render: (value, row) => (
        <div className="flex items-center">
          <img 
            src={row.image} 
            alt={value}
            className="w-12 h-12 rounded-lg object-cover mr-3"
          />
          <div>
            <div className="font-medium">{value}</div>
            <div className="text-sm text-gray-500">{row.slug}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'price',
      label: 'Price',
    },
    {
      key: 'duration',
      label: 'Duration',
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
      <h1 className="text-3xl font-bold mb-8">Services</h1>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <>
          <DataTable
            columns={columns}
            data={services}
            searchable
            sortable
          />
          
          {/* Add Service Button at Bottom */}
          <div className="mt-8 text-center">
            <Button
              onClick={() => setShowModal(true)}
              variant="primary"
              size="large"
            >
              <FaPlus className="mr-2" />
              Add New Service
            </Button>
          </div>
        </>
      )}

      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingService ? 'Edit Service' : 'Add New Service'}
        size="large"
      >
        <form onSubmit={handleSubmit(handleSave)} className="space-y-6">
          <Input
            label="Service Name"
            name="name"
            value={values.name}
            onChange={handleChange}
            error={errors.name}
            required
          />

          <Textarea
            label="Description"
            name="description"
            value={values.description}
            onChange={handleChange}
            error={errors.description}
            rows={3}
            required
          />

          <div className="grid md:grid-cols-2 gap-6">
            <Input
              label="Price"
              name="price"
              value={values.price}
              onChange={handleChange}
              error={errors.price}
              placeholder="e.g., $25/walk"
              required
            />

            <Input
              label="Duration"
              name="duration"
              value={values.duration}
              onChange={handleChange}
              error={errors.duration}
              placeholder="e.g., 30-60 minutes"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Service Image *
            </label>
            <div className="flex items-center space-x-4">
              <label className="btn-primary cursor-pointer inline-flex items-center">
                <FaUpload className="mr-2" />
                {uploading ? 'Uploading...' : 'Upload from Device'}
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
                name="image"
                value={values.image}
                onChange={handleChange}
                className="flex-1"
                required
              />
            </div>
            {!values.image && (
              <p className="text-red-500 text-sm mt-1">Service image is required</p>
            )}
          </div>

          {values.image && (
            <div>
              <p className="text-sm text-gray-700 mb-2">Preview:</p>
              <img
                src={values.image}
                alt="Service preview"
                className="w-full max-w-md h-48 object-cover rounded-lg"
              />
            </div>
          )}

          <Textarea
            label="Features (one per line)"
            name="features"
            value={values.features}
            onChange={handleChange}
            error={errors.features}
            rows={5}
            placeholder="Professional dog walkers&#10;GPS tracking&#10;Daily report cards"
          />

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
              Service is active
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
              {editingService ? 'Update Service' : 'Create Service'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}