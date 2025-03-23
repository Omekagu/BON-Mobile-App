import express from 'express'
import { register } from '../../controllers/users/authentication.js'
const router = express.Router()

router.post('/register', register)

export default router
