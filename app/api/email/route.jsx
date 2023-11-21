// pages/api/sendEmail.js
import sendEmail from '@/helpers/sendEmail'

export async function POST(req) {
  const { to, subject, text } = await req.formData()

  try {
    const result = await sendEmail(to, subject, text)
    return Response.json({ status: 200, success: true, result })
  } catch (error) {
    console.error('Error sending email:', error)
    return Response.json({ status: 500, success: false, error: error.message })
  }
}
