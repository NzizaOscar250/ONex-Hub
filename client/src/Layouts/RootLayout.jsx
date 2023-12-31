import { Box ,Typography,Divider, CircularProgress,Stack} from "@mui/material";
import { Outlet,Link, useLocation, useParams } from "react-router-dom";
import Navigation from "../views/components/Navigation";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import {useDispatch,useSelector} from "react-redux"
import { getEnrolledCourses,  getMyCourses, getPublished } from "../actions/courses";
import { fetchUserDetails } from "../actions/auth";
import auth from "../helper/auth.helper.js"
import { Home } from "@mui/icons-material";

const RootLayout = ()=>{
const dispatch = useDispatch();
const {userInfo} = useSelector((state)=>state.auth)
const {pathname} = useLocation()
const param= useParams()

const params = Object.values(param)
const breadArray =  pathname.split("/")

const newBread = breadArray.filter((item) => item != '' && item !== params[0])

// console.log(newBread)


// console.log("params=> ",param)
useEffect(()=>{
    dispatch(getPublished())
    dispatch(getEnrolledCourses())
    if(auth.isEducator()){
      dispatch(getMyCourses())
    }
    
    if(auth.userInfo()){
      dispatch(fetchUserDetails(auth.userInfo()))
   }
  
},[dispatch])

console.log("I can get what i want",auth.userInfo())

if (!userInfo) return <CircularProgress/>

return (
  <>
    <Navigation userInfo={userInfo} />
  <Box>
      <main>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pb: 6,
            mt: newBread.length && !newBread.includes("learn")?8:0
            
          }}
        >
          
          <ToastContainer/>
      
         {
          newBread.length !== 0 && !newBread.includes("learn") &&
               <Stack direction="row"  alignItems="center"  sx={{gap:1,width:"100%",
               mx:'auto',px:0.5,py:2,borderRadius:1,position:'fixed',background:'whitesmoke',zIndex:1000,left:0}}>
                  <Link to ="/" style={{p:0}}>
                    <Home style={{fontSize:'24px'}}/>
                  </Link>
                  <span style={{color:'#ddd',fontSize:'14px'}}> {'>>'} </span>  
              
                  {
                    newBread.map((item,i)=>(
                          
                              <Link key={i} to ={i != newBread.length - 1?`#`:`/${item}`} style={{display:'flex',alignItems:'center',gap:4,fontWeight: i != newBread.length - 1?400:700,textTransform:'capitalize',color: i != newBread.length - 1?'#555':'dodgerblue',fontSize:14,'&hover':{}}}>
                               <span> {item}</span>
                                {
                                  i != newBread.length - 1 && <span style={{color:'#ddd',fontSize:'14px'}}> {'>>'} </span>
                                }  
                              </Link>
                            
                        
                      ))
                  }
              </Stack>
         }
         
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