import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, company, service, message } = body

    // Validation
    if (!name || !email || !message || !service) {
      return NextResponse.json({ error: 'Missing required fields: name, email, service, and message are required.' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
    }

    // Log submission (in production, send via Resend/SendGrid)
    console.log('📧 New contact form submission:', {
      name,
      email,
      phone: phone || 'Not provided',
      company: company || 'Not provided',
      service: service || 'General Inquiry',
      message,
      timestamp: new Date().toISOString(),
      recipient: process.env.CONTACT_EMAIL || 'info@afridynengineering.com',
    })

    // TODO: Uncomment and configure when adding email service
    // import { Resend } from 'resend'
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from: 'website@afridynengineering.com',
    //   to: process.env.CONTACT_EMAIL || 'info@afridynengineering.com',
    //   subject: `New Inquiry: ${service || 'General'} — ${name}`,
    //   html: `
    //     <h2 style="color:#0A1628">New Contact Form Submission</h2>
    //     <table>
    //       <tr><td><strong>Name:</strong></td><td>${name}</td></tr>
    //       <tr><td><strong>Email:</strong></td><td>${email}</td></tr>
    //       <tr><td><strong>Phone:</strong></td><td>${phone || 'Not provided'}</td></tr>
    //       <tr><td><strong>Company:</strong></td><td>${company || 'Not provided'}</td></tr>
    //       <tr><td><strong>Service:</strong></td><td>${service || 'General'}</td></tr>
    //     </table>
    //     <h3>Message:</h3>
    //     <p>${message}</p>
    //   `
    // })

    return NextResponse.json(
      { success: true, message: 'Thank you for reaching out. We will respond within 24 hours.' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Failed to send message. Please try again.' }, { status: 500 })
  }
}
