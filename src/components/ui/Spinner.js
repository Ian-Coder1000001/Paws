export default function Spinner({ 
    size = 'medium', 
    color = 'primary',
    className = '' 
  }) {
    const sizes = {
      small: 'w-6 h-6',
      medium: 'w-10 h-10',
      large: 'w-16 h-16',
    }
  
    const colors = {
      primary: 'border-primary-500',
      secondary: 'border-secondary-500',
      white: 'border-white',
      gray: 'border-gray-500',
    }
  
    return (
      <div className={`flex justify-center items-center ${className}`}>
        <div
          className={`
            ${sizes[size]}
            border-4 
            border-gray-200
            ${colors[color]}
            border-t-transparent
            rounded-full
            animate-spin
          `}
        />
      </div>
    )
  }