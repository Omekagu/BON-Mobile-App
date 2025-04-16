import jwt from 'jsonwebtoken'
import User from '../../model/UserDetails.js'
import { jwtSecret } from '../../utilities/jwtSecret.js'

export const Usertoken = (req, res) => {
  const token = req.headers.authorization?.split(' ')[1] // Extract token

  if (!token) {
    return res.status(401).json({ error: 'No token provided' })
  }

  try {
    const decoded = jwt.verify(token, jwtSecret)
    res.json({ message: 'Token is valid', userId: decoded.userId })
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' })
  }
}

// Protected Route
export const protectedApi = (req, res) => {
  const token = req.headers['authorization']
  if (!token) return res.status(401).json({ error: 'No token provided' })

  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET)
    res.json({ message: 'Authorized access', user: decoded })
  } catch (error) {
    res.status(403).json({ error: 'Invalid token' })
  }
}

export const userdata = async (req, res) => {
  const { token } = req.body
  try {
    const decoded = jwt.verify(token, jwtSecret) // Ensure `token` is a valid string
    const userEmail = decoded.email
    User.findOne({ email: userEmail }).then(data => {
      return res.send({ status: 'ok', data: data })
    })
  } catch (error) {
    return res.send({ error: error })
  }
}
