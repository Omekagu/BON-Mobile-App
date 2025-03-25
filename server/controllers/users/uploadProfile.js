import User from '../../model/UserDetails.js'

export const updateProfileImage = async (req, res) => {
  const { userId, profileImage } = req.body
  console.log(userId, profileImage)
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profileImage },
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
