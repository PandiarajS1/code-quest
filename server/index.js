import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import multer from "multer"
import userroutes from "./routes/user.js"
import questionroutes from "./routes/question.js"
import answerroutes from "./routes/answer.js"
import publicspaceroutes from './routes/post.js'
import loginHistoryroute from './routes/loginHistory.js'
import otproutes from './routes/otp.js'
import auth from "./middleware/auth.js"
import { createpost } from "./controller/post.js"

const app = express();
dotenv.config();
app.use(express.json({ limit: "30mb", extended: true }))
app.use(express.urlencoded({ limit: "30mb", extended: true }))
app.use(cors());

const storage = multer.diskStorage({
    destination: function (req,file,cb) {
        cb(null,"uploads/");
    },
    filename: function (req,file,cb) {
        cb(null,file.originalname)
    }
})

const upload = multer({storage});
app.post('/publicspace/upload',auth, upload.single('media'),createpost)

app.use('/request',otproutes)
app.use("/user", userroutes);
app.use('/user',loginHistoryroute)
app.use('/questions', questionroutes)
app.use('/answer',answerroutes)
app.use('/publicspace',publicspaceroutes)


app.get('/', (req, res) => {
    res.send("Codequest is running perfect")
})

const PORT = process.env.PORT || 8000
const database_url = process.env.MONGODB_URL

mongoose.connect(database_url)
    .then(() => app.listen(PORT, () => { console.log(`server running on port ${PORT}`) }))
    .catch((err) => console.log(err.message))