
import { AddAPhotoRounded, Save,} from "@mui/icons-material"
import {  Button,Paper,  Typography, CssBaseline, ListItem, ListItemAvatar, 
 ListItemText, Divider, Card, CardHeader,TextField } from "@mui/material"

import { useParams } from "react-router-dom"
// import useMediaQuery from "@mui/material/useMediaQuery"
// import { useTheme } from "@mui/material"
import { useEffect, useState,useRef } from "react"
import { useSelector ,useDispatch} from "react-redux"
import { updateCourse } from "../../actions/courses"
import { toast } from "react-toastify"



const EditCourse = () => {

    const params = useParams()
    const [course,setCourse] = useState({name:'',description:'',category:'',published:'',image:''})
    const myCourse = useSelector((state)=>state.published).find((course)=>course._id == params.courseId)
    const fileInputRef = useRef(null);
    const dispatch = useDispatch()
    

    const handleChange = (name)=>event=>{
      setCourse({...course,[name]:event.target.value})

    }

    const handleFileChange = (event) => {
      const file = event.target.files[0];

    
      if (file) {
        const reader = new FileReader();
    
        reader.onloadend = () => {
          // `reader.result` contains the base64-encoded file data
           setCourse({...course,image:reader.result})
        };
    
        // Read the file as a data URL
        reader.readAsDataURL(file);
      }
    };
    
    const handleHiddenInputClick = () => {
      fileInputRef.current.click();
    };
  
  const handleUpdate = ()=>{
     const data = {
        name:course.name,
        image:course.image,
        description: course.description,
        published:course.published,
        courseId:course._id || undefined
     }

      dispatch(updateCourse(data,toast.info("Updating..."),data.courseId))
    
  }


    useEffect(() => {
      setCourse({...myCourse})
       
    }, [myCourse])

   
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
                 value={course?.name}
                 autoFocus
                fullWidth
                onChange = {handleChange('name')}
                 />
                 <br /><br />
                  <TextField
                 label="Category"
                 value={course.category}
                fullWidth
                onChange={handleChange('category')}
                 />
                
               </>
            }
            subheader={
            <>
            <Typography color="secondary" sx={{paddingBlock:3}}>
                {
                    course?.instructor?.username
                }
            </Typography>
            <ListItem >
            <ListItemAvatar sx={{paddingInlineEnd:4}}>
                {/* <Avatar src={code} /> */}
                <img src={course?.image} alt="cool" style={{borderRadius:0,width:300,objectFit:'cover'}}/>
            </ListItemAvatar>
            <ListItemText primary={

                <TextField 
                multiline
                rows={5}
                fullWidth
                label="Description" 
                value={course.description}
                onChange={handleChange('description')}
                />
                    
            }

            secondary={
       <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
   
                <Button variant="outlined" endIcon={<AddAPhotoRounded/>}
                 color="secondary" 
                sx={{marginBlock:2}}
                onClick={handleHiddenInputClick}
                >Change Photo</Button>
</>
              }
                          />

          </ListItem>
            
            
            </>
            }
            action={
                <>
                    
                    <Button endIcon={<Save/>} color="secondary" variant="contained" onClick={()=> handleUpdate()}>Save</Button>
                   
                   
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