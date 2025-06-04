import User from '../../model/UserDetails.js'

// Fetch all users (GET /users)
export const Users = async (req, res) => {
  try {
    // Exclude password from all users
    const users = await User.find({}, '-password')
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: 'error', error: error.message })
  }
}

// Fetch single user by id (GET /user/:id)
export const LoggedUser = async (req, res) => {
  try {
    const { id } = req.params
    // Validate id
    if (!id || id === 'null' || id === null || id === undefined || id === '') {
      return res.status(400).json({ message: 'Invalid or missing user id' })
    }
    // Exclude password
    const user = await User.findById(id).select('-password')
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.json({ user })
  } catch (error) {
    console.error('Error fetching user:', error)
    res.status(500).json({ message: 'Server Error', error: error.message })
  }
}
