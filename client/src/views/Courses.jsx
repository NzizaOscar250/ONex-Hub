import { ImageList,ImageListItem,ListSubheader, Typography } from "@mui/material"
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@mui/material/styles"
import CourseComponent from "./components/CourseComponent";

const Courses = ({published}) => {
  const theme = useTheme()
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
 
  return (

      <ImageList  sx={{p:0,m:0,gap:4}} gap={5} cols={matchDownMd? 2 : 4} >
        <ImageListItem key="subheader"  cols={matchDownMd? 2 : 4}>
          <ListSubheader component="div" sx={{paddingBlock:2}}>
            <Typography variant="h6" >All Courses</Typography>
          </ListSubheader>
        </ImageListItem>
      
        <CourseComponent published={published}/>  
    

</ImageList>

  )
}

export default Courses