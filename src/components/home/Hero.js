

// // FILE: src/components/home/Hero.js

// 'use client'

// import { useState, useEffect } from 'react'
// import Link from 'next/link'
// import { motion } from 'framer-motion'
// import { FaArrowRight, FaPaw, FaHeart, FaStar } from 'react-icons/fa'

// export default function Hero() {
//   const [currentMedia, setCurrentMedia] = useState(0)
//   const [heroItems, setHeroItems] = useState([])
//   const [loading, setLoading] = useState(true)
  
//   // Default fallback if no items in database
//   const defaultVideos = [
//     'https://res.cloudinary.com/dtpnfedy5/video/upload/v1/pawsome-pals/dog-playing-1.mp4',
//     'https://res.cloudinary.com/dtpnfedy5/video/upload/v1/pawsome-pals/dog-playing-2.mp4',
//     'https://res.cloudinary.com/dtpnfedy5/video/upload/v1/pawsome-pals/dog-playing-3.mp4',
//     'https://res.cloudinary.com/dtpnfedy5/video/upload/v1/pawsome-pals/dog-playing-4.mp4',
//   ]

//   useEffect(() => {
//     fetchHeroItems()
//   }, [])

//   useEffect(() => {
//     if (heroItems.length > 0) {
//       const interval = setInterval(() => {
//         setCurrentMedia((prev) => (prev + 1) % heroItems.length)
//       }, 8000)
//       return () => clearInterval(interval)
//     }
//   }, [heroItems])

//   const fetchHeroItems = async () => {
//     try {
//       const response = await fetch('/api/hero')
//       if (response.ok) {
//         const data = await response.json()
//         if (data.length > 0) {
//           setHeroItems(data)
//         } else {
//           // Use default videos if no items in database
//           setHeroItems(defaultVideos.map((url, idx) => ({
//             mediaUrl: url,
//             mediaType: 'video',
//             _id: idx
//           })))
//         }
//       }
//     } catch (error) {
//       console.error('Error fetching hero items:', error)
//       // Use defaults on error
//       setHeroItems(defaultVideos.map((url, idx) => ({
//         mediaUrl: url,
//         mediaType: 'video',
//         _id: idx
//       })))
//     } finally {
//       setLoading(false)
//     }
//   }

//   if (loading) {
//     return (
//       <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50">
//         <div className="loading-spinner"></div>
//       </section>
//     )
//   }

//   return (
//     <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
//       {/* Media Background */}
//       <div className="absolute inset-0 z-0">
//         {heroItems.map((item, index) => (
//           <div
//             key={item._id}
//             className={`absolute inset-0 transition-opacity duration-1000 ${
//               currentMedia === index ? 'opacity-100' : 'opacity-0'
//             }`}
//           >
//             {item.mediaType === 'video' ? (
//               <video
//                 autoPlay
//                 muted
//                 loop
//                 playsInline
//                 className="absolute inset-0 w-full h-full object-cover"
//               >
//                 <source src={item.mediaUrl} type="video/mp4" />
//               </video>
//             ) : (
//               <img
//                 src={item.mediaUrl}
//                 alt="Hero background"
//                 className="absolute inset-0 w-full h-full object-cover"
//               />
//             )}
//           </div>
//         ))}
//         <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
//       </div>

//       {/* Floating Decorative Elements */}
//       <div className="absolute inset-0 z-5 pointer-events-none overflow-hidden">
//         {/* Floating paws */}
//         {[...Array(6)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute text-white/20"
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//             }}
//             animate={{
//               y: [0, -30, 0],
//               rotate: [0, 360],
//               scale: [1, 1.2, 1],
//             }}
//             transition={{
//               duration: 4 + Math.random() * 2,
//               repeat: Infinity,
//               delay: Math.random() * 2,
//             }}
//           >
//             <FaPaw size={20 + Math.random() * 20} />
//           </motion.div>
//         ))}
        
