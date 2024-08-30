import * as api from '../api';
import { setcurrentuser } from './currentuser';
import { getloginhistory } from './loginHistory';
import { fetchallusers } from './users';
import { getallfriends } from './friends';
import { getpost } from './post';
import {fetchallquestion} from './question'

export const signup =(authdata,naviagte)=> async(dispatch)=>{
    try {
        const{data}=await api.signup(authdata);
        dispatch({type:"AUTH",data})
        dispatch(setcurrentuser(JSON.parse(localStorage.getItem("Profile"))));
        dispatch(fetchallusers());
        dispatch(fetchallquestion());
        dispatch(getpost());
        dispatch(getallfriends());
        naviagte("/")
    } catch (error) {
        console.log(error)
    }
}
export const login =(authdata,naviagte)=> async(dispatch)=>{
    try {
        const{data}=await api.login(authdata);
        dispatch({type:"AUTH",data})
        dispatch(setcurrentuser(JSON.parse(localStorage.getItem("Profile"))));
        dispatch(getloginhistory())
        dispatch(fetchallusers())
        dispatch(getallfriends());
        naviagte("/")
    } catch (error) {
        console.log(error)
    }
}