// FILE: src/app/admin/about/page.js

'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaUpload, FaSave, FaImage, FaEdit } from 'react-icons/fa'
import toast from 'react-hot-toast'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { useForm } from '@/hooks/useForm'

export default function AdminAboutPage() {
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [imageUploading, setImageUploading] = useState(false)

  const { values, errors, handleChange, handleSubmit, setFieldValue } = useForm({
    title: 'About Pawsome Pals',
    subtitle: 'Your trusted partner in professional dog care since 2014',
    storyTitle: 'Our Story',
    storyParagraphs: [],
    missionTitle: 'Our Mission & Values',
    missionDescription: '',
    heroImage: '',
    funFacts: [
      { number: '500+', label: 'Happy Dogs' },
      { number: '10+', label: 'Years of Service' },
      { number: '50+', label: 'Five-Star Reviews' },
      { number: '24/7', label: 'Emergency Support' }
    ],
  })

  useEffect(() => {
    fetchAboutData()
  }, [])

  const fetchAboutData = async () => {
    try {
      const response = await fetch('/api/about')
      if (response.ok) {
        const data = await response.json()
        if (data) {
          setFieldValue('title', data.title || 'About Pawsome Pals')
          setFieldValue('subtitle', data.subtitle || 'Your trusted partner in professional dog care since 2014')
          setFieldValue('storyTitle', data.story?.title || 'Our Story')
          setFieldValue('storyParagraphs', data.story?.paragraphs || [])
          setFieldValue('missionTitle', data.mission?.title || 'Our Mission & Values')
          setFieldValue('missionDescription', data.mission?.description || '')
          setFieldValue('heroImage', data.heroImage || '')
          setFieldValue('funFacts', data.funFacts || [
            { number: '500+', label: 'Happy Dogs' },
            { number: '10+', label: 'Years of Service' },
            { number: '50+', label: 'Five-Star Reviews' },
            { number: '24/7', label: 'Emergency Support' }
          ])
        }
      }
    } catch (error) {
      console.error('Error fetching about data:', error)
      toast.error('Failed to load about data')
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

    // File size validation (10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File too large. Max size: 10MB')
      return
    }

    setImageUploading(true)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('folder', 'about')

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const { url } = await response.json()
        setFieldValue('heroImage', url)
        toast.success('Image uploaded successfully')
      } else {
        const error = await response.json()
        toast.error(error.error || 'Failed to upload image')
      }
    } catch (error) {
      toast.error('Upload failed')
      console.error('Upload error:', error)
    } finally {
      setImageUploading(false)
    }
  }

  const handleSave = async (formValues) => {
    if (!formValues.heroImage) {
      toast.error('Please provide a hero image for the About section')
      return
    }

    setLoading(true)
    try {
      const aboutData = {
        title: formValues.title,
        subtitle: formValues.subtitle,
        story: {
          title: formValues.storyTitle,
          paragraphs: formValues.storyParagraphs.filter(p => p.trim())
        },
        mission: {
          title: formValues.missionTitle,
          description: formValues.missionDescription
        },
        heroImage: formValues.heroImage,
        funFacts: formValues.funFacts.filter(f => f.number && f.label)
      }

      const response = await fetch('/api/about', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(aboutData),
      })

      if (response.ok) {
        toast.success('About page updated successfully!')
      } else {
        const error = await response.json()
        toast.error(error.error || 'Failed to save about data')
      }
    } catch (error) {
      toast.error('Something went wrong')
      console.error('Save error:', error)
    } finally {
      setLoading(false)
    }
  }

  const addStoryParagraph = () => {
    setFieldValue('storyParagraphs', [...values.storyParagraphs, ''])
  }

  const updateStoryParagraph = (index, value) => {
    const newParagraphs = [...values.storyParagraphs]
    newParagraphs[index] = value
    setFieldValue('storyParagraphs', newParagraphs)
  }

  const removeStoryParagraph = (index) => {
    const newParagraphs = values.storyParagraphs.filter((_, i) => i !== index)
    setFieldValue('storyParagraphs', newParagraphs)
  }

  const addFunFact = () => {
    setFieldValue('funFacts', [...values.funFacts, { number: '', label: '' }])
  }

  const updateFunFact = (index, field, value) => {
    const newFunFacts = [...values.funFacts]
    newFunFacts[index][field] = value
    setFieldValue('funFacts', newFunFacts)
  }

  const removeFunFact = (index) => {
    const newFunFacts = values.funFacts.filter((_, i) => i !== index)
    setFieldValue('funFacts', newFunFacts)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="loading-spinner"></div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">About Page Management</h1>
          <p className="text-gray-600 mt-2">Manage your About page content and images</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(handleSave)} className="space-y-8">
        {/* Hero Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FaEdit className="mr-2 text-primary-500" />
            Hero Section
          </h2>
          
          <div className="space-y-4">
            <Input
              label="Page Title"
              name="title"
              value={values.title}
              onChange={handleChange}
              error={errors.title}
              required
            />

            <Input
              label="Subtitle"
              name="subtitle"
              value={values.subtitle}
              onChange={handleChange}
              error={errors.subtitle}
              required
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hero Image *
              </label>
              <div className="flex items-center space-x-4">
                <label className="btn-primary cursor-pointer inline-flex items-center">
                  <FaUpload className="mr-2" />
                  {imageUploading ? 'Uploading...' : 'Upload Image'}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={imageUploading}
                  />
                </label>
                <span className="text-sm text-gray-500">or</span>
                <Input
                  placeholder="Enter image URL"
                  name="heroImage"
                  value={values.heroImage}
                  onChange={handleChange}
                  className="flex-1"
                  required
                />
              </div>
              {!values.heroImage && (
                <p className="text-red-500 text-sm mt-1">Hero image is required</p>
              )}
              <p className="text-sm text-gray-500 mt-2">
                Recommended: 800x600px or larger, optimized for web
              </p>
            </div>

            {values.heroImage && (
              <div>
                <p className="text-sm text-gray-700 mb-2">Current Hero Image:</p>
                <img
                  src={values.heroImage}
                  alt="Hero preview"
                  className="w-full max-w-md h-48 object-cover rounded-lg"
                />
              </div>
            )}
          </div>
        </Card>

        {/* Story Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FaEdit className="mr-2 text-primary-500" />
            Our Story Section
          </h2>

          <div className="space-y-4">
            <Input
              label="Story Section Title"
              name="storyTitle"
              value={values.storyTitle}
              onChange={handleChange}
              error={errors.storyTitle}
              required
            />

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Story Paragraphs *
                </label>
                <Button
                  type="button"
                  variant="ghost"
                  size="small"
                  onClick={addStoryParagraph}
                >
                  Add Paragraph
                </Button>
              </div>
              
              {values.storyParagraphs.map((paragraph, index) => (
                <div key={index} className="flex items-start space-x-2 mb-3">
                  <Textarea
                    placeholder={`Paragraph ${index + 1}...`}
                    value={paragraph}
                    onChange={(e) => updateStoryParagraph(index, e.target.value)}
                    rows={3}
                    className="flex-1"
                  />
                  {values.storyParagraphs.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="small"
                      onClick={() => removeStoryParagraph(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              
              {values.storyParagraphs.length === 0 && (
                <p className="text-gray-500 text-sm">No paragraphs added yet. Click "Add Paragraph" to start.</p>
              )}
            </div>
          </div>
        </Card>

        {/* Mission Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FaEdit className="mr-2 text-primary-500" />
            Mission & Values Section
          </h2>

          <div className="space-y-4">
            <Input
              label="Mission Section Title"
              name="missionTitle"
              value={values.missionTitle}
              onChange={handleChange}
              error={errors.missionTitle}
              required
            />

            <Textarea
              label="Mission Description"
              name="missionDescription"
              value={values.missionDescription}
              onChange={handleChange}
              error={errors.missionDescription}
              rows={4}
              required
            />
          </div>
        </Card>

        {/* Fun Facts Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FaEdit className="mr-2 text-primary-500" />
            Fun Facts Section
          </h2>

          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Fun Facts
              </label>
              <Button
                type="button"
                variant="ghost"
                size="small"
                onClick={addFunFact}
              >
                Add Fun Fact
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {values.funFacts.map((fact, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center space-x-2 p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1 space-y-2">
                    <Input
                      placeholder="Number (e.g., 500+)"
                      value={fact.number}
                      onChange={(e) => updateFunFact(index, 'number', e.target.value)}
                      size="small"
                    />
                    <Input
                      placeholder="Label (e.g., Happy Dogs)"
                      value={fact.label}
                      onChange={(e) => updateFunFact(index, 'label', e.target.value)}
                      size="small"
                    />
                  </div>
                  {values.funFacts.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="small"
                      onClick={() => removeFunFact(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </Button>
                  )}
                </motion.div>
              ))}
            </div>

            {values.funFacts.length === 0 && (
              <p className="text-gray-500 text-sm">No fun facts added yet. Click "Add Fun Fact" to start.</p>
            )}
          </div>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            variant="primary"
            size="large"
            disabled={loading}
          >
            <FaSave className="mr-2" />
            {loading ? 'Saving...' : 'Save About Page'}
          </Button>
        </div>
      </form>

      {/* Preview Section */}
      {values.heroImage && (
        <Card className="p-6 mt-8">
          <h2 className="text-xl font-semibold mb-4">Preview</h2>
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-2">{values.title}</h1>
              <p className="text-lg text-gray-600 mb-4">{values.subtitle}</p>
              <img
                src={values.heroImage}
                alt="Hero preview"
                className="w-full max-w-2xl mx-auto rounded-lg shadow-lg"
              />
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">{values.storyTitle}</h2>
              {values.storyParagraphs.map((paragraph, index) => (
                <p key={index} className="text-gray-700 mb-4">
                  {paragraph}
                </p>
              ))}
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">{values.missionTitle}</h2>
              <p className="text-gray-700">{values.missionDescription}</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Fun Facts</h2>
              <div className="grid md:grid-cols-4 gap-4">
                {values.funFacts.map((fact, index) => (
                  <div key={index} className="text-center p-4 bg-primary-50 rounded-lg">
                    <div className="text-3xl font-bold text-primary-500 mb-2">
                      {fact.number}
                    </div>
                    <p className="text-gray-700 font-medium">{fact.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}



