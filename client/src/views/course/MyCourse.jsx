import {  AddBoxOutlined } from "@mui/icons-material"
import { Button,Paper,Stack, Typography, CssBaseline, List, ListItem, ListItemAvatar,
  ListItemText, Divider, CircularProgress } from "@mui/material"
import {map} from "lodash"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { blue } from "@mui/material/colors"

const MyCourse = () => {
   const courses = useSelector((state)=>state.mycourses)
    


   if(!courses) return <div style={{width:'200px',margin:'auto',padding:20,minHeight:'100vh',display:'flex',justifyContent:'center',alignItems:'center',gap:5}}><CircularProgress size={15} /> Loading...</div>
  

  return (

   <>
   
   <Paper component="div" sx={{margin:'1em auto ',padding:4,minHeight:'100vh'}} elevation={0}>
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
      <List sx={{paddingBlockStart:10,width:"90%"}}>
       {
     courses.length == 0 ?<Typography>You don't have any course yet!! </Typography> :  map(courses,(value,i)=>(

          
        <Stack direction="row" justifyContent="start" key={i} > 
            <Link to={`course/${value._id}`}  style={{color:blue[500],display:'block'}}> 
          <ListItem sx={{width:'100%'}}>
            <ListItemAvatar sx={{paddingInlineEnd:4}}>
                {/* <Avatar src={code} /> */}
                <img src={value.image} alt="cool" style={{borderRadius:0,width:'100%',height:120,objectFit:'cover'}}/>
            
            </ListItemAvatar>
            <ListItemText primary={<Typography variant="body1" sx={{py:1}}>{value.name}</Typography>}
              secondary={value.description}/>
           
          </ListItem>
          
            <Divider/>
          </Link>
          {/* <Typography variant="body2" sx={{alignSelf:'start',px:2}}>
          <Info color="secondary"/>
            {
              value.published?"Published": value.lessons.length ? "Publish" : "Add lesson to publish"
            }
          </Typography>
           */}
          </Stack>

        ))
       }
          
      </List>
   </Paper>
   
   </>
  )
}

export default MyCourse