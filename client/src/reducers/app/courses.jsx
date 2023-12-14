import {GET_PUBLISHED_COURSES} from "../../constants/index"


export default function courses(courses=[],action){
    switch (action.type) {
        case GET_PUBLISHED_COURSES:
              return action.payload    
        default:
        return courses
    }   
}