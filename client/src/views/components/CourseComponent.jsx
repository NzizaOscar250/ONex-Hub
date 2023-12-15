import {ImageListItem,ImageListItemBar,IconButton,Button, Tooltip} from "@mui/material"
import DonutLargeIcon from '@mui/icons-material/DonutLarge'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

import {map} from "lodash"
import { Link } from "react-router-dom";
const CourseComponent = ({courses,isEnrolled}) => {
  return (

        <>
         {
        map(courses,(value)=>(
          <Tooltip key={value.title} title={  isEnrolled? value.completed ? "Completed":"complete all Lessons":"Enroll today"}>
          <ImageListItem  >
          
            <img srcSet={value.img}
                  src={value.img}
                  alt={value.title}
                  loading="lazy"
                  style={{borderRadius:'5px'}}
                  />
                <ImageListItemBar
                title={value.title}
                subtitle={value.author}
                actionIcon={
                  isEnrolled? value.completed ? (
                  
                 <IconButton component={Link} to="learn/120">
                     <VerifiedUserIcon sx={{color:'yellow'}}/>
                 </IconButton>
                
                 ):( 
                  <IconButton  component={Link} to="learn/120">
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