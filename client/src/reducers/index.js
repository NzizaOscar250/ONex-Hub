import {combineReducers} from "redux"
import courses from "./app/courses"
import Auth from "./app/Auth"

export default combineReducers({
    Auth,courses
})