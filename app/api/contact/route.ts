import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const TO_EMAIL = process.env.CONTACT_EMAIL || 'info@afridynengineering.com'
const FROM_EMAIL = process.env.FROM_EMAIL || 'onboarding@resend.dev'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, company, service, message } = body

    if (!name || !email || !message || !service) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, service, and message are required.' },
        { status: 400 },
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
    }

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `New Inquiry: ${service} — ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f8fafc;">
          <div style="background: #0F172A; padding: 24px; border-radius: 12px 12px 0 0;">
            <h1 style="color: #FF6B00; margin: 0; font-size: 20px;">Afridyn Engineering</h1>
            <p style="color: #94A3B8; margin: 4px 0 0; font-size: 13px;">New Contact Form Submission</p>
          </div>
          <div style="background: #ffffff; padding: 32px; border-radius: 0 0 12px 12px; border: 1px solid #E2E8F0; border-top: none;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #F1F5F9;">
                <td style="padding: 12px 0; color: #64748B; font-size: 13px; width: 130px;">Full Name</td>
                <td style="padding: 12px 0; color: #0F172A; font-size: 14px; font-weight: 600;">${name}</td>
              </tr>
              <tr style="border-bottom: 1px solid #F1F5F9;">
                <td style="padding: 12px 0; color: #64748B; font-size: 13px;">Email</td>
                <td style="padding: 12px 0; color: #0F172A; font-size: 14px;"><a href="mailto:${email}" style="color: #FF6B00;">${email}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #F1F5F9;">
                <td style="padding: 12px 0; color: #64748B; font-size: 13px;">Phone</td>
                <td style="padding: 12px 0; color: #0F172A; font-size: 14px;">${phone || '—'}</td>
              </tr>
              <tr style="border-bottom: 1px solid #F1F5F9;">
                <td style="padding: 12px 0; color: #64748B; font-size: 13px;">Company</td>
                <td style="padding: 12px 0; color: #0F172A; font-size: 14px;">${company || '—'}</td>
              </tr>
              <tr style="border-bottom: 1px solid #F1F5F9;">
                <td style="padding: 12px 0; color: #64748B; font-size: 13px;">Service</td>
                <td style="padding: 12px 0; color: #FF6B00; font-size: 14px; font-weight: 600;">${service}</td>
              </tr>
            </table>
            <div style="margin-top: 24px;">
              <p style="color: #64748B; font-size: 13px; margin: 0 0 8px;">Message</p>
              <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 16px; color: #0F172A; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</div>
            </div>
            <p style="margin: 24px 0 0; color: #94A3B8; font-size: 12px;">
              Submitted ${new Date().toLocaleString('en-ZM', { timeZone: 'Africa/Lusaka' })} (Lusaka time)
            </p>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: 'Failed to send message. Please try again.' }, { status: 500 })
    }

    return NextResponse.json(
      { success: true, message: 'Thank you for reaching out. We will respond within 24 hours.' },
      { status: 200 },
    )
  } catch (err) {
    console.error('Contact form error:', err)
    return NextResponse.json({ error: 'Failed to send message. Please try again.' }, { status: 500 })
  }
}
