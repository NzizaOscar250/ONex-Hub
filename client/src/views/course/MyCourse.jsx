import {  AddBoxOutlined } from "@mui/icons-material"
import { Button,Paper,Stack, Typography, CssBaseline, List, ListItem, ListItemAvatar,
  ListItemText, Divider } from "@mui/material"
import code from "../../assets/code.jpg"
import {map} from "lodash"
import { Link } from "react-router-dom"
// import useMediaQuery from "@mui/material/useMediaQuery"
// import { useTheme } from "@mui/material"
const dumy = [1,2,3,4,5,6,7,8]
const MyCourse = () => {

  // const theme = useTheme();
  // const matchs = useMediaQuery(theme.breakpoints.down('sm'))

  return (

   <>
   
   <Paper component="div" sx={{margin:'1em auto ',padding:4,minHeight:'100vh'}} elevation={6}>
    <CssBaseline/>
      <Stack direction="row" justifyContent="space-between">
            <Typography variant="h5" color="secondary">Your Courses</Typography>
            <Button startIcon={<AddBoxOutlined/>} 
             variant="contained" 
             color="primary"
             sx={{alignSelf:'start'}}
            disableElevation
              component={Link}
              to="new"
             >New Course</Button>
      </Stack>
      <List sx={{paddingBlockStart:10}}>
       {
        map(dumy,(value,i)=>(

          <Link to={`course/${i}`} key={value}>
          <ListItem sx={{alignItems:'start'}}>
            <ListItemAvatar sx={{paddingInlineEnd:4}}>
                {/* <Avatar src={code} /> */}
                <img src={code} alt="cool" style={{borderRadius:0,width:200,height:120,objectFit:'cover'}}/>
            </ListItemAvatar>
            <ListItemText primary="Node js"
                          secondary="Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta,
                           quod! Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, quod!"/>
                          
          </ListItem>
            <Divider/>
          </Link>

        ))
       }
          
      </List>
   </Paper>
   
   </>
  )
}

export default MyCourse