import { ImageList,ImageListItem,ListSubheader, Typography } from "@mui/material"
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@mui/material/styles"
import CourseComponent from "./components/CourseComponent";
import code from "../assets/code.jpg"
import technology from "../assets/technology.jpg"
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
const Courses = () => {
  const theme = useTheme()
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  console.log(matchDownMd)
  return (

      <ImageList  sx={{p:0,m:0,gap:4}} gap={5} cols={matchDownMd? 2 : 4} >
        <ImageListItem key="subheader"  cols={matchDownMd? 2 : 4}>
          <ListSubheader component="div" sx={{paddingBlock:2}}>
            <Typography variant="h6" >All Courses</Typography>
          </ListSubheader>
        </ImageListItem>
      
        <CourseComponent courses={itemData} isEnrolled={false}/>  
    

</ImageList>

  )
}

export default Courses