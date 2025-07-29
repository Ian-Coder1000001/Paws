'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaDog, FaGraduationCap, FaCut, FaCheck, FaArrowRight } from 'react-icons/fa'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import ServiceModal from '@/components/services/ServiceModal'

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState(null)
  const [selectedPackage, setSelectedPackage] = useState(null)
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services')
      if (response.ok) {
        const data = await response.json()
        // Only show active services
        setServices(data.filter(s => s.active))
      }
    } catch (error) {
      console.error('Error fetching services:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePackageSelect = (service, packageItem) => {
    setSelectedPackage({ service: service.name, package: packageItem })
    router.push(`/contact?service=${encodeURIComponent(service.name)}&package=${encodeURIComponent(packageItem.name)}`)
  }

  const getIcon = (serviceName) => {
    const icons = {
      'Dog Walking': FaDog,
      'Dog Training': FaGraduationCap,
      'Dog Grooming': FaCut,
    }
    return icons[serviceName] || FaDog
  }

  if (loading) {
    return (
      <div className="pt-24 pb-16">
        <div className="container">
          <div className="flex items-center justify-center h-64">
            <div className="loading-spinner"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="section-title">Our Services</h1>
          <p className="section-subtitle">
            Professional dog care services delivered with love and expertise
          </p>
        </motion.div>

        {/* Services Grid */}
        {services.length > 0 ? (
          <div className="space-y-24">
            {services.map((service, index) => {
              const Icon = getIcon(service.name)
              return (
                <motion.section
                  key={service._id}
                  id={service.slug}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="scroll-mt-24"
                >
                  <div className={`grid lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}>
                    {/* Content */}
                    <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                      <div className="flex items-center mb-6">
                        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                          <Icon className="text-2xl text-primary-500" />
                        </div>
                        <div>
                          <h2 className="text-3xl font-bold">{service.name}</h2>
                          <p className="text-gray-600">{service.duration}</p>
                        </div>
                      </div>

                      <p className="text-lg text-gray-700 mb-6">{service.description}</p>
                      <p className="text-2xl font-semibold text-primary-500 mb-6">{service.price}</p>

                      {/* Features */}
                      <div className="grid sm:grid-cols-2 gap-3 mb-8">
                        {service.features?.map((feature, idx) => (
                          <div key={idx} className="flex items-start">
                            <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* CTA Button */}
                      <Link
                        href={`/contact?service=${encodeURIComponent(service.name)}`}
                        className="btn-primary inline-flex items-center"
                      >
                        Book {service.name}
                        <FaArrowRight className="ml-2" />
                      </Link>
                    </div>

                    {/* Image */}
                    <div className={`relative ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                      <img
                        src={service.image}
                        alt={service.name}
                        className="rounded-2xl shadow-xl w-full h-[400px] object-cover"
                      />
                      <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary-500 rounded-full opacity-20 blur-2xl" />
                      <div className="absolute -top-6 -left-6 w-32 h-32 bg-secondary-500 rounded-full opacity-20 blur-2xl" />
                    </div>
                  </div>

                  {/* Packages (if available) */}
                  {service.packages && service.packages.length > 0 && (
                    <div className="mt-16">
                      <h3 className="text-2xl font-bold text-center mb-8">Choose Your Package</h3>
                      <div className="grid md:grid-cols-3 gap-6">
                        {service.packages.map((pkg) => (
                          <motion.div
                            key={pkg.name}
                            whileHover={{ y: -5 }}
                            className="card p-6"
                          >
                            <h4 className="text-xl font-semibold mb-2">{pkg.name}</h4>
                            <p className="text-2xl font-bold text-primary-500 mb-4">{pkg.price}</p>
                            <ul className="space-y-2 mb-6">
                              {pkg.features.map((feature, idx) => (
                                <li key={idx} className="flex items-start">
                                  <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                                  <span className="text-gray-700">{feature}</span>
                                </li>
                              ))}
                            </ul>
                            <button
                              onClick={() => handlePackageSelect(service, pkg)}
                              className="w-full btn-primary"
                            >
                              Select Package
                            </button>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* FAQ (if available) */}
                  {service.faq && service.faq.length > 0 && (
                    <div className="mt-16">
                      <h3 className="text-2xl font-bold mb-6">Frequently Asked Questions</h3>
                      <div className="space-y-4">
                        {service.faq.map((item) => (
                          <details key={item.question} className="card p-6 cursor-pointer">
                            <summary className="font-semibold text-lg">{item.question}</summary>
                            <p className="mt-4 text-gray-700">{item.answer}</p>
                          </details>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.section>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600">No services available at the moment.</p>
            <p className="text-gray-500 mt-2">Please check back later.</p>
          </div>
        )}
      </div>

      {/* Service Modal */}
      {selectedService && (
        <ServiceModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </div>
  )
}