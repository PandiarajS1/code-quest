import axios from "axios";

const API=axios.create({
    baseURL:"http://localhost:8000/"
});

API.interceptors.request.use((req)=>{
    if(localStorage.getItem("Profile")){
        req.headers.Authorization=`Bearer ${
            JSON.parse(localStorage.getItem("Profile")).token
        }`;    
    }
    return req;
})

export const login=(authdata)=>API.post("user/login",authdata);
export const signup=(authdata)=>API.post("user/signup",authdata);
export const getallusers=()=> API.get("/user/getallusers");
export const updateprofile=(id,updatedata)=>API.patch(`user/update/${id}`,updatedata)


export const postquestion=(questiondata)=>API.post("/questions/Ask",questiondata);
export const getallquestions=()=>API.get("/questions/get");
export const deletequestion=(id)=>API.delete(`/questions/delete/${id}`);
export const votequestion=(id,value)=>API.patch(`/questions/vote/${id}`,{value});


export const postanswer=(id,noofanswers,answerbody,useranswered)=>API.patch(`/answer/post/${id}`,{noofanswers,answerbody,useranswered});
export const deleteanswer=(id,answerid,noofanswers)=>API.patch(`/answer/delete/${id}`,{answerid,noofanswers});

export const uploadpost=(formdata)=>API.post('/publicspace/upload',formdata,{
    headers:{
        'Content-Type':'multipart/form-data'
    }
})
export const getposts=()=>API.get('/publicspace/posts');

export const uploadcomment=({postid,content,usercommented,userid})=>API.patch(`/publicspace/comments/${postid}`,{content,usercommented,userid})

export const handlefriends=(friendid)=>API.patch(`/publicspace/addfriends/${friendid}`)
export const getallfriends=()=>API.get('/publicspace/getfriends')

export const getloginhistory=()=>API.get('/user/loginhistory')

export const requestOTP=(email)=>API.post('/request/OTP',email)
export const verifySignup=(authdata)=>API.post('/request/signup',authdata)
export const verifyLogin=(authdata)=>API.post('/request/login',authdata)