import User from '../../model/UserDetails.js'

export const Users = async (req, res) => {
  try {
    const users = await User.find({}, '-password')
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: 'error', error })
  }
}
