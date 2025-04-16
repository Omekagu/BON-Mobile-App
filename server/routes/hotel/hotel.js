import express from 'express'
import {
  asabaRooms,
  bookedUserId,
  bookingCompleted,
  createMenuHotelId,
  deletebooked,
  getMenuId,
  hotelId,
  hotels,
  nestIBRooms,
  SearchCountry,
  SearchHotelsName,
  SearchState
} from '../../controllers/hotel/hotel.js'
import {
  checkBonamiCardStatus,
  createBonamiCard,
  getBonamiCard
} from '../../controllers/hotel/bonamiCard.js'
const router = express.Router()

router.get('/hotels', hotels)
router.get('/nestib-rooms', nestIBRooms)
router.get('/asaba-rooms', asabaRooms)
router.get('/:id', hotelId)
router.get('/search/:name', SearchHotelsName)
router.get('/search/countries', SearchCountry)
router.get('/search/state/:state', SearchState)
router.get('/menu/:hotelId', getMenuId)
router.post('/create-menu/:hotelId', createMenuHotelId)
router.post('/bookingCompleted', bookingCompleted)
router.get('/bookings/:userId', bookedUserId)
router.delete('/delete-bookings/:id', deletebooked)
router.post('/bonami-card', createBonamiCard)
router.get('/userbonami-card/:id', getBonamiCard)
router.get('/bonami/check/:userId', checkBonamiCardStatus)

export default router
