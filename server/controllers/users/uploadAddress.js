import User from '../../model/UserDetails.js'

export const uploadAddress = async (req, res) => {
  const { userId, address } = req.body
  console.log(userId, address)
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { address },
      { new: true }
    )

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.status(200).json({
      message: 'address updated successfully',
      user: updatedUser
    })
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error })
  }
}
