import {ImageListItem,ImageListItemBar,IconButton,Button, Tooltip} from "@mui/material"
import DonutLargeIcon from '@mui/icons-material/DonutLarge'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import auth from "../../helper/auth.helper.js"
import {map} from "lodash"
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const CourseComponent = ({published}) => {

  const {enrollments} = useSelector((state)=>state.enrollments)

  const isEnrolled = (courseId)=>{
    console.log (enrollments.find((item)=>item.course._id == courseId))
    return  enrollments.find((item)=>item.course._id == courseId)
  }

  return (

        <>
         {
    map(published,(value)=>(
      <Tooltip key={value._id} title={  isEnrolled(value._id) ? isEnrolled(value._id).completed ? "Completed":"complete all Lessons":"Enroll today"}>
      <ImageListItem  >
      
        <img srcSet={value.image}
              src={value.image}
              alt={value.name}
              loading="lazy"
              style={{borderRadius:'5px',height:"300px",objectFit:'cover'}}
              />
            <ImageListItemBar
            title={value.name}
            subtitle={value.instructor.username}
            actionIcon={
              auth.isMycourse(value.instructor._id)?<Button variant="contained" component={Link} to = {`/courses/course/${value._id}`}>view</Button>:
              isEnrolled(value._id)?  isEnrolled(value._id).completed ? (
              
             <IconButton component={Link} to = {`/learn/${isEnrolled(value._id)._id}`}>
                 <VerifiedUserIcon sx={{color:'yellow'}}/>
             </IconButton>
            
             ):( 
              <IconButton  component={Link} to = {`/learn/${ isEnrolled(value._id)._id}`}>
                <DonutLargeIcon sx={{color:'yellow'}}/>
              </IconButton>
             ) :<Button variant="contained" color="secondary" component={Link} to = {`/courses/course/${value._id}`}>Enroll</Button> 
            }

            sx={{paddingInlineEnd:2}}
            />
          
      </ImageListItem>
      </Tooltip>
    ))

        
      }
        </>
  )
}

export default CourseComponent

