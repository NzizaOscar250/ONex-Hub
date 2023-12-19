import { toast } from "react-toastify"
import * as  api from "../../API"
import { jwtDecode } from 'jwt-decode';
import { Update } from "../notifications"
import { GET_PUBLISHED_COURSES,
            CREATE_COURSE,
            GETCOURSE,
            ADDLESSON,
            UPDATE_COURSE,
            REMOVE_COURSE,
            ENROLL_COURSE,
            ENROLLMENTS,
            COURSE_STATITICS,
            MY_COURSES,
            ENROLLED_IN,
            LEARN
 } from "../../constants"

import auth from "../../helper/auth.helper.js"

let id = auth.isAuthenticated()?.token
if (id){
    id = jwtDecode(id)?._id
}

export const createCourse = (formData,notId)=> async(dispatch)=>{
    try {
        const {data} = await api.createCourse(formData,id)
        Update(notId,"Successfully Created...","success")
        dispatch({type:CREATE_COURSE,payload:data})
    } catch (error) {
        console.log(error)
        Update(notId,"Failed...","error")
    }
}
// __________________MY COURSE_______________
export const getMyCourses = ()=> async(dispatch)=>{
    try {
        const {data} = await api.coursesByIns(id)
        dispatch({type:MY_COURSES,payload:data})
    } catch (error) {
        console.log(error)
        toast.error("Failed...")
    }
}
////get course'
export const getCourse = (courseId)=> async(dispatch)=>{
    try {
        const {data} = await api.course(courseId)
      
        dispatch({type:GETCOURSE,payload:data})
    } catch (error) {
        console.log(error)
     
    }
}

//update

export const updateCourse = (formData,notId,courseId)=> async(dispatch)=>{
    try {
        const {data} = await api.updateCourse(formData,courseId)
        Update(notId,"Successfully updated...","success")
        dispatch({type:UPDATE_COURSE,payload:data})
    } catch (error) {
        console.log(error)
        Update(notId,"Failed to update...","error")
    }
}

//remove course
export const removeCourse = (courseId,notId,navigate)=> async(dispatch)=>{
    try {
        const {data} = await api.removeCourse(courseId)
        Update(notId,"Successfully Removed...","success")
        dispatch({type:REMOVE_COURSE,payload:data})
        navigate("/courses")
    } catch (error) {
         const {data} = error.response
         console.log(data.error)
        // Update(notId,dataerror.,"error")
    }
}

//add lesson
export const addLessons = (formData,notId)=> async(dispatch)=>{
    try {
        const {data} = await api.addLesson(formData,formData.id)
        Update(notId,"Successfully done...","success")
        dispatch({type:ADDLESSON,payload:data})
    } catch (error) {
        console.log(error)
        Update(notId,"adding lesson Failed...","error")
    }
}



// published courses
export const getPublished = ()=>async(dispatch)=>{
    try {
        const { data}= await api.publishedCourses()
        dispatch({type:GET_PUBLISHED_COURSES,payload:data})

    } catch (error) {
        console.log(error,error.message) 
        toast.error("fetching courses failed,try again",{toastId:"error"})
    }
}


//enroll course
export const enrollCourse = (courseId,notId)=> async(dispatch)=>{
    try {
        const {data} = await api.enrollCourse(courseId)
        Update(notId,"Successfully Enrolled...","success")
        dispatch({type:ENROLL_COURSE,payload:data})
    } catch (error) {
        console.log(error)
        Update(notId,"Enrollment failed...","error")
    }
}
//remove course
export const getEnrollments = (enrollId,notId)=> async(dispatch)=>{
    try {
        const {data} = await api.enrollments(enrollId)
        dispatch({type:LEARN,payload:data})
        Update(notId,"Course is ready","success")
    } catch (error) {
        Update(notId,"Failed...","error")
    }
}

// enrolled in courses

export const getEnrolledCourses = ()=> async(dispatch)=>{
    try {
        const {data} = await api.enrolledIn()
        dispatch({type:ENROLLED_IN,payload:data})
    } catch (error) {
        console.log(error.message)
    }
}

//statistcs
export const enrollStatics = (enrollId)=> async(dispatch)=>{
    try {
        const {data} = await api.getEnrollStatics(enrollId)
        dispatch({type:COURSE_STATITICS,payload:data})
    } catch (error) {
        console.log(error)
    }

}

