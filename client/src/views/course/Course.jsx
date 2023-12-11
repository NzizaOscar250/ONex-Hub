
import { AddBoxOutlined, AddBusiness,Delete, Edit, Save,} from "@mui/icons-material"
import {  Button,Paper, Stack, Typography, CssBaseline, List, ListItem, ListItemAvatar, 
 ListItemText, Divider, Card, CardHeader, IconButton, Avatar, Dialog, 
 DialogTitle,
 DialogActions, DialogContent,
  DialogContentText,  
  ListItemSecondaryAction} from "@mui/material"
import code from "../../assets/code.jpg"
import {map} from "lodash"
import { Link } from "react-router-dom"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useTheme } from "@mui/material"
import { useState } from "react"
const dumy = [{title:"Node.js Intro",desc:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt, laboriosam'},
{title:"Node.js Get Started",desc:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt, laboriosam'},
{title:"Node.js Modules",desc:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt, laboriosam'},
{title:"Node.js HTTP Module",desc:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt, laboriosam'},
{title:"Node.js File System",desc:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt, laboriosam'},
{title:"Node.js NPM",desc:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt, laboriosam'},
{title:"Node.js Events",desc:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt, laboriosam'}]









const Course = () => {

  const theme = useTheme();
  const matchs = useMediaQuery(theme.breakpoints.down('sm'))
   const [open,setOpen] = useState()

   const onShowConfirm = () => {
    setOpen(true);
    };
    const onConfirm = () => {
    setOpen(false);
    };

  return (

   <>

<Dialog open={open}>
            <DialogTitle color="primary">Publish Course</DialogTitle>

            <DialogContent>
                <DialogContentText sx={{paddingBlockEnd:4}}>
                <Typography variant="body1">
                Publishing your course will make it live to students
                for enrollment.
                </Typography>
                <Typography variant="body1">
                    Make sure all lessons are added and ready for publishing.
                    </Typography>
                    
                </DialogContentText>
                <Divider/>
                <DialogActions>
                    <Button variant="contained" color="secondary" onClick={onConfirm}>Cancel</Button>
                    <Button variant="contained" onClick={onConfirm}>Publish</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>

   <Paper component="div" sx={{margin:'1em auto ',padding:4,minHeight:'100vh'}} elevation={0}>
    <CssBaseline/>



    <Card elevation={0} sx={{padding:0,margin:0}}>
        <CardHeader
            title="Node js"
            subheader="By Oscar Dev"
            action={
                <>
                    <IconButton color="secondary" component={Link} to="edit"><Edit/></IconButton>
                    <Button endIcon={<Save/>} color="secondary" variant="contained" onClick={onShowConfirm}>Publish</Button>
                    <IconButton color="secondary"><Delete/></IconButton>
                    <Button startIcon={<AddBusiness/>} color="primary" variant="contained" >Enroll</Button>
                </>
            }
            />
        <ListItem sx={{alignItems:'start'}}>
            <ListItemAvatar sx={{paddingInlineEnd:4}}>
                {/* <Avatar src={code} /> */}
                <img src={code} alt="cool" style={{borderRadius:0,width:300,
                    height:200,objectFit:'cover'}}/>
            </ListItemAvatar>
            <ListItemText primary={<Typography variant="h5" color="text.secondary">Node js</Typography>}
                          secondary="Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta,
                           quod! Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, quod!"/>
            <ListItemSecondaryAction>
                <Button variant="outlined">Enroll</Button>
            </ListItemSecondaryAction>
          </ListItem>
         <Divider/>
    </Card>


<br/>

      <CardHeader 
            title={<>
             <Typography variant="h5" color="secondary">Lessons</Typography>
            </>}
            subheader={
                <Typography variant="body2" color="text.secondary">5 Lessons</Typography>
            }
            action={
                <>
                <Button startIcon={<AddBoxOutlined/>} 
            variant="contained" 
            color="secondary" 
            component={Link}
            to="newlesson"
            sx={{alignSelf:'start'}}>New Lesson</Button>
                </>
            }/>

      <List sx={{paddingBlockStart:10}}>
       {
        map(dumy,(value,index)=>(
          <Link to="/learn/enrollmentId" key={index}>
          <ListItem >
            <ListItemAvatar sx={{paddingInlineEnd:4}}>
                {/* <Avatar src={code} /> */}
             <Avatar>{index+1}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={<Typography variant="h6">{value.title}</Typography>}
                          secondary="Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta,
                           quod! Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, quod!"/>
                       
          </ListItem>
          <Divider variant="inset" component="li"/> 
          </Link>

        ))
       }
          
      </List>
   </Paper>
   
   </>
  )
}

export default Course