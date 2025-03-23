import User from '../../model/UserDetails'
import bcrypt from 'bcryptjs'
import { sendWelcomeEmail } from '../../utilities/email.js'

export const register = async (req, res) => {
  const {
    username,
    email,
    password,
    phoneNumber,
    profileImage,
    deviceType,
    userCountry
  } = req.body

  try {
    const oldUser = await User.findOne({ email })
    if (oldUser) return res.status(400).json({ message: 'User already exists' })

    console.log(username, email, password, phoneNumber)
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      phoneNumber,
      profileImage,
      deviceType,
      userCountry
    })
    console.log(newUser)
    await newUser.save()
    sendWelcomeEmail(email, username)
    res.status(201).json({ message: 'User registered successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error })
  }
}
