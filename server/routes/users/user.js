import express from 'express'
import { LoggedUser, Users } from '../../controllers/users/user.js'
const router = express.Router()

router.get('/users', Users)
router.get('/user/:id', LoggedUser)

export default router
