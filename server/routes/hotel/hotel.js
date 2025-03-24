import express from 'express'
import { hotelId, hotels } from '../../controllers/hotel/hotel'
const router = express.Router()

router.get('/hotels', hotels)
router.get('/:id', hotelId)

export default router
