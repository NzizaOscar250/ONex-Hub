import { toast } from "react-toastify"
import * as  api from "../../API"
import { Update } from "../notifications"
import { GET_PUBLISHED_COURSES,
            CREATE_COURSE,
            GETCOURSE,
            ADDLESSON,
            UPDATE_COURSE,
            REMOVE_COURSE,
            ENROLL_COURSE,
            COURSE_STATITICS,
            MY_COURSES,
            ENROLLED_IN,
            LEARN
 } from "../../constants"

import auth from "../../helper/auth.helper.js"

let id = auth.userInfo()

export const createCourse = (formData,notId)=> async(dispatch)=>{
    try {
        const {data} = await api.createCourse(formData,id)

     if(data){ Update(notId,"Successfully Created...","success")
        dispatch({type:CREATE_COURSE,payload:data})}
    } catch (error) {
        toast.dismiss(notId)
        console.log(error)
    }
}

// __________________MY COURSE_______________
export const getMyCourses = ()=> async(dispatch)=>{
    try {
        const {data} = await api.coursesByIns(id)
        if(data){dispatch({type:MY_COURSES,payload:data})}
    } catch (error) {
        console.log(error)
  
    }
}
////get course'
export const getCourse = (courseId)=> async(dispatch)=>{
    try {
        const {data} = await api.course(courseId)
      
        if(data){ dispatch({type:GETCOURSE,payload:data})}
    } catch (error) {
        console.log(error)
     
    }
}

//update

export const updateCourse = (formData,notId,courseId)=> async(dispatch)=>{
    try {
        const {data} = await api.updateCourse(formData,courseId)
        if(data){Update(notId,"Successfully updated...","success")
        dispatch({type:UPDATE_COURSE,payload:data})}
    } catch (error) {
        console.log(error)
        Update(notId,"Failed to update...","error")
    }
}

//remove course
export const removeCourse = (courseId,notId,navigate)=> async(dispatch)=>{
    try {
        const {data} = await api.removeCourse(courseId)
        if(data){Update(notId,"Successfully Removed...","success")
        dispatch({type:REMOVE_COURSE,payload:data})
        navigate("/courses")}
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
        if(data){Update(notId,"Successfully done...","success")
        dispatch({type:ADDLESSON,payload:data})}
    } catch (error) {
        console.log(error)
        Update(notId,"adding lesson Failed...","error")
    }
}



// published courses
export const getPublished = ()=>async(dispatch)=>{
    try {
        const { data}= await api.publishedCourses()
        if(data){
            dispatch({type:GET_PUBLISHED_COURSES,payload:data})
            }
    } catch (error) {
        console.log(error,error.message) 
        
    }
}


//enroll course
export const enrollCourse = (courseId,notId)=> async(dispatch)=>{
    try {
        const {data} = await api.enrollCourse(courseId)

        if(data){
            Update(notId,"Successfully Enrolled...","success")
            dispatch({type:ENROLL_COURSE,payload:data})
        }

    } catch (error) {
        console.log(error)
        
    }
}
//remove course
export const getEnrollments = (enrollId,notId)=> async(dispatch)=>{
    try {
        const {data} = await api.enrollments(enrollId)
        if(data){ dispatch({type:LEARN,payload:data})
        Update(notId,"Course is ready","success")}
    } catch (error) {
        console.log(error)
    }
}

// enrolled in courses

export const getEnrolledCourses = ()=> async(dispatch)=>{
    try {
        const {data} = await api.enrolledIn()
        if(data){ 
            dispatch({type:ENROLLED_IN,payload:data})
        }

    } catch (error) {
        console.log(error.message)
    }
}

//statistcs
export const enrollStatics = (courseId)=> async(dispatch)=>{
    try {
        const {data} = await api.getEnrollStatics(courseId)

        if(data){
            dispatch({type:COURSE_STATITICS,payload:data})
        }

    } catch (error) {
        console.log(error)
    }

}

// complete lesson

export const completeLessons = (formData)=> async(dispatch)=>{
    try {
        const {data} = await api.completeLesson(formData,formData.enrollId)

        console.log(data)

    } catch (error) {
        console.log(error)
    }
}

