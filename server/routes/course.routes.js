import express from "express"
import {userById } from "../controllers/user.controllers.js"
import {courseById, createCourse, createLesson, getCourse, 
    getCourseByInstructor,updateCourse,updateLesson,removeCourse, getPublishedCourses} from "../controllers/course/Course.controller.js"
import { isAuthorized } from "../middleware/Auth.js";
import { isEducator, isInstructor } from "../middleware/rest.mid.js";


const courseRoutes = express.Router();



courseRoutes.post('/by/:userId',isAuthorized,isEducator,createCourse)
            .get('/by/:userId',isAuthorized,isEducator,getCourseByInstructor)
            .get("/a/:courseId",isAuthorized,getCourse)
            .post("/:courseId/lesson/new",isAuthorized,isInstructor,createLesson)
            .put("/:courseId",isAuthorized,isInstructor,updateCourse)
            .delete("/:courseId",isAuthorized,isInstructor,removeCourse)
            .get("/published",isAuthorized,getPublishedCourses)



courseRoutes.param('userId',userById)
courseRoutes.param('courseId',courseById)
export default courseRoutes;