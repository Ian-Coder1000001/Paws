// // FILE: src/components/layout/Header.js

// 'use client'

// import { useState, useEffect } from 'react'
// import Link from 'next/link'
// import Image from 'next/image'
// import { usePathname } from 'next/navigation'
// import { motion, AnimatePresence } from 'framer-motion'
// import { FaBars, FaTimes, FaPhone, FaPaw, FaHeart } from 'react-icons/fa'

// export default function Header() {
//   const [isScrolled, setIsScrolled] = useState(false)
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
//   const pathname = usePathname()

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50)
//     }
//     window.addEventListener('scroll', handleScroll)
//     return () => window.removeEventListener('scroll', handleScroll)
//   }, [])

//   const navigation = [
//     { name: 'Home', href: '/' },
//     { name: 'Services', href: '/services' },
//     { name: 'About', href: '/about' },
//     { name: 'Blog', href: '/blog' },
//     { name: 'Gallery', href: '/gallery' },
//     { name: 'Reviews', href: '/reviews' },
//     { name: 'Contact', href: '/contact' },
//   ]

//   return (
//     <header className={`fixed w-full z-50 transition-all duration-300 ${
//       isScrolled ? 'bg-white shadow-lg py-2' : 'bg-white/90 backdrop-blur-md py-3'
//     }`}>
//       <div className="container">
//         <nav className="flex items-center justify-between">
//           {/* Enhanced Logo */}
//           <Link href="/" className="flex items-center space-x-3 group">
//             <div className="relative">
//               {/* Main Logo Container */}
//               <div className={`relative transition-all duration-300 ${
//                 isScrolled ? 'w-12 h-12' : 'w-14 h-14'
//               }`}>
//                 <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-lg">
//                   {/* Gradient Definitions */}
//                   <defs>
//                     <radialGradient id="dogGradient" cx="50%" cy="40%" r="60%">
//                       <stop offset="0%" stopColor="#ff6b6b" />
//                       <stop offset="100%" stopColor="#f15043" />
//                     </radialGradient>
//                     <radialGradient id="pawGradient" cx="50%" cy="50%" r="50%">
//                       <stop offset="0%" stopColor="#ffd93d" />
//                       <stop offset="100%" stopColor="#ff6b6b" />
//                     </radialGradient>
//                     <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
//                       <stop offset="0%" stopColor="#ff9a9e" />
//                       <stop offset="100%" stopColor="#e91e63" />
//                     </linearGradient>
//                   </defs>
                  
//                   {/* Background Circle with subtle shadow */}
//                   <circle cx="60" cy="60" r="55" fill="#fff" stroke="#f1f5f9" strokeWidth="2" />
                  
//                   {/* Dog Head */}
//                   <ellipse cx="60" cy="55" rx="28" ry="30" fill="url(#dogGradient)" />
                  
//                   {/* Dog Ears - more realistic shape */}
//                   <path d="M35 45 Q30 25 45 35 Q50 45 45 55" fill="url(#dogGradient)" />
//                   <path d="M85 45 Q90 25 75 35 Q70 45 75 55" fill="url(#dogGradient)" />
                  
//                   {/* Inner ear details */}
//                   <path d="M38 42 Q35 35 42 38 Q45 42 42 48" fill="#ff8a80" />
//                   <path d="M82 42 Q85 35 78 38 Q75 42 78 48" fill="#ff8a80" />
                  
//                   {/* Dog Snout */}
//                   <ellipse cx="60" cy="65" rx="20" ry="15" fill="#ffab91" />
                  
//                   {/* Nose */}
//                   <ellipse cx="60" cy="62" rx="6" ry="4" fill="#37474f" />
//                   <ellipse cx="60" cy="61" rx="3" ry="2" fill="#90a4ae" opacity="0.6" />
                  
