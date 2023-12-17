import { Box ,Typography,Divider} from "@mui/material";
import { Outlet,Link } from "react-router-dom";
import Navigation from "../views/components/Navigation";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import {useDispatch} from "react-redux"
import { getEnrollments, getMyCourses, getPublished } from "../actions/courses";
const RootLayout = ()=>{
const dispatch = useDispatch();

useEffect(()=>{
    dispatch(getPublished())
    dispatch(getEnrollments())
    dispatch(getMyCourses())
    
},[dispatch])


  
return (
  <>
    <Navigation/>
  <Box>
      <main>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pb: 6,
            
          }}
        >
          
          <ToastContainer/>
            <Outlet/>
          
        </Box>
          
     </main>
    </Box>

    <footer>
      <Divider/>
    <Typography variant="body2" color="text.secondary" align="center" sx={{ paddingBlock:4}}>
     All right is reserved by OsDev {'Copyright © '}
      <Link color="inherit" to="/">
        StarDev
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
    </footer>
    </>
  );
}





export default RootLayout