//         {/* Floating hearts */}
//         {[...Array(4)].map((_, i) => (
//           <motion.div
//             key={`heart-${i}`}
//             className="absolute text-pink-300/30"
//             style={{
//               left: `${20 + Math.random() * 60}%`,
//               top: `${20 + Math.random() * 60}%`,
//             }}
//             animate={{
//               y: [0, -40, 0],
//               scale: [1, 1.5, 1],
//               opacity: [0.3, 0.7, 0.3],
//             }}
//             transition={{
//               duration: 3 + Math.random() * 2,
//               repeat: Infinity,
//               delay: Math.random() * 3,
//             }}
//           >
//             <FaHeart size={15 + Math.random() * 15} />
//           </motion.div>
//         ))}
//       </div>

//       {/* Content */}
//       <div className="container relative z-10 text-center text-white">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="max-w-4xl mx-auto"
//         >
//           {/* Enhanced Logo */}
//           <div className="mb-8 flex justify-center">
//             <motion.div 
//               className="relative"
//               initial={{ scale: 0.8, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               transition={{ duration: 1, delay: 0.2 }}
//             >
//               <div className="relative">
//                 <svg viewBox="0 0 240 240" className="w-40 h-40 md:w-52 md:h-52 drop-shadow-2xl">
//                   {/* Gradient Definitions */}
//                   <defs>
//                     <radialGradient id="herodogGradient" cx="50%" cy="40%" r="60%">
//                       <stop offset="0%" stopColor="#ff8a80" />
//                       <stop offset="100%" stopColor="#f15043" />
//                     </radialGradient>
//                     <radialGradient id="heroPawGradient" cx="50%" cy="50%" r="50%">
//                       <stop offset="0%" stopColor="#ffd93d" />
//                       <stop offset="100%" stopColor="#ff6b6b" />
//                     </radialGradient>
//                     <linearGradient id="heroHeartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
//                       <stop offset="0%" stopColor="#ff9a9e" />
//                       <stop offset="100%" stopColor="#e91e63" />
//                     </linearGradient>
//                     <filter id="glow">
//                       <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
//                       <feMerge>
//                         <feMergeNode in="coloredBlur"/>
//                         <feMergeNode in="SourceGraphic"/>
//                       </feMerge>
//                     </filter>
//                   </defs>
                  
//                   {/* Glowing background */}
//                   <circle cx="120" cy="120" r="110" fill="#fff" fillOpacity="0.95" filter="url(#glow)" />
//                   <circle cx="120" cy="120" r="105" fill="#f8fafc" stroke="url(#heroHeartGradient)" strokeWidth="3" />
                  
//                   {/* Dog Head - larger and more detailed */}
//                   <ellipse cx="120" cy="110" rx="45" ry="48" fill="url(#herodogGradient)" />
                  
//                   {/* Dog Ears - more expressive */}
//                   <path d="M70 85 Q55 50 85 70 Q95 85 85 105" fill="url(#herodogGradient)" />
//                   <path d="M170 85 Q185 50 155 70 Q145 85 155 105" fill="url(#herodogGradient)" />
                  
//                   {/* Inner ear details */}
//                   <path d="M75 82 Q68 68 82 75 Q90 82 82 95" fill="#ffab91" />
//                   <path d="M165 82 Q172 68 158 75 Q150 82 158 95" fill="#ffab91" />
                  
//                   {/* Dog Snout - more prominent */}
//                   <ellipse cx="120" cy="130" rx="32" ry="24" fill="#ffcc80" />
                  
//                   {/* Nose - detailed */}
//                   <ellipse cx="120" cy="125" rx="9" ry="6" fill="#37474f" />
//                   <ellipse cx="120" cy="123" rx="5" ry="3" fill="#78909c" opacity="0.7" />
//                   <ellipse cx="122" cy="122" rx="2" ry="1" fill="#ffffff" opacity="0.9" />
                  
