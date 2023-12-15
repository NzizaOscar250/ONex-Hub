import { Navigate, } from "react-router-dom"
import auth from "../helper/auth.helper.js"

const ProtectedRoute = ({children}) => {

 
  if(!auth.isAuthenticated()){
    return <Navigate to="/auth" replace/>
  }
  return children;
}

export const TeacherAccess =  ({children})=>{
  if (!auth.isEducator ()) return <Navigate to="/profile/edit" replace/>
  return children
}

export default ProtectedRoute