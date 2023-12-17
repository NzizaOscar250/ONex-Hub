import {GET_PUBLISHED_COURSES,MY_COURSES} from "../../constants/index"


export default function courses(courses=[],action){
    switch (action.type) {
        case MY_COURSES:
            console.log(action.payload)
              return action.payload  
        default:
        return courses
    }   
}


export  function publishedCourses(courses=[],action){
    switch (action.type) {
        case GET_PUBLISHED_COURSES:
            console.log(action.payload)
              return action.payload  
        default:
        return courses
    }   
}