//                   {/* Eyes - more expressive with eyelashes */}
//                   <ellipse cx="95" cy="100" rx="7" ry="8" fill="#fff" />
//                   <ellipse cx="145" cy="100" rx="7" ry="8" fill="#fff" />
//                   <circle cx="95" cy="102" r="5" fill="#2c3e50" />
//                   <circle cx="145" cy="102" r="5" fill="#2c3e50" />
//                   <circle cx="97" cy="99" r="2" fill="#ffffff" />
//                   <circle cx="147" cy="99" r="2" fill="#ffffff" />
                  
//                   {/* Eyelashes */}
//                   <path d="M88 95 Q85 92 88 90" stroke="#2c3e50" strokeWidth="1" fill="none" />
//                   <path d="M102 95 Q105 92 102 90" stroke="#2c3e50" strokeWidth="1" fill="none" />
//                   <path d="M138 95 Q135 92 138 90" stroke="#2c3e50" strokeWidth="1" fill="none" />
//                   <path d="M152 95 Q155 92 152 90" stroke="#2c3e50" strokeWidth="1" fill="none" />
                  
//                   {/* Happy mouth - bigger smile */}
//                   <path d="M120 140 Q100 155 85 140" stroke="#37474f" strokeWidth="3" fill="none" strokeLinecap="round" />
//                   <path d="M120 140 Q140 155 155 140" stroke="#37474f" strokeWidth="3" fill="none" strokeLinecap="round" />
                  
//                   {/* Tongue - more playful */}
//                   <path d="M120 145 Q108 160 120 168 Q132 160 120 145" fill="#ff5722" />
//                   <ellipse cx="120" cy="155" rx="8" ry="3" fill="#ff7043" opacity="0.7" />
                  
//                   {/* Decorative paw prints - enhanced */}
//                   <g transform="translate(40, 40) scale(0.4)" opacity="0.8">
//                     <circle cx="0" cy="0" r="12" fill="url(#heroPawGradient)" />
//                     <circle cx="-15" cy="20" r="6" fill="url(#heroPawGradient)" />
//                     <circle cx="0" cy="20" r="6" fill="url(#heroPawGradient)" />
//                     <circle cx="15" cy="20" r="6" fill="url(#heroPawGradient)" />
//                   </g>
                  
//                   <g transform="translate(200, 50) scale(0.35) rotate(25)" opacity="0.7">
//                     <circle cx="0" cy="0" r="12" fill="url(#heroPawGradient)" />
//                     <circle cx="-15" cy="20" r="6" fill="url(#heroPawGradient)" />
//                     <circle cx="0" cy="20" r="6" fill="url(#heroPawGradient)" />
//                     <circle cx="15" cy="20" r="6" fill="url(#heroPawGradient)" />
//                   </g>
                  
//                   <g transform="translate(50, 190) scale(0.3) rotate(-15)" opacity="0.6">
//                     <circle cx="0" cy="0" r="12" fill="url(#heroPawGradient)" />
//                     <circle cx="-15" cy="20" r="6" fill="url(#heroPawGradient)" />
//                     <circle cx="0" cy="20" r="6" fill="url(#heroPawGradient)" />
//                     <circle cx="15" cy="20" r="6" fill="url(#heroPawGradient)" />
//                   </g>
                  
//                   {/* Floating hearts around dog */}
//                   <g opacity="0.9">
//                     <path d="M190 30 Q190 20 200 20 Q210 20 210 30 Q210 40 200 50 Q190 40 190 30" fill="url(#heroHeartGradient)" />
//                     <path d="M30 170 Q30 160 40 160 Q50 160 50 170 Q50 180 40 190 Q30 180 30 170" fill="url(#heroHeartGradient)" transform="scale(0.8)" />
//                     <path d="M180 180 Q180 175 185 175 Q190 175 190 180 Q190 185 185 190 Q180 185 180 180" fill="url(#heroHeartGradient)" transform="scale(0.6)" />
//                   </g>
                  
