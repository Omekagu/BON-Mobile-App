import bcrypt from 'bcryptjs'
import User from '../../model/UserDetails.js'

// 📌 3️⃣ Reset Password
export const resetUserPassword = async (req, res) => {
  const email = req.body.email.toLowerCase() // Convert to lowercase
  const newPassword = req.body.newPassword

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10)
    await User.findOneAndUpdate({ email }, { password: hashedPassword })

    res.json({ message: 'Password reset successful' })
  } catch (error) {
    res.status(500).json({ message: 'Error resetting password' })
  }
}
