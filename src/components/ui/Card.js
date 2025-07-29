import { classNames } from '@/lib/utils'

export default function Card({ 
  children, 
  className = '', 
  hover = true,
  padding = true,
  onClick,
  ...props 
}) {
  return (
    <div
      className={classNames(
        'bg-white rounded-xl shadow-lg overflow-hidden',
        hover && 'transition-all duration-300 hover:shadow-xl',
        onClick && 'cursor-pointer',
        padding && 'p-6',
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  )
}