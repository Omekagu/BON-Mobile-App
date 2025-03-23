import express from 'express'
import { register } from '../../controllers/users/authentication'
const router = express.Router()

router.post('/register', register)
