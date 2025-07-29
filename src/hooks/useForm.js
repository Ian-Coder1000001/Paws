import { useState, useCallback } from 'react'

export function useForm(initialValues = {}, validate = null) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target
    setValues(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }, [errors])

  const handleBlur = useCallback((e) => {
    const { name } = e.target
    setTouched(prev => ({
      ...prev,
      [name]: true
    }))
    
    // Validate single field
    if (validate) {
      const fieldError = validate({ [name]: values[name] })[name]
      if (fieldError) {
        setErrors(prev => ({
          ...prev,
          [name]: fieldError
        }))
      }
    }
  }, [validate, values])

  const handleSubmit = useCallback((onSubmit) => async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Validate all fields
    if (validate) {
      const validationErrors = validate(values)
      const hasErrors = Object.keys(validationErrors).length > 0
      
      if (hasErrors) {
        setErrors(validationErrors)
        setTouched(
          Object.keys(validationErrors).reduce((acc, key) => ({
            ...acc,
            [key]: true
          }), {})
        )
        setIsSubmitting(false)
        return
      }
    }
    
    try {
      await onSubmit(values)
      // Reset form on successful submission
      setValues(initialValues)
      setErrors({})
      setTouched({})
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }, [values, validate, initialValues])

  const reset = useCallback(() => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
    setIsSubmitting(false)
  }, [initialValues])

  const setFieldValue = useCallback((name, value) => {
    setValues(prev => ({
      ...prev,
      [name]: value
    }))
  }, [])

  const setFieldError = useCallback((name, error) => {
    setErrors(prev => ({
      ...prev,
      [name]: error
    }))
  }, [])

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    setFieldValue,
    setFieldError,
  }
}