// pages/api/sendEmail.js
import sendEmail from '@/helpers/sendEmail'

export async function POST(req) {

  try {
    const result = await sendEmail()
    return Response.json({ status: 200, success: true, result })
  } catch (error) {
    console.error('Error sending email:', error)
    return Response.json({ status: 500, success: false, error: error.message })
  }
}
