import * as api from '../api';
import { setcurrentuser } from './currentuser';
import { getloginhistory } from './loginHistory';
import { fetchallusers } from './users';


export const requestOTP =(email)=>async(dispatch)=>{
   try {
    await api.requestOTP(email);
   } catch (error) {
        console.log(error)
   }
}


export const verifySignup =(authdata,naviagte)=> async(dispatch)=>{
    try {
        const{data}=await api.verifySignup(authdata);
        dispatch({type:"AUTH",data})
        dispatch(setcurrentuser(JSON.parse(localStorage.getItem("Profile"))));
        dispatch(fetchallusers())
        naviagte("/")
    } catch (error) {
        console.log(error)
    }
}
export const verifyLogin =(authdata,naviagte)=> async(dispatch)=>{
    try {
        const{data}=await api.verifyLogin(authdata);
        dispatch({type:"AUTH",data})
        dispatch(setcurrentuser(JSON.parse(localStorage.getItem("Profile"))));
        dispatch(getloginhistory())
        naviagte("/")
    } catch (error) {
        console.log('this is error--->',error)
    }
}