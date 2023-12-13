import exress from "express"
import { getUser,updateUser,deleteUser, userById,getUserDetailsById } from "../controllers/user.controllers.js"
import { isAuthorized } from "../middleware/Auth.js"
const userRoutes = exress.Router()

userRoutes.get('/',isAuthorized,getUser)
          .get('/:userId',isAuthorized,getUser)
          .get('/details/:user',isAuthorized,getUser)
          .put("/:userId",isAuthorized,updateUser)
          .delete("/:userId",isAuthorized,deleteUser);


userRoutes.param('userId',userById)
userRoutes.param('user',getUserDetailsById)
export default userRoutes