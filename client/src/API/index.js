import axios from "axios"

const API = axios.create({
    baseURL:'http://localhost:7000/',
    timeout:5000,
    headers:{
        "Content-Type":'application/json'
    }
})


API.interceptors.request.use((req)=>{
   if(sessionStorage.getItem('jwt')){
     req.headers.Authorization = 'Bearer '+JSON.parse(sessionStorage.getItem('jwt')?.token)

   }
   
    return req
},(error)=>{console.log("there was ana ",error)})




export const SignIn = (formData)=> API.post('/auth/signin',formData)

export const SignUp = (formData)=> API.post("auth/signup",formData)