//                   {/* Stars for extra sparkle */}
//                   <g fill="#ffd93d" opacity="0.8">
//                     <path d="M60 30 L62 36 L68 36 L63 40 L65 46 L60 42 L55 46 L57 40 L52 36 L58 36 Z" />
//                     <path d="M180 160 L181 164 L185 164 L182 167 L183 171 L180 168 L177 171 L178 167 L175 164 L179 164 Z" transform="scale(0.7)" />
//                   </g>
//                 </svg>

//                 {/* Rotating paw around the logo */}
//                 <motion.div
//                   animate={{ 
//                     rotate: 360,
//                     y: [0, -10, 0]
//                   }}
//                   transition={{ 
//                     rotate: { duration: 15, repeat: Infinity, ease: "linear" },
//                     y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
//                   }}
//                   className="absolute -top-6 -right-6"
//                 >
//                   <FaPaw className="text-5xl text-yellow-300 drop-shadow-lg" />
//                 </motion.div>

//                 <motion.div
//                   animate={{ 
//                     scale: [1, 1.3, 1],
//                     opacity: [0.7, 1, 0.7],
//                     rotate: [0, -10, 10, 0]
//                   }}
//                   transition={{ 
//                     duration: 4,
//                     repeat: Infinity,
//                     ease: "easeInOut",
//                     delay: 2
//                   }}
//                   className="absolute -bottom-4 -left-4"
//                 >
//                   <FaHeart className="text-3xl text-pink-300 drop-shadow-lg" />
//                 </motion.div>

//                 <motion.div
//                   animate={{ 
//                     rotate: [0, 360],
//                     scale: [1, 1.1, 1]
//                   }}
//                   transition={{ 
//                     duration: 8,
//                     repeat: Infinity,
//                     ease: "linear"
//                   }}
//                   className="absolute -top-8 -left-8"
//                 >
//                   <FaStar className="text-2xl text-yellow-200 drop-shadow-lg" />
//                 </motion.div>
//               </div>

//               {/* Hover glow effect */}
//               <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 hover:opacity-100 transition-opacity duration-500 blur-2xl" />
//             </motion.div>
//           </div>

//           <motion.h1 
//             className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-white via-yellow-200 to-white"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.5 }}
//           >
//             Pawsome Pals
//           </motion.h1>
          
//           <motion.p 
//             className="text-2xl md:text-4xl mb-8 font-light text-yellow-100"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.7 }}
//           >
//             🐕 For All the Dogs 🐾
//           </motion.p>
          
//           <motion.p 
//             className="text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed text-gray-100"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.9 }}
//           >
//             Professional dog walking, training, and grooming services. 
//             We treat your furry friends with the love and care they deserve!
//           </motion.p>

//           <motion.div 
//             className="flex flex-col sm:flex-row gap-4 justify-center"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 1.1 }}
//           >
//             <motion.div
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <Link href="/contact" className="btn-primary text-lg px-8 py-4 inline-flex items-center shadow-2xl hover:shadow-3xl">
//                 Book Our Services
//                 <FaArrowRight className="ml-2" />
//               </Link>
//             </motion.div>
            
//             <motion.div
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <Link href="/services" className="bg-white/90 backdrop-blur-sm text-primary-500 hover:bg-white font-semibold text-lg px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl inline-flex items-center">
//                 Our Services
//                 <FaArrowRight className="ml-2" />
//               </Link>
//             </motion.div>
//           </motion.div>
//         </motion.div>

//         {/* Scroll Indicator */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 2 }}
//           className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
//         >
//           <motion.div
//             animate={{ y: [0, 10, 0] }}
//             transition={{ duration: 1.5, repeat: Infinity }}
//             className="w-6 h-10 border-2 border-white/70 rounded-full flex justify-center backdrop-blur-sm"
//           >
//             <motion.div 
//               className="w-1 h-3 bg-white rounded-full mt-2"
//               animate={{ opacity: [1, 0.3, 1] }}
//               transition={{ duration: 1.5, repeat: Infinity }}
//             />
//           </motion.div>
//         </motion.div>
//       </div>

