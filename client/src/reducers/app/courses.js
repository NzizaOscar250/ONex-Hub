
import {ADDLESSON, CREATE_COURSE, PUBLISH_COURSE, GET_PUBLISHED_COURSES,MY_COURSES, REMOVE_COURSE,UPDATE_COURSE} from "../../constants/index"


export default function courses(courses=[],action){
    switch (action.type) {
        case MY_COURSES:
              return action.payload  
        case REMOVE_COURSE:
            return courses.filter((item)=>item._id !== action?.payload._id)
        case CREATE_COURSE:
            return [...courses,action.payload]
        case ADDLESSON:
            return courses.map((course)=>course._id === action?.payload?._id ? action.payload : courses)
        case UPDATE_COURSE:
             return courses.map((course)=>course._id === action.payload._id ? action.payload: courses)
        //      return courses.filter((item)=>item._id !== action?.payload.)
        default:
        return courses
    }   
}


export  function publishedCourses(courses=[],action){
    switch (action.type) {
        case GET_PUBLISHED_COURSES:
              return action.payload
        case PUBLISH_COURSE:
            return [...courses,...action.payload]
        default:
        return courses
    }   
}