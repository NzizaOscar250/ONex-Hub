import { Save } from "@mui/icons-material"
import { Button, Grid, Stack, TextField, Typography } from "@mui/material"
import {toast} from "react-toastify"
import {useState} from "react"
import { useDispatch } from "react-redux"
import { addLessons } from "../../actions/courses"
import { useParams } from "react-router-dom"
const NewLesson = () => {
const {courseId} = useParams()
const [data,setData]= useState({title:'',content:'',resource_link:'#',id:courseId})
const dispatch = useDispatch()

console.log(courseId)
const handelSubmit =(e)=>{
    e.preventDefault()
   dispatch(addLessons(data,toast.info(`Adding ${data.title}....`,{toastId:'info'})))

    console.log(data)
} 

const handleChange=(name)=>event=>{
    setData({...data,[name]:event.target.value})
}





  return (
   <form style={{width:500,margin:'auto'}} onSubmit={handelSubmit}>
    <Grid  container gap={3}>
    <Grid item xs={12} >

        <Stack direction="column">
            <Typography variant="h5" color="text.secondary" 
            sx={{textAlign:'center',paddingBlock:5}}>
               New Lesson
            </Typography>
           
        </Stack>
    </Grid>
    {/* <Grid item xs={12}>
        <MyEditor/>
    </Grid> */}
    <Grid item xs={12}>
        <TextField 
       
         label="Title"
         type="text"
         required
         fullWidth
         value={data.title}
         onChange={handleChange('title')}
         />
    </Grid>

    <Grid item xs={12}>
        <TextField 
           
            label="Content"
            multiline
            required
            rows={5}
            name="courseDesc"
            fullWidth
            value={data.content}
            onChange={handleChange('content')}
            />
        
    </Grid>

    <Grid item xs={12}>
        <TextField
           
            label="Resource Link"
            name="Link"
            type="text"
            fullWidth
            value={data.resource_link}
            onChange={handleChange('resource_link')}
            />
    </Grid>
    <Grid item xs={12}>
        <Button variant="contained" endIcon={<Save/>} type="submit">Save</Button>
    </Grid>


   </Grid>
   </form>
  )
}

export default NewLesson