//       {/* Media indicators */}
//       <div className="absolute bottom-6 right-6 z-20 flex space-x-2">
//         {heroItems.map((_, index) => (
//           <motion.button
//             key={index}
//             onClick={() => setCurrentMedia(index)}
//             className={`w-3 h-3 rounded-full transition-all duration-300 ${
//               currentMedia === index ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/70'
//             }`}
//             whileHover={{ scale: 1.2 }}
//             whileTap={{ scale: 0.9 }}
//           />
//         ))}
//       </div>

//       {/* Decorative gradient overlay */}
//       <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/50 to-transparent z-10" />
      
//       {/* Floating bubbles effect */}
//       <div className="absolute inset-0 z-5 pointer-events-none">
//         {[...Array(8)].map((_, i) => (
//           <motion.div
//             key={`bubble-${i}`}
//             className="absolute w-2 h-2 bg-white/20 rounded-full"
//             style={{
//               left: `${Math.random() * 100}%`,
//               bottom: '-10px',
//             }}
//             animate={{
//               y: [-10, -window.innerHeight - 100],
//               opacity: [0, 0.7, 0],
//               scale: [0.5, 1.5, 0.5],
//             }}
//             transition={{
//               duration: 3 + Math.random() * 4,
//               repeat: Infinity,
//               delay: Math.random() * 5,
//               ease: "easeOut",
//             }}
//           />
//         ))}
//       </div>
//     </section>
//   )
// }


// // FILE: src/components/home/Hero.js

// 'use client'

// import { useState, useEffect } from 'react'
// import Link from 'next/link'
// import { motion } from 'framer-motion'
// import { FaArrowRight, FaChevronDown } from 'react-icons/fa'

// export default function Hero() {
//   const [currentMedia, setCurrentMedia] = useState(0)
//   const [heroItems, setHeroItems] = useState([])
//   const [loading, setLoading] = useState(true)
  
//   // Default fallback if no items in database
//   const defaultVideos = [
//     'https://res.cloudinary.com/dtpnfedy5/video/upload/v1/pawsome-pals/dog-playing-1.mp4',
//     'https://res.cloudinary.com/dtpnfedy5/video/upload/v1/pawsome-pals/dog-playing-2.mp4',
//     'https://res.cloudinary.com/dtpnfedy5/video/upload/v1/pawsome-pals/dog-playing-3.mp4',
//     'https://res.cloudinary.com/dtpnfedy5/video/upload/v1/pawsome-pals/dog-playing-4.mp4',
//   ]

//   useEffect(() => {
//     fetchHeroItems()
//   }, [])

//   useEffect(() => {
//     if (heroItems.length > 0) {
//       const interval = setInterval(() => {
//         setCurrentMedia((prev) => (prev + 1) % heroItems.length)
//       }, 8000)
//       return () => clearInterval(interval)
//     }
//   }, [heroItems])

//   const fetchHeroItems = async () => {
//     try {
//       const response = await fetch('/api/hero')
//       if (response.ok) {
//         const data = await response.json()
//         if (data.length > 0) {
//           setHeroItems(data)
//         } else {
//           // Use default videos if no items in database
//           setHeroItems(defaultVideos.map((url, idx) => ({
//             mediaUrl: url,
//             mediaType: 'video',
//             _id: idx
//           })))
//         }
//       }
//     } catch (error) {
//       console.error('Error fetching hero items:', error)
//       // Use defaults on error
//       setHeroItems(defaultVideos.map((url, idx) => ({
//         mediaUrl: url,
//         mediaType: 'video',
//         _id: idx
//       })))
//     } finally {
//       setLoading(false)
//     }
//   }

//   if (loading) {
//     return (
//       <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100">
//         <div className="loading-spinner"></div>
//       </section>
//     )
//   }

