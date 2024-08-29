import nodemailer from 'nodemailer'
import otpModel from '../models/otp.js'
import users from '../models/auth.js'
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"


export const requestOTP = async(req,res) => {

    const  {email} = req.body;
    try {
        const plainOTP = generateOTP();

        await sendOtpToEmail(email , plainOTP)
        const hashedotp = await bcrypt.hash(plainOTP,4)

        const OTP = await otpModel.create(
            {
            user_email:email,
            otp:hashedotp,
            createdAt:Date.now(),
            expireAt:Date.now()+10*60*1000,
            }
        )
        await OTP.save()
        console.log(OTP)
            res.status(200).json('OTP send')
    } catch (error) {
        res.status(404).json({message:'some problem in OTP generation',error:error.message})
    }
}

function generateOTP(){
    return Math.floor(1000 + Math.random() * 9000).toString()
}

async function sendOtpToEmail(email,otp) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: 's.pandiarajsekar@gmail.com',
            pass: 'xfoi cdcp bvzc xiqn'
        }
    })

    const mailOptions = {
        from : 's.pandiarajsekar@gmail.com',
        to: email,
        subject: 'verify OTP for Code Quest',
        html:`
        <h5>verify OTP</h5><br>
        <p>
        hi User,<br>
        please find your one time Password(OTP) for login or signup to your <br>
        <b>CODE QUEST</b> website <br>
        <b>${otp}</b> this is the otp.<br>
        expires in 10 mins.<br>
        Do not share your OTP with others.
        </p>`
    }

    transporter.sendMail(mailOptions,(error,info)=>{
        if(error){
            console.error(error)
        }else{
            console.log(info)
        }
    })
}

export const verifySignup =async(req,res)=>{

    const {name, email, password ,otp} = req.body;

    try {

        const Verified = await verifyOTP(email,otp);

        if(Verified.success){
            const extinguser = await users.findOne({ email });
        if (extinguser) {
            return res.status(404).json({ message: "User already exist" });
        }
        const hashedpassword = await bcrypt.hash(password, 12);
        const newuser = await users.create({
            name,
            email,
            password: hashedpassword
        });
        const token = jwt.sign({
            email: newuser.email, id: newuser._id
        }, process.env.JWT_SECRET, { expiresIn: "1h" }
        )

        res.status(200).json({ result: newuser, token });

        }else{
            res.status(400).json({message: Verified.message})
        }

        
    } catch (error) {
        res.status(500).json({message:"something went wrong...",error:error.message})
        return
    }
}

export const verifyLogin=async(req,res)=>{
    const { email, password ,otp} = req.body;
    try {


        const Verified = await verifyOTP(email,otp);
        console.log(Verified)
        if(Verified.success){
            const extinguser = await users.findOne({ email });
            console.log(extinguser)

            if (!extinguser) {
                return res.status(404).json({ message: "User does not exists" })
            }
            const ispasswordcrct = await bcrypt.compare(password, extinguser.password);
            if (!ispasswordcrct) {
                res.status(400).json({ message: "Invalid credentiasl" });
                return
            }
            const token = jwt.sign({
                email: extinguser.email, id: extinguser._id
            }, process.env.JWT_SECRET, { expiresIn: "1h" }
            )
    
            res.status(200).json({ result: extinguser, token })
    }else{
        res.status(400).json({message: Verified.message})
    }
        
    } catch (error) {
        res.status(500).json({message:"something went wrong...",error:error.message})
        return
    }
} 

async function verifyOTP(email,otp){
    try{
        const otpRecord = await otpModel.findOne({user_email:email});

        if(!otpRecord){
            return{
                success: false,
                message:'no such otp exists'
            }
        }

        if(new Date() > otpRecord.expireAt){
            return{
                success: false,
                message: 'otp expired'
            }
        }

        const matchOTP = await bcrypt.compare(otp,otpRecord.otp)

        if(matchOTP){
            await otpRecord.deleteOne({email});
            return{
                success:true,
                message:'OTP verified'
            }
        }else{
            return{
                success: false,
                message: 'Invalid OTP'
            }
        }

    }catch(error){
        console.error('error in verifying OTP')
        return{
            success: false,
            message: 'internal server error'
        }
    }
}