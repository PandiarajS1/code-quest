import React,{useState} from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {verifyLogin,verifySignup,requestOTP} from '../../action/otp'
import Aboutauth from './Aboutauth';
import icon from '../../assets/icon.png'
import './Auth.css'


const VerficationAuth = () => {

    const [issignup, setissignup] = useState(false)
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("")
    const [otp,setotp] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const HandleSubmit = (e) => {
        e.preventDefault();

        if (!email && !password && !otp) {
            alert("Enter email, password and OTP")
        }
        if (issignup) {
            if (!name) {
                alert("Enter a name to continue")
            }
            dispatch(verifySignup({ name, email, password, otp }, navigate))
            
        } else {
            dispatch(verifyLogin({ email, password, otp}, navigate))
        
        }

    }

    const HandleOTP = (e) =>{
            e.preventDefault();
            if(!email){
                alert("enter email to request otp")
            }else{
                dispatch(requestOTP({email: email}))
            }
    }

    const handleswitch = () => {
        setissignup(!issignup);
        setname("");
        setemail("");
        setpassword("")

    }
  return (
    <section className="auth-section">
            {issignup && <Aboutauth />}
            <div className="auth-container-2">
                <img src={icon} alt="icon" className='login-logo' />
                <form>
                    {issignup && (
                        <label htmlFor="name">
                            <h4>Display Name</h4>
                            <input type="text" id='name' name='name' value={name} onChange={(e) => {
                                setname(e.target.value);
                            }} />
                        </label>
                    )}
                    <label htmlFor="email">
                        <h4>Email</h4>
                        <input type="email" id='email' name='email' value={email} onChange={(e) => {
                            setemail(e.target.value);
                        }} />
                    </label>
                    <label htmlFor="password">
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <h4>Password</h4>
                            {!issignup && (
                                <p style={{ color: "#007ac6", fontSize: "13px" }}>
                                    Forgot Password?
                                </p>
                            )}
                        </div>
                        <input type="password" name="password" id="password" value={password} onChange={(e) => {
                            setpassword(e.target.value)
                        }} />
                       </label> 

                       <label className='otp-label' htmlFor="otp">
                        <div  style={{ display: "flex", justifyContent: "space-between", width: '100%',margin:'0%'}}>
                            <h4 style={{marginBottom:'5px',marginTop:'12px'}}>OTP</h4>
                            <p style={{ color: "#000000", fontSize: "13px" }}>
                                verify from email
                            </p>

                        </div>
                        <div className='otp-input'>
                        <input className='otp-input-section' type="text" name="otp" id="otp" value={otp} onChange={(e) => {
                            setotp(e.target.value)
                        }} />
                        <button type='submit' className='auth-btn' onClick={HandleOTP}>
                            request OTP
                        </button>
                        </div>
                       </label> 

                    <button type='submit' className='auth-btn' onClick={HandleSubmit}>
                        {issignup ? "Verify & Sign up" : "Verify & Log in"}
                    </button>

                </form>
                <p>
                    {issignup ? "Already have an account?" : "Don't have an account"}
                    <button type='button' className='handle-switch-btn' onClick={handleswitch}>
                        {issignup ? "Log in" : "Sign up"}
                    </button>
                </p>
            </div>
        </section>
  )
}

export default VerficationAuth