//   return (
//     <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
//       {/* Media Background */}
//       <div className="absolute inset-0 z-0">
//         {heroItems.map((item, index) => (
//           <div
//             key={item._id}
//             className={`absolute inset-0 transition-opacity duration-1000 ${
//               currentMedia === index ? 'opacity-100' : 'opacity-0'
//             }`}
//           >
//             {item.mediaType === 'video' ? (
//               <video
//                 autoPlay
//                 muted
//                 loop
//                 playsInline
//                 className="absolute inset-0 w-full h-full object-cover"
//               >
//                 <source src={item.mediaUrl} type="video/mp4" />
//               </video>
//             ) : (
//               <img
//                 src={item.mediaUrl}
//                 alt="Hero background"
//                 className="absolute inset-0 w-full h-full object-cover"
//               />
//             )}
//           </div>
//         ))}
//         <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
//       </div>

//       {/* Content - Better Space Distribution */}
//       <div className="container relative z-10 text-white min-h-screen flex flex-col justify-between py-20">
        
//         {/* Top Section - Logo and Main Heading */}
//         <div className="flex-1 flex items-center justify-center">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className="max-w-6xl mx-auto text-center"
//           >


//             <motion.h1 
//               className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.5 }}
//             >
//               Pawsome Pals
//             </motion.h1>
            
//             <motion.p 
//               className="text-xl md:text-2xl mb-8 font-light text-red-200"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.7 }}
//             >
//               {/* Professional Dog Care Services */}
//             </motion.p>
//           </motion.div>
//         </div>

//         {/* Middle Section - Description and CTA */}
//         <div className="flex-1 flex items-center justify-center">
//           <motion.div
//             className="max-w-4xl mx-auto text-center"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.9 }}
//           >
//             <p className="text-lg md:text-xl mb-12 max-w-3xl mx-auto leading-relaxed text-gray-100">
//               Professional dog walking, training, and grooming services. 
//               We treat your furry friends with the love and care they deserve!
//             </p>

//             <motion.div 
//               className="flex flex-col sm:flex-row gap-6 justify-center"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 1.1 }}
//             >
//               <motion.div
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <Link href="/contact" className="bg-red-500 hover:bg-red-600 text-white font-semibold text-lg px-8 py-4 rounded-lg transition-all duration-300 shadow-2xl hover:shadow-3xl inline-flex items-center">
//                   Book Our Services
//                   <FaArrowRight className="ml-2" />
//                 </Link>
//               </motion.div>
              
//               <motion.div
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <Link href="/services" className="bg-white/90 backdrop-blur-sm text-red-600 hover:bg-white font-semibold text-lg px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-2xl inline-flex items-center">
//                   Our Services
//                   <FaArrowRight className="ml-2" />
//                 </Link>
//               </motion.div>
//             </motion.div>
//           </motion.div>
//         </div>

//         {/* Bottom Section - Scroll Indicator */}
//         <div className="flex justify-center">
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 2 }}
//             className="text-center"
//           >
//             <p className="text-white/80 text-sm mb-2">Scroll Down</p>
//             <div className="w-6 h-10 border-2 border-white/70 rounded-full flex justify-center backdrop-blur-sm mx-auto">
//               <div className="w-1 h-3 bg-white rounded-full mt-2" />
//             </div>
//             <FaChevronDown className="text-white/70 mt-2 mx-auto" />
//           </motion.div>
//         </div>
//       </div>

//       {/* Media indicators */}
//       <div className="absolute bottom-6 right-6 z-20 flex space-x-2">
//         {heroItems.map((_, index) => (
//           <motion.button
//             key={index}
//             onClick={() => setCurrentMedia(index)}
//             className={`w-3 h-3 rounded-full transition-all duration-300 ${
//               currentMedia === index ? 'bg-red-500 scale-125' : 'bg-white/50 hover:bg-white/70'
//             }`}
//             whileHover={{ scale: 1.2 }}
//             whileTap={{ scale: 0.9 }}
//           />
//         ))}
//       </div>

//       {/* Clean gradient overlay */}
//       <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/50 to-transparent z-10" />
//     </section>
//   )
// }




// FILE: src/components/home/Hero.js

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaArrowRight, FaChevronDown } from 'react-icons/fa'

