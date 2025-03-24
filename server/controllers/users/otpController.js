import Otp from '../../model/Otp.js'
import User from '../../model/UserDetails.js'
import otpGenerator from 'otp-generator'

const generateOTP = () => {
  return otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
    digits: true
  })
}

// 📌 1️⃣ Send OTP
export const sendOtp = async (req, res) => {
  const { email } = req.body
  console.log('Received email:', email)

  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: 'User not found' })

    const otp = generateOTP()
    await Otp.create({ email, otp })
    // console.log(email, otp)

    // Send email
    await transporter.sendMail({
      from: 'ea@bonhotelsinternational.com',
      to: email,
      subject: 'Password Reset OTP',
      text: `Your OTP is ${otp}. It expires in 5 minutes.`
    })

    res.json({ message: 'OTP sent to email' })
  } catch (error) {
    res.status(500).json({ message: 'Error sending OTP' })
    console.log(error)
  }
}

// 📌 2️⃣ Verify OTP
export const verifyOtp = async (req, res) => {
  const email = req.body.email.toLowerCase() // Convert to lowercase
  const otp = req.body.otp
  console.log('Received OTP:', otp, 'for email:', email)

  try {
    const otpRecord = await Otp.findOne({ email, otp })
    if (!otpRecord)
      return res.status(400).json({ message: 'Invalid OTP or expired' })

    res.json({ message: 'OTP Verified' })
  } catch (error) {
    res.status(500).json({ message: 'Error verifying OTP' })
  }
}
