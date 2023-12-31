import axios from "axios"
import auth from "../helper/auth.helper"
import {toast} from "react-toastify"
// https://onexhub.onrender.com/api/
const API = axios.create({
    baseURL:'https://onexhub.onrender.com/api/',
    headers:{
        "Content-Type":'application/json'
    }
})


API.interceptors.request.use((req)=>{
   if(auth.isAuthenticated()){
     req.headers.Authorization = 'Bearer '+ auth.isAuthenticated()?.token
        
   }
   
    return req
},(error)=>{console.log("there was ana ",error)})


API.interceptors.response.use((res)=>{
  
return res
},(error)=>{
    if(error?.response?.data?.redirect == "/auth"){
        auth.clearJWT()
        window.location.reload()
    }

    if(error.code === 'ERR_NETWORK') {
        toast.update("oscar250",{render: `${error.message} , Check internet connection`,type:"warning",position:'top-center'})
    }  
    if(error.code === 'ERR_BAD_REQUEST' && error.response){
            const {data} = error.response
        toast.update("oscar250",{render: `${data?.error}`,type:"error",position:'top-center'})
    }

    console.log(error)
        
    return error;
})


export const SignIn = (formData)=> API.post('/auth/signin',formData)
export const SignUp = (formData)=> API.post("auth/signup",formData)
export const updateProfile = (formData)=>API.post(`/user/update/${formData.userId}`,formData)
export const fetchUser = (id)=>API.get(`/user/${id}`)


//create course
export const createCourse= (formData,owner)=>API.post(`courses/by/${owner}`,formData)
//get course by instructor
export const coursesByIns = (ins)=>API.get(`courses/by/${ins}`)
//get a course
export const course=(id)=>API.get(`courses/a/${id}`)

//__________add lesson to course__________

export const addLesson = (formData,courseId)=>API.post(`/courses/${courseId}/lesson/new`,formData)

// update course 

export const updateCourse = (formData,id)=>API.put(`/courses/${id}`,formData)

// Delete course

export const removeCourse = (id)=>API.delete(`/courses/${id}`)

// get published courses
export const publishedCourses =()=>API.get("/courses/published")
//enroll course
export const enrollCourse = (courseId)=>API.get(`/enrollment/new/${courseId}`)

//enrollments

export const enrollments= (enrollId)=>API.get(`/enrollment/en/${enrollId}`)
//enrolled courses

export const enrolledIn = ()=>API.get(`/enrollment/enrolled`)
// statistics

//complete lesson
export const completeLesson = (formData,enrollId,)=>API.put(`enrollment/completed/${enrollId}`,formData)

export const  getEnrollStatics=(courseId)=>API.get(`/enrollment/stats/${courseId}`)


