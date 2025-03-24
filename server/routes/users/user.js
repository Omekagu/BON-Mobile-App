import express from 'express'
import { Users } from '../../controllers/users/user.js'
const router = express.Router()

router.get('/users', Users)

export default router
