import {combineReducers} from "redux"
import courses,{publishedCourses} from "./app/courses"
import Auth from "./app/Auth"
import Enrollments from './app/Enrollments'
export default combineReducers({
    auth:Auth,
    published:publishedCourses,
    mycourses: courses,
    enrollments:Enrollments
})