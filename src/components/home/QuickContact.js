'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { FaPhone, FaPaw } from 'react-icons/fa'

export default function QuickContact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="section-padding bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="inline-block mb-6"
          >
            <FaPaw className="text-6xl" />
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Give Your Dog the Best Care?
          </h2>
          
          <p className="text-xl mb-8 opacity-90">
            Our team is ready to provide your furry friend with professional, 
            loving care. Book our services today and see the difference!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="bg-white text-primary-500 hover:bg-gray-100 font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-lg"
            >
              Book Our Services Now
            </Link>
            
            <a 
              href="tel:+1234567890" 
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-500 font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 text-lg inline-flex items-center justify-center"
            >
              <FaPhone className="mr-2" />
              Call Us Now
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}