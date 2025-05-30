import Booking from '../../model/Booking.js'
import Country from '../../model/Country.js'
import Hotel from '../../model/hotelModel.js'
import {
  poolASABA,
  poolASOKORO,
  poolELVIS,
  poolHYATTI,
  poolIKEJARES,
  poolIMPERIAL,
  poolKANO,
  poolNESTGARKI,
  poolNESTIB,
  poolPLATINUM,
  poolROYALPARKLANE,
  poolSMITHCITY,
  poolTRANSTELL
} from '../../utilities/pool.js'

// Get list of hotels
export const hotels = async (req, res) => {
  try {
    const hotels = await Hotel.find()
    res.json(hotels)
    // console.log(hotels)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch hotels' })
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
    const { country, state } = req.params // Country & state should be in query
    console.log(country, state)

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
  const { state } = req.params // Get the state from query parameters
  console.log(state)
  if (!state) {
    return res.status(400).json({ error: 'State parameter is required' })
  }

  try {
    // Fetch hotels based on the selected state from your database
    const hotels = await Hotel.find({ state: state }) // Assuming a MongoDB schema

    res.json(hotels)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
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
      pool,
      checkInDate,
      checkOutDate,
      checkInTime,
      guests,
      nights,
      rooms,
      totalPrice,
      status,
      hotelDetails
    } = req.body

    console.log('\n' + '='.repeat(50))
    console.log(req.body)
    console.log('\n' + '='.repeat(50))

    const formattedTotalPrice =
      typeof totalPrice === 'string'
        ? Number(totalPrice.replace(/,/g, ''))
        : totalPrice

    if (isNaN(formattedTotalPrice)) {
      return res.status(400).json({ error: 'Invalid totalPrice value' })
    }

    // const hotel = await Hotel.findById(hotelId)
    // if (!hotel) return res.status(404).json({ error: 'Hotel not found' })

    const newBooking = new Booking({
      userId,
      pool,
      checkInDate,
      checkOutDate,
      checkInTime,
      guests,
      rooms,
      nights,
      totalPrice: formattedTotalPrice,
      status, // Accept 'Completed' or 'Pending'
      hotelDetails
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
      return res.status(400).json({ message: 'Invalid user ID format' })
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

// hotel.js

// ✅ Reusable function with async/await and proper PromisePool usage
const getRoomsFromPool = pool => async (req, res) => {
  try {
    const [results] = await pool.query('SELECT * FROM wp_vikbooking_rooms')
    res.json(results)
  } catch (err) {
    console.error('Database Query Error:', err)
    res.status(500).send(err)
  }
}

// ✅ Exporting all handlers using the reusable function
export const nestIBRooms = getRoomsFromPool(poolNESTIB)
export const royalparklaneRooms = getRoomsFromPool(poolROYALPARKLANE)
export const kanoRooms = getRoomsFromPool(poolKANO)
export const platinumRooms = getRoomsFromPool(poolPLATINUM)
export const hyattiRooms = getRoomsFromPool(poolHYATTI)
export const smithcityRooms = getRoomsFromPool(poolSMITHCITY)
export const nestgarkiRooms = getRoomsFromPool(poolNESTGARKI)
export const imperialRooms = getRoomsFromPool(poolIMPERIAL)
export const elvisRooms = getRoomsFromPool(poolELVIS)
export const asokoroRooms = getRoomsFromPool(poolASOKORO)
export const transtellRooms = getRoomsFromPool(poolTRANSTELL)
export const ikejaresRooms = getRoomsFromPool(poolIKEJARES)
export const asabaRooms = getRoomsFromPool(poolASABA)

export const fetchHotelpool = async (req, res) => {
  const { pool } = req.params
  console.log(req.params)
  console.log(pool)

  const poolMap = {
    IkejaResSQL: poolIKEJARES,
    NestGarkiSQL: poolNESTGARKI,
    KanoSQL: poolKANO,
    TranstellSQL: poolTRANSTELL,
    HyattiSQL: poolHYATTI,
    PlatinumSQL: poolPLATINUM,
    RoyalParkLaneSQL: poolROYALPARKLANE,
    ImperialSQL: poolIMPERIAL,
    SmithCitySQL: poolSMITHCITY,
    ElvisSQL: poolELVIS,
    AsokoroSQL: poolASOKORO,
    AsabaSQL: poolASABA,
    NestIBSQL: poolNESTIB
  }

  const selectedPool = poolMap[pool]
  if (!selectedPool) {
    return res.status(400).json({ message: 'Invalid pool name' })
  }

  try {
    // Assuming rooms table instead of hotels table
    const [rows] = await selectedPool.query('SELECT * FROM wp_vikbooking_rooms')
    res.json(rows)
    console.log(rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Error fetching rooms' })
  }
}

export const fecthPoolDetails = async (req, res) => {
  const { pool, id } = req.params
  console.log(req.params)

  const poolMap = {
    IkejaResSQL: poolIKEJARES,
    NestGarkiSQL: poolNESTGARKI,
    KanoSQL: poolKANO,
    TranstellSQL: poolTRANSTELL,
    HyattiSQL: poolHYATTI,
    PlatinumSQL: poolPLATINUM,
    RoyalParkLaneSQL: poolROYALPARKLANE,
    ImperialSQL: poolIMPERIAL,
    SmithCitySQL: poolSMITHCITY,
    ElvisSQL: poolELVIS,
    AsokoroSQL: poolASOKORO,
    AsabaSQL: poolASABA,
    NestIBSQL: poolNESTIB
  }

  const selectedPool = poolMap[pool]
  if (!selectedPool) {
    return res.status(400).json({ message: 'Invalid pool name' })
  }

  try {
    const [rows] = await selectedPool.query(
      `SELECT * FROM wp_vikbooking_rooms WHERE id = ?`,
      [id]
    )

    if (!rows.length) {
      return res.status(404).json({ message: 'Room not found' })
    }

    res.json(rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Error fetching room details' })
  }
}
