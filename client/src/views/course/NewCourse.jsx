import { AddAPhoto, Save } from "@mui/icons-material"
import { Box, Button, Grid, Paper, Stack, TextField, Typography } from "@mui/material"
import { useState,useRef } from "react"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { createCourse } from "../../actions/courses"
const NewCourse = () => {
   
   const [course,setCourse] = useState({name:'',description:'',category:'',image:''})
   const fileInputRef = useRef()
   const dispatch = useDispatch()
   const handleChange = (name)=>(event)=>{
    setCourse({...course,[name]:event.target.value})
   }

   const handleSubmit=(e)=>{
    e.preventDefault()
      if (!course.image){
        toast.error("Image is required")
      }
      else{
         dispatch(createCourse(course,toast.info("Creating course...")))
         setCourse({name:'',description:'',category:'',image:''})
      }
    console.log(course)
   }

   const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // `reader.result` contains the base64-encoded file data
         setCourse({...course,image:reader.result})
      };

      reader.readAsDataURL(file);
    }
  };
  
  const handleHiddenInputClick = () => {
    fileInputRef.current.click();
  };


    



  return (
   <form onSubmit={handleSubmit}>
   <Box component="div"  sx={{width:500,margin:'auto'}}>
    <Grid  container gap={3}>
    <Grid item xs={12} >

        <Stack direction="column">
            <Typography variant="h5" color="text.secondary" 
            sx={{textAlign:'center',paddingBlock:5}}>
                New Course
            </Typography>
            <div>
                <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{display:'none'}}/>
            </div>
             <Button endIcon={<AddAPhoto/>} onClick={handleHiddenInputClick} disableElevation variant="contained" color="secondary">Upload Photo</Button>
            {
              course.image &&  <Paper elevation={0} sx={{py:2}}>
                <img src={course.image} style={{width:200,height:200, objectFit:'cover'}} />
            </Paper>}
        </Stack>
    </Grid>
    <Grid item xs={12}>
        <TextField 
         label="Name"
         name="coursename"
         type="text"
         required
         fullWidth
         value={course.name}
         onChange={handleChange('name')}
    
         />
    </Grid>

    <Grid item xs={12}>
        <TextField 
           
            label="Description"
            multiline
            rows={2}
            name="courseDesc"
            fullWidth
            required
            value={course.description}
            onChange={handleChange('description')}
            />
        
    </Grid>

    <Grid item xs={12}>
        <TextField
            label="Category"
            name="category"
            type="text"
            required
            fullWidth
            value={course.category}
            onChange={handleChange('category')}

            />
    </Grid>
    
    <Grid item xs={12}>
        <Button variant="contained" type="submit" endIcon={<Save/>}>Save</Button>
    </Grid>


   </Grid>

      
    
   </Box>
   </form>
  )
}

export default NewCourse