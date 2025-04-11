import BonamiCard from '../../model/BonamiCardSchema.js'

const generateCardNumber = async () => {
  const count = await BonamiCard.countDocuments()
  const suffix = String(1 + count).padStart(3, '0') // e.g., 001, 002...
  return `234 - 009 - ${suffix}`
}

export const createBonamiCard = async (req, res) => {
  try {
    const { userId, country, address, Id, province, city } = req.body
    console.log('Received data:', req.body)
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
      expiryDate: '08/26' // You can make this dynamic
    })

    console.log('New BONami Card created:', newCard)
    // Send the card number and expiry date in the response
    res.status(201).json({ success: true, card: newCard })
  } catch (error) {
    console.error('Error creating BONami Card:', error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
}
