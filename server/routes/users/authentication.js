import express from 'express'
import { register } from '../../controllers/users/authentication.js'
import { Login } from '../../controllers/users/login.js'
import {
  protectedApi,
  userdata,
  Usertoken
} from '../../controllers/users/token.js'
import { resetUserPassword } from '../../controllers/users/resetUserPassword.js'
import { sendOtp, verifyOtp } from '../../controllers/users/otpController.js'
import { updateProfileImage } from '../../controllers/users/uploadProfile.js'
import { editDob } from '../../controllers/users/editDob.js'
import { editGender } from '../../controllers/users/editGender.js'
import { uploadAddress } from '../../controllers/users/uploadAddress.js'
const router = express.Router()

router.post('/register', register)
router.post('/login', Login)
router.post('/reset-password', resetUserPassword)
router.post('/protected', protectedApi)
router.get('/usertoken', Usertoken)
router.get('/userdata', userdata)
router.post('/send-otp', sendOtp)
router.post('/verify-otp', verifyOtp)
router.post('/update-profile-image', updateProfileImage)
router.post('/editDob', editDob)
router.post('/editGender', editGender)
router.post('/editAddress', uploadAddress)

export default router
