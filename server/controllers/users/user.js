import User from '../../model/UserDetails.js'

// Fetch all users
export const Users = async (req, res) => {
  try {
    const users = await User.find({}, '-password')
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: 'error', error })
  }
}

// GET /user/:id – fetch user data by id
export const LoggedUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password') // omit sensitive fields
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.json({ user })
  } catch (error) {
    console.error('Error fetching user:', error)
    res.status(500).json({ message: 'Server Error', error: error.message })
  }
}
