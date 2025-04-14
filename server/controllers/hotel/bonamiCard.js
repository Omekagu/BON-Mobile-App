import mongoose from 'mongoose'
import BonamiCard from '../../model/BonamiCardSchema.js'
// import User from '../../model/UserDetails.js'

const generateCardNumber = async () => {
  const count = await BonamiCard.countDocuments()
  const suffix = String(1 + count).padStart(3, '0') // e.g., 001, 002...
  return `234 - 009 - ${suffix}`
}

export const createBonamiCard = async (req, res) => {
  try {
    const { userId, country, address, Id, province, city } = req.body
    console.log('Received data:', req.body)

    // Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid user ID' })
    }

    // Check if user already has a card
    const existingCard = await BonamiCard.findOne({ userId })

    if (existingCard) {
      // Check expiry
      const [month, year] = existingCard.expiryDate.split('/')
      const expiry = new Date(`20${year}`, parseInt(month) - 1, 1)
      const now = new Date()

      if (expiry > now) {
        return res.status(400).json({
          success: false,
          message: 'User already has a valid BONami card'
        })
      }
    }

    // Generate new card number
    const cardNumber = await generateCardNumber()

    const newCard = await BonamiCard.create({
      userId,
      cardNumber,
      country,
      address,
      issuedDate: new Date(),
      Id,
      province,
      city,
      expiryDate: '08/26' // Optional: Make dynamic
    })

    console.log('New BONami Card created:', newCard)

    res.status(201).json({ success: true, card: newCard })
  } catch (error) {
    console.error('Error creating BONami Card:', error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
}

export const getBonamiCard = async (req, res) => {
  try {
    const { id } = req.params // This is the userId
    console.log('User ID:', id)

    const card = await BonamiCard.findOne({ userId: id }).populate(
      'userId',
      'firstName surname'
    )

    if (!card) {
      return res.status(404).json({ message: 'BONami Card not found' })
    }

    res.json({
      cardNumber: card.cardNumber,
      name: `${card.userId.firstName} ${card.userId.surname}`,
      expires: card.expiryDate
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

export const checkBonamiCardStatus = async (req, res) => {
  try {
    const { userId } = req.params

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' })
    }

    console.log('Checking BONami card status for user ID:', userId)
    // Check if userId exists in User collection
    const card = await BonamiCard.findOne({ userId })

    if (!card) {
      return res.status(200).json({ hasValidCard: false })
    }

    // Check if card is expired (assuming expiryDate is in MM/YY format)
    const [month, year] = card.expiryDate.split('/')
    const expiry = new Date(`20${year}`, parseInt(month), 0)
    const now = new Date()

    if (expiry > now) {
      return res.status(200).json({ hasValidCard: true })
    }

    return res.status(200).json({ hasValidCard: false })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Server error' })
  }
}