//                   {/* Eyes with sparkle */}
//                   <circle cx="48" cy="50" r="4" fill="#2c3e50" />
//                   <circle cx="72" cy="50" r="4" fill="#2c3e50" />
//                   <circle cx="49" cy="48" r="1.5" fill="#ffffff" />
//                   <circle cx="73" cy="48" r="1.5" fill="#ffffff" />
                  
//                   {/* Happy mouth */}
//                   <path d="M60 68 Q50 75 45 68" stroke="#37474f" strokeWidth="2" fill="none" strokeLinecap="round" />
//                   <path d="M60 68 Q70 75 75 68" stroke="#37474f" strokeWidth="2" fill="none" strokeLinecap="round" />
                  
//                   {/* Tongue */}
//                   <path d="M60 70 Q55 78 60 82 Q65 78 60 70" fill="#ff5722" />
                  
//                   {/* Decorative paw prints around */}
//                   <g transform="translate(20, 20) scale(0.3)">
//                     <circle cx="0" cy="0" r="8" fill="url(#pawGradient)" opacity="0.7" />
//                     <circle cx="-10" cy="15" r="4" fill="url(#pawGradient)" opacity="0.7" />
//                     <circle cx="0" cy="15" r="4" fill="url(#pawGradient)" opacity="0.7" />
//                     <circle cx="10" cy="15" r="4" fill="url(#pawGradient)" opacity="0.7" />
//                   </g>
                  
//                   <g transform="translate(100, 25) scale(0.25) rotate(15)">
//                     <circle cx="0" cy="0" r="8" fill="url(#pawGradient)" opacity="0.6" />
//                     <circle cx="-10" cy="15" r="4" fill="url(#pawGradient)" opacity="0.6" />
//                     <circle cx="0" cy="15" r="4" fill="url(#pawGradient)" opacity="0.6" />
//                     <circle cx="10" cy="15" r="4" fill="url(#pawGradient)" opacity="0.6" />
//                   </g>
                  
//                   {/* Floating hearts */}
//                   <g opacity="0.8">
//                     <path d="M95 15 Q95 10 100 10 Q105 10 105 15 Q105 20 100 25 Q95 20 95 15" fill="url(#heartGradient)" />
//                     <path d="M15 85 Q15 80 20 80 Q25 80 25 85 Q25 90 20 95 Q15 90 15 85" fill="url(#heartGradient)" transform="scale(0.7)" />
//                   </g>
//                 </svg>

//                 {/* Animated floating elements */}
//                 <motion.div
//                   animate={{ 
//                     y: [0, -8, 0],
//                     rotate: [0, 10, 0]
//                   }}
//                   transition={{ 
//                     duration: 3,
//                     repeat: Infinity,
//                     ease: "easeInOut"
//                   }}
//                   className="absolute -top-2 -right-2"
//                 >
//                   <FaPaw className="text-yellow-400 text-lg drop-shadow-md" />
//                 </motion.div>

//                 <motion.div
//                   animate={{ 
//                     scale: [1, 1.2, 1],
//                     opacity: [0.7, 1, 0.7]
//                   }}
//                   transition={{ 
//                     duration: 2,
//                     repeat: Infinity,
//                     ease: "easeInOut",
//                     delay: 1
//                   }}
//                   className="absolute -bottom-1 -left-1"
//                 >
//                   <FaHeart className="text-pink-400 text-sm" />
//                 </motion.div>
//               </div>

//               {/* Hover glow effect */}
//               <div className="absolute inset-0 rounded-full bg-primary-200 opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-xl" />
//             </div>
            
