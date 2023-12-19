import { ImageList,ImageListItem,ListSubheader, Typography,Button,ImageListItemBar,IconButton, CircularProgress } from "@mui/material"
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme} from "@mui/material/styles"

import { blue, } from "@mui/material/colors";
import { useSelector } from "react-redux";
import { map } from "lodash";
import {Link} from "react-router-dom"
import auth from "../helper/auth.helper.js"
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";

const Enrollment = () => {
  const theme = useTheme()
  const matchDownMd = useMediaQuery(theme.breakpoints.down('sm'));
  const enrolledCourses = useSelector((state)=>state.enrollments.enrollments)

  // if (!en)


  return (
    <>
      <ImageList  sx={{p:0,m:0}} cols={matchDownMd? 2 : 5} >
        <ImageListItem key="subheader"  cols={matchDownMd? 2 : 5}>
          <ListSubheader component="div" sx={{background:blue[100],paddingBlock:2}}>
            <Typography variant="h6" sx={{color:'#555'}}>Courses You are Enrolled In</Typography>
          </ListSubheader>
        </ImageListItem>

    
   {
    map(enrolledCourses,(value,index)=>
    //   // console.log(value.course.name)
      <ImageListItem  key={index}>
        
      <img 
            srcSet={value.course.image}
            src={value.course.image}
            alt={value.course.name}
            loading="lazy"
            style={{borderRadius:'5px',minHeight:200}}
            />
          <ImageListItemBar
          title={value.course.name}
      
          actionIcon={
          //   auth.isMycourse(value.instructor._id)?<Button variant="contained" component={Link} to = {`/courses/course/${value._id}`}>view</Button>:
            value.completed ? (
            
           <IconButton component={Link} to = {`/learn/${value._id}`}>
               <VerifiedUserIcon sx={{color:'yellow'}}/>
           </IconButton>
          
           ):( 
            <IconButton  component={Link} to = {`/learn/${value._id}`}>
              <DonutLargeIcon sx={{color:'yellow'}}/>
            </IconButton>
           )
            // :<Button variant="contained" color="secondary" component={Link} to = {`/courses/course/${value._id}`}>Enroll</Button> 
         
        }

          sx={{paddingInlineEnd:2}}
          />
        
    </ImageListItem>

    )
   }   
       
</ImageList>
    </>
  )
}

export default Enrollment