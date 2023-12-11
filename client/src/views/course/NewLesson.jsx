import { AddAPhoto, Save } from "@mui/icons-material"
import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material"
import MyEditor from "../components/MyEditor"

const NewLesson = () => {
   
  return (
   <Box component="form" noValidate sx={{width:500,margin:'auto'}}>
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
         name="coursename"
         type="text"
         fullWidth
         />
    </Grid>

    <Grid item xs={12}>
        <TextField 
           
            label="Content"
            multiline
            rows={5}
            name="courseDesc"
            fullWidth
            />
        
    </Grid>

    <Grid item xs={12}>
        <TextField
           
            label="Resource Link"
            name="Link"
            type="text"
            fullWidth
            />
    </Grid>
    <Grid item xs={12}>
        <Button variant="contained" endIcon={<Save/>}>Save</Button>
    </Grid>


   </Grid>
   </Box>
  )
}

export default NewLesson