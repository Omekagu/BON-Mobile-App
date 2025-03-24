import express from 'express'
import {
  bookedUserId,
  bookingCompleted,
  createMenuHotelId,
  deletebooked,
  getMenuId,
  hotelId,
  hotels,
  // saveForLater,
  SearchHotelsName
} from '../../controllers/hotel/hotel.js'
const router = express.Router()

router.get('/hotels', hotels)
router.get('/:id', hotelId)
router.get('/search/:name', SearchHotelsName)
router.get('/menu/:hotelId', getMenuId)
router.post('/create-menu/:hotelId', createMenuHotelId)
router.post('/bookingCompleted', bookingCompleted)
// router.post('/saveForLater', saveForLater)
router.get('/bookings/:userId', bookedUserId)
router.delete('/delete-bookings/:id', deletebooked)

export default router
