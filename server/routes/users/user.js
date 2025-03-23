import express from 'express'
import { userdata } from '../../controllers/users/user.js'
const router = express.Router()

router.get('/userdata', userdata)

export default router
