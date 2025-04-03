import express from 'express'
import {
  bookedUserId,
  bookingCompleted,
  createMenuHotelId,
  deletebooked,
  getMenuId,
  hotelId,
  hotels,
  SearchCountry,
  // saveForLater,
  SearchHotelsName,
  SearchState
} from '../../controllers/hotel/hotel.js'
const router = express.Router()

router.get('/hotels', hotels)
router.get('/:id', hotelId)
router.get('/search/:name', SearchHotelsName)
router.get('/search/countries', SearchCountry)
router.get('/search/states/:countryName', SearchState)
router.get('/menu/:hotelId', getMenuId)
router.post('/create-menu/:hotelId', createMenuHotelId)
router.post('/bookingCompleted', bookingCompleted)
// router.post('/saveForLater', saveForLater)
router.get('/bookings/:userId', bookedUserId)
router.delete('/delete-bookings/:id', deletebooked)

export default router
