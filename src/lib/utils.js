export function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  
  export function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }
  
  export function slugify(text) {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '')
  }
  
  export function truncate(text, length = 150) {
    if (text.length <= length) return text
    return text.substring(0, length) + '...'
  }
  
  export function calculateAverageRating(reviews) {
    if (!reviews || reviews.length === 0) return 0
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0)
    return (sum / reviews.length).toFixed(1)
  }
  
  export function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }
  
  export function validatePhone(phone) {
    const re = /^[\d\s\-\+\(\)]+$/
    return re.test(phone)
  }