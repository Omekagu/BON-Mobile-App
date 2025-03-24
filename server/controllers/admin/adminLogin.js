import Admin from '../../model/Admin.js'
import jwt from 'jsonwebtoken'
import { jwtSecret } from '../../utilities/jwtSecret.js'

// Admin Login Route
export const adminLog = async (req, res) => {
  console.log('Received login request:', req.body)
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ error: 'Missing email or password' })
  }

  try {
    const admin = await Admin.findOne({ email })
    if (!admin) {
      console.log('Admin not found:', email)
      return res.status(404).json({ error: 'Admin not found' })
    }

    console.log('Admin found:', admin)

    // const isMatch = await bcrypt.compare(password, admin.password);
    // if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ email: admin.email }, jwtSecret, {
      expiresIn: '1h'
    })
    console.log('Token generated:', token)
    res.json({ token })
  } catch (err) {
    console.error('Server error:', err)
    res.status(500).json({ error: 'Server error' })
  }
}
