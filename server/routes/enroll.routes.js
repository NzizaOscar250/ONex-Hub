import express from "express"
import { isAuthorized } from "../middleware/Auth.js";
import * as enrollment from "../controllers/enrollment/index.js";
import { courseById } from "../controllers/course/Course.controller.js";
import { isStudent , isMycourse } from "../middleware/rest.mid.js";


const enrollRoutes = express.Router()

        enrollRoutes.route('/new/:courseId').get(isAuthorized,isMycourse,enrollment.findEnrollment,enrollment.create);
        enrollRoutes.route('/en/:enrollmentId').get(isAuthorized,isStudent,enrollment.readEnrollment)
        enrollRoutes.route("/completed/:enrollmentId").put(isAuthorized,isStudent,enrollment.complete)
        enrollRoutes.route("/enrolled").get(isAuthorized,enrollment.listEnrollments)
        enrollRoutes.route("/stats/:courseId").get(isAuthorized,enrollment.enrollmentStatus)



        enrollRoutes.param("courseId",courseById);
        enrollRoutes.param("enrollmentId",enrollment.ById);
export default enrollRoutes;