//             <div className="flex flex-col">
//               <motion.h1 
//                 className={`font-bold text-primary-500 transition-all duration-300 ${
//                   isScrolled ? 'text-xl' : 'text-2xl'
//                 }`}
//                 whileHover={{ scale: 1.05 }}
//               >
//                 Pawsome Pals
//               </motion.h1>
//               <motion.p 
//                 className={`text-gray-600 font-medium transition-all duration-300 ${
//                   isScrolled ? 'text-xs' : 'text-sm'
//                 }`}
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.2 }}
//               >
//                 🐕 For All the Dogs
//               </motion.p>
//             </div>
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden lg:flex items-center space-x-8">
//             {navigation.map((item, index) => (
//               <motion.div
//                 key={item.name}
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.1 }}
//               >
//                 <Link
//                   href={item.href}
//                   className={`font-medium transition-all duration-300 hover:text-primary-500 hover:scale-105 relative ${
//                     pathname === item.href ? 'text-primary-500' : 'text-gray-700'
//                   }`}
//                 >
//                   {item.name}
//                   {pathname === item.href && (
//                     <motion.div
//                       layoutId="navbar-indicator"
//                       className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-500 rounded-full"
//                     />
//                   )}
//                 </Link>
//               </motion.div>
//             ))}
            
//             <motion.a 
//               href="tel:+1234567890" 
//               className="flex items-center space-x-2 btn-primary shadow-lg hover:shadow-xl"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <FaPhone />
//               <span>Call Now</span>
//             </motion.a>
//           </div>

//           {/* Mobile Menu Button */}
//           <motion.button
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
//             whileTap={{ scale: 0.95 }}
//           >
//             <AnimatePresence mode="wait">
//               {isMobileMenuOpen ? (
//                 <motion.div
//                   key="close"
//                   initial={{ rotate: -90, opacity: 0 }}
//                   animate={{ rotate: 0, opacity: 1 }}
//                   exit={{ rotate: 90, opacity: 0 }}
//                   transition={{ duration: 0.2 }}
//                 >
//                   <FaTimes size={24} />
//                 </motion.div>
//               ) : (
//                 <motion.div
//                   key="menu"
//                   initial={{ rotate: 90, opacity: 0 }}
//                   animate={{ rotate: 0, opacity: 1 }}
//                   exit={{ rotate: -90, opacity: 0 }}
//                   transition={{ duration: 0.2 }}
//                 >
//                   <FaBars size={24} />
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </motion.button>
//         </nav>

//         {/* Mobile Menu */}
//         <AnimatePresence>
//           {isMobileMenuOpen && (
//             <motion.div
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: 'auto' }}
//               exit={{ opacity: 0, height: 0 }}
//               transition={{ duration: 0.3 }}
//               className="lg:hidden mt-4 pb-4 overflow-hidden"
//             >
//               <motion.div 
//                 className="flex flex-col space-y-2"
//                 initial={{ y: -20 }}
//                 animate={{ y: 0 }}
//                 transition={{ delay: 0.1 }}
//               >
//                 {navigation.map((item, index) => (
//                   <motion.div
//                     key={item.name}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: index * 0.1 }}
//                   >
//                     <Link
//                       href={item.href}
//                       onClick={() => setIsMobileMenuOpen(false)}
//                       className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 hover:bg-gray-100 hover:scale-105 block ${
//                         pathname === item.href ? 'text-primary-500 bg-primary-50' : 'text-gray-700'
//                       }`}
//                     >
//                       {item.name}
//                     </Link>
//                   </motion.div>
//                 ))}
//                 <motion.a 
//                   href="tel:+1234567890" 
//                   className="mt-4 btn-primary text-center shadow-lg"
//                   onClick={() => setIsMobileMenuOpen(false)}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.4 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <FaPhone className="inline mr-2" />
//                   Call Now
//                 </motion.a>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </header>
//   )
// }


