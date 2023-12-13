
import { AddAPhotoRounded, Save,} from "@mui/icons-material"
import {  Button,Paper,  Typography, CssBaseline, ListItem, ListItemAvatar, 
 ListItemText, Divider, Card, CardHeader,TextField } from "@mui/material"
import code from "../../assets/code.jpg"
import {map} from "lodash"
import { Link } from "react-router-dom"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useTheme } from "@mui/material"
const dumy = [{title:"Node.js Intro",desc:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt, laboriosam'},
{title:"Node.js Get Started",desc:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt, laboriosam'},
{title:"Node.js Modules",desc:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt, laboriosam'},
{title:"Node.js HTTP Module",desc:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt, laboriosam'},
{title:"Node.js File System",desc:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt, laboriosam'},
{title:"Node.js NPM",desc:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt, laboriosam'},
{title:"Node.js Events",desc:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt, laboriosam'}]









const EditCourse = () => {

  const theme = useTheme();
  const matchs = useMediaQuery(theme.breakpoints.down('sm'))

  return (

   <>

   <Paper component="div" sx={{margin:'1em auto ',padding:4,minHeight:'100vh'}} elevation={0}>
    <CssBaseline/>



    <Card elevation={0} sx={{padding:0,margin:0,minWidth:900}}>
        <CardHeader
            sx={{gap:4}}
            title={
               <>
                <TextField
                 label="Title"
                 value="Getting Started"
                 autoFocus
                fullWidth
                 />
                 <br /><br />
                  <TextField
                 label="Category"
                 value="Software Development"
                fullWidth
                 />
               </>
            }
            subheader={
            <>
            <Typography color="secondary" sx={{paddingBlock:3}}>OsDev</Typography>
            <ListItem >
            <ListItemAvatar sx={{paddingInlineEnd:4}}>
                {/* <Avatar src={code} /> */}
                <img src={code} alt="cool" style={{borderRadius:0,width:300,objectFit:'cover'}}/>
            </ListItemAvatar>
            <ListItemText primary={
                <TextField 
                multiline
                rows={5}
                fullWidth
                label="Description" 
                        value="Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta,
                        quod! Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, quod!"/>
                    
            }

            secondary={
                <Button variant="outlined" endIcon={<AddAPhotoRounded/>} color="secondary" sx={{marginBlock:2}}>Change Photo</Button>
            }
                          />

          </ListItem>
            
            
            </>
            }
            action={
                <>
                    
                    <Button endIcon={<Save/>} color="secondary" variant="contained">Save</Button>
                   
                   
                </>
            }
            />
        
         <Divider/>
    </Card>


   </Paper>
   
   </>
  )
}

export default EditCourse