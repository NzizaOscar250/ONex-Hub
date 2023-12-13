import express from "express"
import { isAuthorized } from "../middleware/Auth.js";
import * as enrollment from "../controllers/enrollment/index.js";
import { courseById } from "../controllers/course/Course.controller.js";
import { isStudent } from "../middleware/rest.mid.js";


const enrollRoutes = express.Router()

        enrollRoutes.route('/new/:courseId').get(isAuthorized,enrollment.findEnrollment,enrollment.create);
        enrollRoutes.route('/en/:enrollmentId').get(isAuthorized,isStudent,enrollment.readEnrollment)
     
        enrollRoutes.param("courseId",courseById)
        enrollRoutes.param("enrollmentId",enrollment.ById)
export default enrollRoutes;