// FILE: src/components/layout/Header.js

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBars, FaTimes, FaPhone } from 'react-icons/fa'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Reviews', href: '/reviews' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg py-2' : 'bg-white/90 backdrop-blur-md py-3'
    }`}>
      <div className="container">
        <nav className="flex items-center justify-between">
          {/* Simplified Static Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className={`relative transition-all duration-300 ${
                isScrolled ? 'w-12 h-12' : 'w-14 h-14'
              }`}>
                <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-lg">
                  <defs>
                    <radialGradient id="dogGradient" cx="50%" cy="40%" r="60%">
                      <stop offset="0%" stopColor="#ff6b6b" />
                      <stop offset="100%" stopColor="#f15043" />
                    </radialGradient>
                  </defs>
                  
                  {/* Background Circle */}
                  <circle cx="60" cy="60" r="55" fill="#fff" stroke="#f1f5f9" strokeWidth="2" />
                  
                  {/* Dog Head */}
                  <ellipse cx="60" cy="55" rx="28" ry="30" fill="url(#dogGradient)" />
                  
                  {/* Dog Ears */}
                  <path d="M35 45 Q30 25 45 35 Q50 45 45 55" fill="url(#dogGradient)" />
                  <path d="M85 45 Q90 25 75 35 Q70 45 75 55" fill="url(#dogGradient)" />
                  
                  {/* Inner ear details */}
                  <path d="M38 42 Q35 35 42 38 Q45 42 42 48" fill="#ff8a80" />
                  <path d="M82 42 Q85 35 78 38 Q75 42 78 48" fill="#ff8a80" />
                  
                  {/* Dog Snout */}
                  <ellipse cx="60" cy="65" rx="20" ry="15" fill="#ffab91" />
                  
                  {/* Nose */}
                  <ellipse cx="60" cy="62" rx="6" ry="4" fill="#37474f" />
                  <ellipse cx="60" cy="61" rx="3" ry="2" fill="#90a4ae" opacity="0.6" />
                  
                  {/* Eyes with sparkle */}
                  <circle cx="48" cy="50" r="4" fill="#2c3e50" />
                  <circle cx="72" cy="50" r="4" fill="#2c3e50" />
                  <circle cx="49" cy="48" r="1.5" fill="#ffffff" />
                  <circle cx="73" cy="48" r="1.5" fill="#ffffff" />
                  
                  {/* Happy mouth */}
                  <path d="M60 68 Q50 75 45 68" stroke="#37474f" strokeWidth="2" fill="none" strokeLinecap="round" />
                  <path d="M60 68 Q70 75 75 68" stroke="#37474f" strokeWidth="2" fill="none" strokeLinecap="round" />
                  
                  {/* Tongue */}
                  <path d="M60 70 Q55 78 60 82 Q65 78 60 70" fill="#ff5722" />
                </svg>

                {/* Simple hover glow effect (no animation) */}
                <div className="absolute inset-0 rounded-full bg-primary-200 opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-xl" />
              </div>
            </div>
            
            <div className="flex flex-col">
              <h1 className={`font-bold text-primary-500 transition-all duration-300 ${
                isScrolled ? 'text-xl' : 'text-2xl'
              }`}>
                Pawsome Pals
              </h1>
              <p className={`text-gray-600 font-medium transition-all duration-300 ${
                isScrolled ? 'text-xs' : 'text-sm'
              }`}>
                For All the Dogs
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className={`font-medium transition-all duration-300 hover:text-primary-500 hover:scale-105 relative ${
                    pathname === item.href ? 'text-primary-500' : 'text-gray-700'
                  }`}
                >
                  {item.name}
                  {pathname === item.href && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-500 rounded-full"
                    />
                  )}
                </Link>
              </motion.div>
            ))}
            
            <motion.a 
              href="tel:+254711103249" 
              className="flex items-center space-x-2 btn-primary shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaPhone />
              <span>Call Now</span>
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaTimes size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaBars size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden mt-4 pb-4 overflow-hidden"
            >
              <motion.div 
                className="flex flex-col space-y-2"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 hover:bg-gray-100 hover:scale-105 block ${
                        pathname === item.href ? 'text-primary-500 bg-primary-50' : 'text-gray-700'
                      }`}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.a 
                  href="tel:+254711103249" 
                  className="mt-4 btn-primary text-center shadow-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaPhone className="inline mr-2" />
                  Call Now
                </motion.a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}