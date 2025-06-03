import User from '../../model/UserDetails.js'
import bcrypt from 'bcryptjs'
import { sendWelcomeEmail } from '../../utilities/email.js'

// Google Sign-In
export const googleReg = async (req, res) => {
  const { idToken } = req.body
  const client = new OAuth2Client('YOUR_GOOGLE_CLIENT_ID')
  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: 'YOUR_GOOGLE_CLIENT_ID'
    })
    const payload = ticket.getPayload()
    let user = await User.findOne({
      provider: 'google',
      providerId: payload.sub
    })
    if (!user) {
      user = await User.create({
        provider: 'google',
        providerId: payload.sub,
        email: payload.email,
        name: payload.name,
        avatar: payload.picture
      })
    }
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' })
    res.json({ token, user })
  } catch (err) {
    res.status(400).json({ error: 'Invalid Google token' })
  }
}

export const register = async (req, res) => {
  const {
    firstname,
    surname,
    email,
    referralCode,
    password,
    phoneNumber,
    profileImage,
    deviceType,
    userCountry
  } = req.body

  console.log('Request body:', req.body)
  console.log('Registering user...')
  try {
    const oldUser = await User.findOne({ email })
    if (oldUser) return res.status(400).json({ message: 'User already exists' })

    console.log(
      firstname,
      surname,
      email,
      password,
      phoneNumber,
      referralCode,
      profileImage,
      deviceType,
      userCountry
    )
    // Check if the password is strong enough
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new User({
      firstname,
      surname,
      referralCode,
      email,
      password: hashedPassword,
      phoneNumber,
      profileImage,
      deviceType,
      userCountry
    })
    console.log(newUser)
    await newUser.save()
    sendWelcomeEmail(email, firstname)
    res.status(201).json({ message: 'User registered successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error })
  }
}
