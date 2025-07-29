// FILE: src/app/admin/team/page.js

'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaPlus, FaEdit, FaTrash, FaToggleOn, FaToggleOff, FaUpload, FaUser } from 'react-icons/fa'
import toast from 'react-hot-toast'
import DataTable from '@/components/admin/DataTable'
import Modal from '@/components/ui/Modal'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Button from '@/components/ui/Button'
import { useForm } from '@/hooks/useForm'

export default function AdminTeamPage() {
  const [teamMembers, setTeamMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingMember, setEditingMember] = useState(null)
  const [uploading, setUploading] = useState(false)

  const { values, errors, handleChange, handleSubmit, reset, setFieldValue } = useForm({
    name: '',
    role: '',
    bio: '',
    image: '',
    email: '',
    phone: '',
    experience: '',
    specialties: '',
    active: true,
    order: 0,
  })

  const defaultRoles = [
    'Founder & CEO',
    'Head Trainer',
    'Lead Groomer',
    'Operations Manager',
    'Senior Dog Walker',
    'Veterinary Assistant',
    'Customer Service Manager',
    'Training Specialist',
    'Grooming Assistant',
    'Operations Coordinator'
  ]

  useEffect(() => {
    fetchTeamMembers()
  }, [])

  const fetchTeamMembers = async () => {
    try {
      const response = await fetch('/api/team')
      if (response.ok) {
        const data = await response.json()
        setTeamMembers(data.sort((a, b) => (a.order || 0) - (b.order || 0)))
      }
    } catch (error) {
      console.error('Error fetching team members:', error)
      toast.error('Failed to load team members')
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file')
      return
    }

    // File size validation (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File too large. Max size: 5MB')
      return
    }

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('folder', 'team')
    formData.append('transformation', 'c_fill,w_400,h_400,g_face') // Square crop focused on face

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
        const error = await response.json()
        toast.error(error.error || 'Failed to upload image')
      }
    } catch (error) {
      toast.error('Upload failed')
      console.error('Upload error:', error)
    } finally {
      setUploading(false)
    }
  }

  const handleSave = async (formValues) => {
    if (!formValues.image) {
      toast.error('Please provide a team member photo')
      return
    }

    if (!formValues.name.trim()) {
      toast.error('Please provide a team member name')
      return
    }

    if (!formValues.role.trim()) {
      toast.error('Please provide a role for the team member')
      return
    }

    try {
      const specialtiesArray = formValues.specialties 
        ? formValues.specialties.split('\n').filter(s => s.trim()).map(s => s.trim())
        : []

      const teamData = {
        ...formValues,
        specialties: specialtiesArray,
        order: parseInt(formValues.order) || 0,
      }

      const url = editingMember 
        ? `/api/team/${editingMember._id}`
        : '/api/team'
      
      const method = editingMember ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(teamData),
      })

      if (response.ok) {
        toast.success(editingMember ? 'Team member updated!' : 'Team member added!')
        fetchTeamMembers()
        handleCloseModal()
      } else {
        const error = await response.json()
        toast.error(error.error || 'Failed to save team member')
      }
    } catch (error) {
      toast.error('Something went wrong')
      console.error('Save error:', error)
    }
  }

  const handleEdit = (member) => {
    setEditingMember(member)
    setFieldValue('name', member.name)
    setFieldValue('role', member.role)
    setFieldValue('bio', member.bio || '')
    setFieldValue('image', member.image)
    setFieldValue('email', member.email || '')
    setFieldValue('phone', member.phone || '')
    setFieldValue('experience', member.experience || '')
    setFieldValue('specialties', (member.specialties || []).join('\n'))
    setFieldValue('active', member.active !== false)
    setFieldValue('order', member.order || 0)
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this team member?')) return

    try {
      const response = await fetch(`/api/team/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast.success('Team member deleted successfully')
        setTeamMembers(teamMembers.filter(member => member._id !== id))
      } else {
        toast.error('Failed to delete team member')
      }
    } catch (error) {
      toast.error('Something went wrong')
      console.error('Delete error:', error)
    }
  }

  const handleToggleActive = async (member) => {
    try {
      const response = await fetch(`/api/team/${member._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...member, active: !member.active }),
      })

      if (response.ok) {
        toast.success('Team member status updated')
        fetchTeamMembers()
      } else {
        toast.error('Failed to update team member')
      }
    } catch (error) {
      toast.error('Something went wrong')
      console.error('Toggle error:', error)
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingMember(null)
    reset()
  }

  const columns = [
    {
      key: 'order',
      label: 'Order',
      render: (value) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
          {value || 0}
        </span>
      ),
    },
    {
      key: 'name',
      label: 'Team Member',
      render: (value, row) => (
        <div className="flex items-center">
          <div className="relative w-12 h-12 rounded-full overflow-hidden mr-3 bg-gray-200">
            {row.image ? (
              <img 
                src={row.image} 
                alt={value}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <FaUser className="text-gray-400" />
              </div>
            )}
          </div>
          <div>
            <div className="font-medium">{value}</div>
            <div className="text-sm text-gray-500">{row.role}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'bio',
      label: 'Bio',
      render: (value) => value ? (
        <div className="max-w-xs truncate" title={value}>
          {value}
        </div>
      ) : 'No bio provided',
    },
    {
      key: 'experience',
      label: 'Experience',
      render: (value) => value || 'Not specified',
    },
    {
      key: 'active',
      label: 'Status',
      render: (value) => (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
          value !== false ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {value !== false ? 'Active' : 'Inactive'}
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
              row.active !== false ? 'text-green-600 hover:text-green-900' : 'text-red-600 hover:text-red-900'
            }`}
            title={row.active !== false ? 'Deactivate' : 'Activate'}
          >
            {row.active !== false ? <FaToggleOn size={20} /> : <FaToggleOff size={20} />}
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
        <h1 className="text-3xl font-bold">Team Management</h1>
        <p className="text-gray-600 mt-2">Manage your team members and their profiles</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <>
          <DataTable
            columns={columns}
            data={teamMembers}
            searchable
            sortable
          />
          
          {/* Add Team Member Button at Bottom */}
          <div className="mt-8 text-center">
            <Button
              onClick={() => setShowModal(true)}
              variant="primary"
              size="large"
            >
              <FaPlus className="mr-2" />
              Add Team Member
            </Button>
          </div>
        </>
      )}

      {/* Add/Edit Modal */}
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingMember ? 'Edit Team Member' : 'Add Team Member'}
        size="large"
      >
        <form onSubmit={handleSubmit(handleSave)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Input
              label="Full Name"
              name="name"
              value={values.name}
              onChange={handleChange}
              error={errors.name}
              required
              placeholder="e.g., Sarah Johnson"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role *
              </label>
              <select
                name="role"
                value={values.role}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                required
              >
                <option value="">Select a role...</option>
                {defaultRoles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
              <Input
                placeholder="Or enter custom role"
                name="role"
                value={values.role}
                onChange={handleChange}
                className="mt-2"
              />
            </div>
          </div>

          <Textarea
            label="Bio"
            name="bio"
            value={values.bio}
            onChange={handleChange}
            error={errors.bio}
            rows={3}
            required
            placeholder="Brief description about the team member..."
          />

          <div className="grid md:grid-cols-2 gap-6">
            <Input
              label="Email (Optional)"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="sarah@pawsomepals.com"
            />

            <Input
              label="Phone (Optional)"
              name="phone"
              value={values.phone}
              onChange={handleChange}
              error={errors.phone}
              placeholder="+1 (555) 123-4567"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Input
              label="Experience"
              name="experience"
              value={values.experience}
              onChange={handleChange}
              error={errors.experience}
              placeholder="e.g., 15+ years in dog care"
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
              Profile Photo *
            </label>
            <div className="flex items-center space-x-4">
              <label className="btn-primary cursor-pointer inline-flex items-center">
                <FaUpload className="mr-2" />
                {uploading ? 'Uploading...' : 'Upload Photo'}
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
              <p className="text-red-500 text-sm mt-1">Profile photo is required</p>
            )}
            <p className="text-sm text-gray-500 mt-2">
              Recommended: Square photo (400x400px), professional headshot
            </p>
          </div>

          {values.image && (
            <div>
              <p className="text-sm text-gray-700 mb-2">Photo Preview:</p>
              <div className="relative w-32 h-32 rounded-full overflow-hidden mx-auto bg-gray-200">
                <img
                  src={values.image}
                  alt="Profile preview"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          <Textarea
            label="Specialties (one per line)"
            name="specialties"
            value={values.specialties}
            onChange={handleChange}
            error={errors.specialties}
            rows={4}
            placeholder="Dog training&#10;Behavioral science&#10;Puppy socialization"
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
              Team member is active and visible on website
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
              {editingMember ? 'Update Team Member' : 'Add Team Member'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}




