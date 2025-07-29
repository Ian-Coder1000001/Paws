import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const body = await request.json()
    const { name, email, phone, service, message } = body

    // Send to Formspree
    const formspreeResponse = await fetch(process.env.FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        service,
        message,
        _subject: `New Contact from ${name} - ${service || 'General Inquiry'}`,
      }),
    })

    if (!formspreeResponse.ok) {
      throw new Error('Failed to send message')
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}