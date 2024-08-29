import express from 'express'
import {getloginHistory} from '../controller/loginHistory.js'
import auth from '../middleware/auth.js'

const router = express.Router();

router.get('/loginhistory',auth,getloginHistory)

export default router 