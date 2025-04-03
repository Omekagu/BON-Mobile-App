import Booking from '../../model/Booking.js'
import Country from '../../model/Country.js'
import Hotel from '../../model/hotelModel.js'

// Get list of hotels
export const hotels = async (req, res) => {
  try {
    const hotels = await Hotel.find()
    res.json(hotels)
    // console.log(hotels)
  } catch (error) {
    rmSync.status(500).json({ error: 'Failed to fetch hotels' })
  }
}

// Get hotel by ID
export const hotelId = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id)
    if (!hotel) return res.status(404).json({ error: 'Hotel not found' })
    res.json(hotel)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch hotel' })
  }
}

// Hotel search by name
export const SearchHotelsName = async (req, res) => {
  try {
    const { name } = req.params // Hotel name should be in params
    const { country, state } = req.query // Country & state should be in query

    if (!name) return res.status(400).json({ error: 'Hotel name is required' })

    let query = { name: new RegExp(name, 'i') }
    if (country) query.country = country
    if (state) query.state = state

    const hotels = await Hotel.find(query) // Search hotels
    res.json(hotels)
  } catch (error) {
    console.error(error) // Log error for debugging
    res.status(500).json({ error: error.message || 'Failed to search hotels' })
  }
}

export const SearchCountry = async (req, res) => {
  try {
    const countries = await Country.find().select('name')
    res.json(countries)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching countries' })
  }
}

// Fetch states for a given states
export const SearchState = async (req, res) => {
  try {
    const { countryName } = req.params
    const country = await Country.findOne({
      name: new RegExp(`^${countryName}$`, 'i')
    })

    if (!country) return res.status(404).json({ message: 'Country not found' })

    res.json(country.states)
  } catch (error) {
    console.error(error) // Log exact error
    res.status(500).json({ message: error.message || 'Error fetching states' })
  }
}

//Get Menu
export const getMenuId = async (req, res) => {
  try {
    const { hotelId } = req.params
    const hotel = await Hotel.findById(hotelId).populate('menu')

    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' })
    }

    res.status(200).json(hotel.menu)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching menu', error })
  }
}

//post a menu
export const createMenuHotelId = async (req, res) => {
  try {
    const { hotelId } = req.params

    // First, check if the hotel exists
    const hotel = await Hotel.findById(hotelId)
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' })
    }

    // Create and save the menu
    const newMenu = new Menu({
      hotel: hotelId,
      ...req.body
    })
    const savedMenu = await newMenu.save()

    // Add the menu reference to the hotel document
    hotel.menu.push(savedMenu._id)
    await hotel.save()

    res
      .status(201)
      .json({ message: 'Menu created and linked to hotel', menu: savedMenu })
  } catch (error) {
    res.status(500).json({ message: 'Error creating menu', error })
  }
}

// booking completed
export const bookingCompleted = async (req, res) => {
  try {
    const {
      userId,
      hotelId,
      checkInDate,
      checkOutDate,
      checkInTime,
      guests,
      nights,
      rooms,
      totalPrice,
      status
    } = req.body

    const formattedTotalPrice =
      typeof totalPrice === 'string'
        ? Number(totalPrice.replace(/,/g, ''))
        : totalPrice

    if (isNaN(formattedTotalPrice)) {
      return res.status(400).json({ error: 'Invalid totalPrice value' })
    }

    const hotel = await Hotel.findById(hotelId)
    if (!hotel) return res.status(404).json({ error: 'Hotel not found' })

    const newBooking = new Booking({
      userId,
      hotelId,
      checkInDate,
      checkOutDate,
      checkInTime,
      guests,
      rooms,
      nights,
      totalPrice: formattedTotalPrice,
      status // Accept 'Completed' or 'Pending'
    })

    await newBooking.save()
    res.status(201).json({
      status: 'ok',
      message: 'Booking processed successfully',
      booking: newBooking
    })
  } catch (error) {
    console.error('Server Error:', error)
    res.status(500).json({ error: 'Server error', details: error.message })
  }
}
// fetch booked room based on userid
export const bookedUserId = async (req, res) => {
  try {
    const { userId } = req.params

    if (!userId) {
      return res
        .status(400)
        .json({ status: 'error', message: 'User ID is required' })
    }

    const bookings = await Booking.find({ userId }) // Fetch only the user's bookings
      .populate('hotelId')

    res.status(200).json({ status: 'ok', data: bookings })
  } catch (error) {
    console.error('🔥 Booking Fetch Error:', error)
    res.status(500).json({ status: 'error', message: error.message })
  }
}

// Delete a booking
export const deletebooked = async (req, res) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid booking ID' })
    }

    const deletedBooking = await Booking.findByIdAndDelete(id)

    if (!deletedBooking) {
      return res.status(404).json({ message: 'Booking not found' })
    }

    res.json({ message: 'Booking deleted successfully' })
  } catch (error) {
    console.error('Error deleting booking:', error)
    res
      .status(500)
      .json({ message: 'Error deleting booking', error: error.message })
  }
}
