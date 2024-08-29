import express from 'express'
import {requestOTP,verifyLogin,verifySignup} from '../controller/otp.js'

const router=express.Router();

router.post('/OTP',requestOTP)
router.post('/signup',verifySignup)
router.post('/login',verifyLogin)

export default router