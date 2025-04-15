import User from '../../model/UserDetails.js'

export const editGender = async (req, res) => {
  const { userId, gender } = req.body
  console.log(userId, gender)
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { gender },
      { new: true }
    )

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.status(200).json({
      message: 'Gender updated successfully',
      user: updatedUser
    })
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error })
  }
}
