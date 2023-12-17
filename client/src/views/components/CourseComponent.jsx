import {ImageListItem,ImageListItemBar,IconButton,Button, Tooltip} from "@mui/material"
import DonutLargeIcon from '@mui/icons-material/DonutLarge'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import auth from "../../helper/auth.helper.js"
import {map} from "lodash"
import { Link } from "react-router-dom";
const CourseComponent = ({published,isEnrolled}) => {



  return (

        <>
         {
    map(published,(value)=>(
      <Tooltip key={value._id} title={  isEnrolled? value.completed ? "Completed":"complete all Lessons":"Enroll today"}>
      <ImageListItem  >
      
        <img srcSet={value.image}
              src={value.image}
              alt={value.name}
              loading="lazy"
              style={{borderRadius:'5px',minHeight:200}}
              />
            <ImageListItemBar
            title={value.name}
            subtitle={value.instructor.username}
            actionIcon={
              auth.isMycourse(value.instructor._id)?<Button variant="contained" component={Link} to = {`/courses/course/${value._id}`}>view</Button>:
              isEnrolled? value.completed ? (
              
             <IconButton component={Link} to = {`/courses/course/${value._id}`}>
                 <VerifiedUserIcon sx={{color:'yellow'}}/>
             </IconButton>
            
             ):( 
              <IconButton  component={Link} to = {`/courses/course/${value._id}`}>
                <DonutLargeIcon sx={{color:'yellow'}}/>
              </IconButton>
             ) :<Button variant="contained" color="secondary">Enroll</Button> 
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

