import express from 'express'
import {
  asabaRooms,
  asokoroRooms,
  bookedUserId,
  bookingCompleted,
  createMenuHotelId,
  deletebooked,
  elvisRooms,
  fecthPoolDetails,
  fetchHotelpool,
  getMenuId,
  hotelId,
  hotels,
  hyattiRooms,
  ikejaresRooms,
  imperialRooms,
  kanoRooms,
  nestgarkiRooms,
  nestIBRooms,
  platinumRooms,
  royalparklaneRooms,
  SearchCountry,
  SearchHotelsName,
  SearchState,
  smithcityRooms,
  transtellRooms
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
router.get('/royalparlane-rooms', royalparklaneRooms)
router.get('/kano-rooms', kanoRooms)
router.get('/platinum-rooms', platinumRooms)
router.get('/hyatti-rooms', hyattiRooms)
router.get('/smithcity-rooms', smithcityRooms)
router.get('/nestgarki-rooms', nestgarkiRooms)
router.get('/imperial-rooms', imperialRooms)
router.get('/elvis-rooms', elvisRooms)
router.get('/asokoro-rooms', asokoroRooms)
router.get('/transtell-rooms', transtellRooms)
router.get('/ikejares-rooms', ikejaresRooms)
router.get('/search/pool/:pool', fetchHotelpool)
router.get('/:pool/:id', fecthPoolDetails)
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
router.get('/bonami/userbonamicard/:id', getBonamiCard)
router.get('/bonami/check/:userId', checkBonamiCardStatus)

export default router
