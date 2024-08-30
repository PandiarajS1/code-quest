import users from '../models/auth.js'
import loginHistory from '../models/loginhistory.js'

import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"



export const signup = async (req, res) => {
    const {name, email, password ,browser ,os ,devicetype} = req.body;
    let ipAddress = req.ip;

    try {
        
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
    

        if(req.headers['x-forwarded-for']){
            const forwaredIps = req.headers['x-forwarded-for'].split(',')
            ipAddress = forwaredIps[0].trim();
        }else if (req.connection && req.connection.remoteAddress){
            ipAddress = req.connection.remoteAddress;
        }


        const loginData = new loginHistory({
            user_id: newuser._id,
            ipAddress,
            os,
            browser,
            devicetype
        })
    
        await loginData.save();

        if(browser === 'Edge'){      
            res.status(200).json({ result: newuser, token });
        }else if(devicetype === 'mobile'){
            const currenttime = new Date();
            const currentHour = currenttime.getHours();
            if(currentHour >=10 && currentHour<=13){
                res.status(200).json({ result: newuser, token });
            }else{
                res.status(404).json('access restricted during this time')
            }
        }else if(browser === 'Brave'){
            res.status(200).json({ result: newuser, token })
        }else{
            res.status(500).json({message:'unsupported browser'})
        }
    } catch (error) {
        res.status(500).json("something went wrong...")
        return
    }
}

export const login = async (req, res) => {
    const { email, password ,browser ,os ,devicetype } = req.body;
    let ipAddress = req.ip;

    try {
        const extinguser = await users.findOne({ email });

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

        if(req.headers['x-forwarded-for']){
            const forwaredIps = req.headers['x-forwarded-for'].split(',')
            ipAddress = forwaredIps[0].trim();
        }else if (req.connection && req.connection.remoteAddress){
            ipAddress = req.connection.remoteAddress;
        }


        const loginData = new loginHistory({
            user_id: extinguser._id,
            ipAddress,
            os,
            browser,
            devicetype
        })

        await loginData.save();

        if(browser === 'Edge'){
            res.status(200).json({ result: extinguser, token })
        }else if(devicetype === 'mobile'){
            const currenttime = new Date();
            const currentHour = currenttime.getHours();
            if(currentHour >=10 && currentHour<=13){
                res.status(200).json({ result: extinguser, token })
            }else{
                res.status(404).json('access restricted during this time')
            }
        }else if(browser === 'Brave'){
            res.status(200).json({ result: extinguser, token })
        }else{
            res.status(400).json('unsupported browser')
        }
    } catch (error) {
        res.status(500).json("something went wrong...")
        return
    }
}