export default function Hero() {
  const [currentMedia, setCurrentMedia] = useState(0)
  const [heroItems, setHeroItems] = useState([])
  const [loading, setLoading] = useState(true)
  
  const defaultVideos = [
    'https://res.cloudinary.com/dtpnfedy5/video/upload/v1/pawsome-pals/dog-playing-1.mp4',
    'https://res.cloudinary.com/dtpnfedy5/video/upload/v1/pawsome-pals/dog-playing-2.mp4',
    'https://res.cloudinary.com/dtpnfedy5/video/upload/v1/pawsome-pals/dog-playing-3.mp4',
    'https://res.cloudinary.com/dtpnfedy5/video/upload/v1/pawsome-pals/dog-playing-4.mp4',
  ]

  useEffect(() => {
    fetchHeroItems()
  }, [])

  useEffect(() => {
    if (heroItems.length > 0) {
      const interval = setInterval(() => {
        setCurrentMedia((prev) => (prev + 1) % heroItems.length)
      }, 8000)
      return () => clearInterval(interval)
    }
  }, [heroItems])

  const fetchHeroItems = async () => {
    try {
      const response = await fetch('/api/hero')
      if (response.ok) {
        const data = await response.json()
        if (data.length > 0) {
          setHeroItems(data)
        } else {
          setHeroItems(defaultVideos.map((url, idx) => ({
            mediaUrl: url,
            mediaType: 'video',
            _id: idx
          })))
        }
      }
    } catch (error) {
      console.error('Error fetching hero items:', error)
      setHeroItems(defaultVideos.map((url, idx) => ({
        mediaUrl: url,
        mediaType: 'video',
        _id: idx
      })))
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100">
        <div className="loading-spinner"></div>
      </section>
    )
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        {heroItems.map((item, index) => (
          <div
            key={item._id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentMedia === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {item.mediaType === 'video' ? (
              <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src={item.mediaUrl} type="video/mp4" />
              </video>
            ) : (
              <img
                src={item.mediaUrl}
                alt="Hero background"
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
      </div>

      {/* Hero Content */}
      <div className="container relative z-10 text-white min-h-screen flex flex-col justify-between py-20">
        
        {/* Title + Tagline */}
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <motion.h1 
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 drop-shadow-lg"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.03 }}
          >
            Pawsome Pals
          </motion.h1>

          <motion.p 
            className="text-lg md:text-2xl text-red-200 italic tracking-wide mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
          >
            {/* Where every paw gets the care it deserves 🐾 */}
          </motion.p>

          <motion.p
            className="text-md md:text-xl max-w-3xl mx-auto text-gray-100 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
          >
            Professional dog walking, training, and grooming services.  
            We treat your furry friends with love, fun, and the best care they deserve!
          </motion.p>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-center"
          >
            <p className="text-white/80 text-sm mb-2">Scroll Down</p>
            <div className="w-6 h-10 border-2 border-white/70 rounded-full flex justify-center backdrop-blur-sm mx-auto">
              <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce" />
            </div>
            <FaChevronDown className="text-white/70 mt-2 mx-auto animate-pulse" />
          </motion.div>
        </div>
      </div>

      {/* CTA Left */}
      <motion.div
        className="absolute bottom-12 left-10 z-20"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link href="/contact" className="bg-red-600 hover:bg-red-700 text-white font-bold text-lg px-6 py-3 rounded-xl shadow-lg inline-flex items-center">
          Book Our Services
          <FaArrowRight className="ml-2" />
        </Link>
      </motion.div>

      {/* CTA Right */}
      <motion.div
        className="absolute bottom-12 right-10 z-20"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link href="/services" className="bg-white/80 backdrop-blur-md text-red-700 hover:bg-white font-semibold text-lg px-6 py-3 rounded-full border border-red-500 inline-flex items-center shadow-md">
          Our Services
          <FaArrowRight className="ml-2" />
        </Link>
      </motion.div>

      {/* Media indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {heroItems.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentMedia(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentMedia === index ? 'bg-red-500 scale-125' : 'bg-white/50 hover:bg-white/70'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </section>
  )
}
