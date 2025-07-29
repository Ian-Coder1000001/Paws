import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimesCircle } from 'react-icons/fa'

export default function Alert({ type = 'info', title, children, onClose }) {
  const styles = {
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      icon: FaInfoCircle,
      iconColor: 'text-blue-400',
    },
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-800',
      icon: FaCheckCircle,
      iconColor: 'text-green-400',
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-800',
      icon: FaExclamationCircle,
      iconColor: 'text-yellow-400',
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      icon: FaTimesCircle,
      iconColor: 'text-red-400',
    },
  }

  const style = styles[type]
  const Icon = style.icon

  return (
    <div className={`${style.bg} ${style.border} ${style.text} border rounded-lg p-4`}>
      <div className="flex">
        <div className="flex-shrink-0">
          <Icon className={`h-5 w-5 ${style.iconColor}`} />
        </div>
        <div className="ml-3 flex-1">
          {title && (
            <h3 className="text-sm font-medium">{title}</h3>
          )}
          {children && (
            <div className={`text-sm ${title ? 'mt-2' : ''}`}>
              {children}
            </div>
          )}
        </div>
        {onClose && (
          <div className="ml-auto pl-3">
            <button
              onClick={onClose}
              className={`inline-flex rounded-md p-1.5 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-offset-2 ${style.text}`}
            >
              <span className="sr-only">Dismiss</span>
              <FaTimesCircle className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}