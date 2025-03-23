import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import User from '../../model/UserDetails.js'
import { sendLoginEmail } from '../../utilities/email.js'

// Json webtoken
const jwtSecret = crypto.randomBytes(64).toString('hex')

// Login User
export const Login = async (req, res) => {
  const { email, password } = req.body
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        return res
          .status(404)
          .json({ status: 'error', message: 'No record found' })
      }

      // Compare password with hashed password
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          return res
            .status(500)
            .json({ status: 'error', message: 'Server error' })
        }

        if (!isMatch) {
          return res
            .status(401)
            .json({ status: 'error', message: 'Invalid password' })
        }

        // Generate JWT Token with `userId`
        const token = jwt.sign({ userId: user._id }, jwtSecret, {
          expiresIn: '30m'
        })
        // Send userId along with token
        res.status(200).json({
          status: 'ok',
          data: { token, userId: user._id }
        })
      })
      sendLoginEmail(user.email, user.username)
    })
    .catch(err => {
      res.status(500).json({ status: 'error', message: 'Server error' })
    })
}
