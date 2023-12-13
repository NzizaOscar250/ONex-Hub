import { AddAPhoto, Save } from "@mui/icons-material"
import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material"

const NewCourse = () => {
   
  return (
   <>
   <Box component="form" noValidate sx={{width:500,margin:'auto'}}>
    <Grid  container gap={3}>
    <Grid item xs={12} >

        <Stack direction="column">
            <Typography variant="h5" color="text.secondary" 
            sx={{textAlign:'center',paddingBlock:5}}>
                New Course
            </Typography>
             <Button endIcon={<AddAPhoto/>} disableElevation variant="contained" color="secondary">Upload Photo</Button>
    
        </Stack>
    </Grid>
    <Grid item xs={12}>
        <TextField 
       
         label="Name*"
         name="coursename"
         type="text"
         fullWidth
         />
    </Grid>

    <Grid item xs={12}>
        <TextField 
           
            label="Description"
            multiline
            rows={2}
            name="courseDesc"
            fullWidth
            />
        
    </Grid>

    <Grid item xs={12}>
        <TextField
           
            label="Category"
            name="category"
            type="text"
            fullWidth
            />
    </Grid>
    <Grid item xs={12}>
        <Button variant="contained" endIcon={<Save/>}>Save</Button>
    </Grid>


   </Grid>

      
    
   </Box>
   </>
  )
}

export default NewCourse