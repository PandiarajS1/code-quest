import express from 'express'
import {getallpost,uploadcomment} from '../controller/post.js'
import {addremovefriends,getallfriends} from '../controller/friends.js'
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/posts',auth,getallpost)
router.patch('/comments/:id',auth,uploadcomment)
router.patch('/addfriends/:id',auth,addremovefriends)
router.get('/getfriends',auth,getallfriends)

export default router