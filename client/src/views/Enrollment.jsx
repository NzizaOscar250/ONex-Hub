import { ImageList,ImageListItem,ListSubheader, Typography } from "@mui/material"
import useMediaQuery from "@mui/material/useMediaQuery";
import {alpha, useTheme} from "@mui/material/styles"
import code from "../assets/code.jpg"
import technology from "../assets/technology.jpg"

import CourseComponent from "./components/CourseComponent";
import { blue, indigo } from "@mui/material/colors";
const itemData = [
  {
    img: code,
    title: 'PHP',
    author: 'Learn Php',
    rows: 2,
    cols: 2,
    featured: true,
    completed:false,
  },
  {
    img: code,
    title: 'Node js',
    author: 'Learn Nodejs',
    completed:true
  },
  {
    img: technology,
    title: 'MongoDb',
    author: 'Learn Mongo',
    completed:false

  },
  {
    img: code,
    title: 'English',
    author: 'Learn English',
    cols: 2,
    completed:true
  },
  {
    img:technology,
    title: 'Communication Skills',
    author:'Learn Soft',
    cols: 2,
    completed:true
  },
  
];
const Enrollment = () => {
  const theme = useTheme()
  const matchDownMd = useMediaQuery(theme.breakpoints.down('sm'));
  console.log(matchDownMd)
  return (
    <>
      <ImageList  sx={{background:'grey',p:0,m:0}} cols={matchDownMd? 2 : 5} >
        <ImageListItem key="subheader"  cols={matchDownMd? 2 : 5}>
          <ListSubheader component="div" sx={{background:blue[100],paddingBlock:2}}>
            <Typography variant="h6" sx={{color:'#555'}}>Courses You are Enrolled In</Typography>
          </ListSubheader>
        </ImageListItem>
      
       <CourseComponent courses={itemData} isEnrolled={true}/>

</ImageList>
    </>
  )
}

export default Enrollment