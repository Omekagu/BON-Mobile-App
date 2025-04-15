import User from '../../model/UserDetails.js'

export const editDob = async (req, res) => {
  const { userId, dob } = req.body
  console.log(userId, dob)
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { dob },
      { new: true }
    )

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.status(200).json({
      message: 'Profile image updated successfully',
      user: updatedUser
    })
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error })
  }
}
