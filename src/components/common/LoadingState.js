import Spinner from '@/components/ui/Spinner'

export default function LoadingState({ 
  fullScreen = false, 
  message = 'Loading...',
  size = 'large' 
}) {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 z-50 flex flex-col items-center justify-center">
        <Spinner size={size} />
        <p className="mt-4 text-gray-600 text-lg">{message}</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Spinner size={size} />
      <p className="mt-4 text-gray-600">{message}</p>
    </div>
  )
}