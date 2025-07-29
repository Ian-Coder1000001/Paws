import { FaPlay } from 'react-icons/fa'

export default function GalleryItem({ item, onClick }) {
  return (
    <div
      onClick={onClick}
      className="relative group cursor-pointer overflow-hidden rounded-lg"
    >
      {item.mediaType === 'image' ? (
        <img
          src={item.mediaUrl}
          alt={item.title}
          className="w-full h-auto transition-transform duration-300 group-hover:scale-110"
        />
      ) : (
        <div className="relative">
          <video
            src={item.mediaUrl}
            className="w-full h-auto"
            muted
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
              <FaPlay className="text-2xl text-gray-800 ml-1" />
            </div>
          </div>
        </div>
      )}
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="font-semibold">{item.title}</h3>
          {item.description && (
            <p className="text-sm opacity-90">{item.description}</p>
          )}
        </div>
      </div>
    </div>
  )
}