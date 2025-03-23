import express from 'express'
import { register } from '../../controllers/users/authentication.js'
import { Login } from '../../controllers/users/login.js'
const router = express.Router()

router.post('/register', register)
router.post('/login', Login)

export default router
