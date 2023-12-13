import {Route, RouterProvider, createBrowserRouter,createRoutesFromElements} from "react-router-dom"
import './App.css'
import Home from "./views/Home"
import Courses from "./views/Courses"
// import Enrollment from "./views/Enrollment"
import Auth from "./auth/Auth"
import SignIn from "./auth/SignIn"
import SignUp from "./auth/SignUp"
import RootLayout from "./Layouts/RootLayout"
import User from "./views/User/User"
import Profile from "./views/User/Profile"
import EditUser from "./views/User/EditUser"
import NewCourse from "./views/course/NewCourse"
import MyCourse from "./views/course/MyCourse"
import Course from "./views/course/Course"
import Teach from "./views/course/Teach"
import NotFound from "./helper/NotFound"
import EditCourse from "./views/course/EditCourse"
import NewLesson from "./views/course/NewLesson"
import Enrollment from "./views/enrollment/Enrollment"
import ProtectedRoute from "./auth/ProtectedRoute"


function App() {
const router = createBrowserRouter(
  createRoutesFromElements(<>

  <Route path="/" element={
              // <ProtectedRoute user={{username:'oscar250'}}>
               <ProtectedRoute user={null}> 
                  <RootLayout/>
               </ProtectedRoute> 
         }>

        <Route index element={<Home/>}/>
        <Route path="enrollement" element={<Enrollment/>}/>
        <Route path="learn/:enrollId" element={<Enrollment/>}/>
        <Route path="profile" element={<User/>}>
              <Route index element={<Profile/>}/>
              <Route path="edit" element= {<EditUser/>}/>
        </Route>
        <Route path="trend" element={<Courses/>}/>
{/* courses route */}
            <Route path="courses" element={<Teach/>}>
                <Route index element={<MyCourse/>}/>
                <Route path="new" element={<NewCourse/>}/>
            <Route path="course/:courseId" element={<Teach/>}>
                  <Route index element={<Course/>}/>
                  <Route path="edit" element={<EditCourse/>}/>
                  <Route path="newlesson" element={<NewLesson/>}/>
            </Route>
        </Route>
        {/*  end courses routes */}

  </Route>
    {/* <Route path="/course" element={<Course/>}>
      <Route path="/newlesson"/o>
    </Route> */}
    <Route path="auth" element={<Auth/>}>
    <Route index  element={<SignIn/>}/>
    <Route path="signup" element={<SignUp/>}/>
    </Route>
    <Route path="*" element={<NotFound/>}/>
  </>)
)
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
