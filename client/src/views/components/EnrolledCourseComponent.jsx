import {ImageListItem,ImageListItemBar,IconButton,} from "@mui/material"
import DonutLargeIcon from '@mui/icons-material/DonutLarge'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

const EnrolledCourseComponent = ({courses}) => {
    return (

        <>
         {
        map(courses,(value)=>(
          <ImageListItem key={value.title} >
            <img srcSet={value.img}
                  src={value.img}
                  alt={value.title}
                  loading="lazy"/>
                <ImageListItemBar
                title={value.title}
                subtitle={value.author}
                actionIcon={
                 value.completed ? (
                 <IconButton>
                     <VerifiedUserIcon sx={{color:'yellow'}}/>
                 </IconButton>
                 ):( 
                  <IconButton >
                    <DonutLargeIcon sx={{color:'yellow'}}/>
                  </IconButton>
                 )
                }
                />
          </ImageListItem>
        ))

        
      }
        </>
  )
}

export default EnrolledCourseComponent