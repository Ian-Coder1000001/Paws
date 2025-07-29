


'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaHeart, FaPaw, FaStar, FaUsers } from 'react-icons/fa'
import Image from 'next/image'

export default function AboutPage() {
  const [aboutData, setAboutData] = useState(null)
  const [teamMembers, setTeamMembers] = useState([])
  const [loading, setLoading] = useState(true)

  // Static values (these could also be fetched from API if needed)
  const values = [
    {
      icon: FaHeart,
      title: 'Love & Care',
      description: 'We treat every dog as if they were our own, with genuine love and affection.'
    },
    {
      icon: FaPaw,
      title: 'Professional Service',
      description: 'Our trained staff ensures the highest quality of care for your furry friends.'
    },
    {
      icon: FaStar,
      title: 'Excellence',
      description: 'We strive for excellence in everything we do, from walks to grooming.'
    },
    {
      icon: FaUsers,
      title: 'Community',
      description: 'We build lasting relationships with both pets and their families.'
    }
  ]

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      // Fetch about data
      const aboutResponse = await fetch('/api/about')
      if (aboutResponse.ok) {
        const about = await aboutResponse.json()
        setAboutData(about)
      }

      // Fetch team members
      const teamResponse = await fetch('/api/team')
      if (teamResponse.ok) {
        const team = await teamResponse.json()
        setTeamMembers(team)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  // Default fallback data while loading or if API fails
  const defaultAboutData = {
    title: 'About Pawsome Pals',
    subtitle: 'Your trusted partner in professional dog care since 2014',
    story: {
      title: 'Our Story',
      paragraphs: [
        'Pawsome Pals was born from a simple belief: every dog deserves love, care, and professional attention. Founded in 2014 by Sarah Johnson, a lifelong dog lover and certified trainer, we started as a small neighborhood dog walking service.',
        'What began as walks in the park has grown into a comprehensive dog care facility offering walking, training, and grooming services. Our team has expanded, but our core mission remains the same: treating every dog with the love and respect they deserve.',
        'Today, we\'re proud to be the trusted choice for hundreds of dog owners in our community. When you choose Pawsome Pals, you\'re not just getting a service – you\'re joining a family that cares deeply about your furry friend\'s wellbeing.'
      ]
    },
    mission: {
      title: 'Our Mission & Values',
      description: 'To provide exceptional dog care services that enhance the lives of pets and bring peace of mind to their owners, all while building a community of dog lovers.'
    },
    funFacts: [
      { number: '500+', label: 'Happy Dogs' },
      { number: '10+', label: 'Years of Service' },
      { number: '50+', label: 'Five-Star Reviews' },
      { number: '24/7', label: 'Emergency Support' }
    ],
    heroImage: 'https://res.cloudinary.com/dtpnfedy5/image/upload/v1/pawsome-pals/about-hero.jpg'
  }

  const defaultTeamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      image: 'https://res.cloudinary.com/dtpnfedy5/image/upload/v1/pawsome-pals/team-sarah.jpg',
      bio: '15+ years of experience in dog care and training.'
    },
    {
      name: 'Mike Chen',
      role: 'Head Trainer',
      image: 'https://res.cloudinary.com/dtpnfedy5/image/upload/v1/pawsome-pals/team-mike.jpg',
      bio: 'Certified dog trainer with a passion for behavioral science.'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Lead Groomer',
      image: 'https://res.cloudinary.com/dtpnfedy5/image/upload/v1/pawsome-pals/team-emily.jpg',
      bio: 'Award-winning groomer specializing in all breeds.'
    },
    {
      name: 'David Kim',
      role: 'Operations Manager',
      image: 'https://res.cloudinary.com/dtpnfedy5/image/upload/v1/pawsome-pals/team-david.jpg',
      bio: 'Ensuring smooth operations and happy customers.'
    }
  ]

  // Use fetched data or fallback to default data
  const currentAboutData = aboutData || defaultAboutData
  const currentTeamMembers = teamMembers.length > 0 ? teamMembers : defaultTeamMembers

  if (loading) {
    return (
      <div className="pt-24 pb-16">
        <div className="container">
          <div className="flex justify-center items-center min-h-96">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="container mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="section-title">{currentAboutData.title}</h1>
          <p className="section-subtitle">
            {currentAboutData.subtitle}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold mb-6">{currentAboutData.story.title}</h2>
            {currentAboutData.story.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-gray-700 mb-4">
                {paragraph}
              </p>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            <img
              src={currentAboutData.heroImage}
              alt="Happy dogs at Pawsome Pals"
              className="rounded-2xl shadow-xl"
            />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary-500 rounded-full opacity-20 blur-2xl" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-secondary-500 rounded-full opacity-20 blur-2xl" />
          </motion.div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="bg-gray-50 py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">{currentAboutData.mission.title}</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {currentAboutData.mission.description}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="text-3xl text-primary-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="container py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
          <p className="text-lg text-gray-600">
            Dedicated professionals who love what they do
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {currentTeamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="text-center"
            >
              <div className="relative mb-4 mx-auto w-48 h-48">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-primary-500 mb-2">{member.role}</p>
              <p className="text-gray-600 text-sm">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Fun Facts */}
      <section className="bg-primary-50 py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Fun Facts</h2>
            <p className="text-lg text-gray-600">
              Numbers that make us proud
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {currentAboutData.funFacts.map((fact, index) => (
              <motion.div
                key={fact.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl font-bold text-primary-500 mb-2">
                  {fact.number}
                </div>
                <p className="text-gray-700 font-medium">{fact.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-center bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-12 text-white"
        >
          <h2 className="text-3xl font-bold mb-4">
            Ready to Join the Pawsome Pals Family?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Give your dog the care they deserve with our professional services
          </p>
          <a href="/contact" className="bg-white text-primary-500 hover:bg-gray-100 font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 inline-block">
            Get Started Today
          </a>
        </motion.div>
      </section>
    </div>
  )
}