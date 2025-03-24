import express from 'express'
import { adminLog } from '../../controllers/admin/adminLogin.js'

const router = express.Router()

router.post('/login', adminLog)

export default router
