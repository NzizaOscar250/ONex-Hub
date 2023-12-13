import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { CameraAlt, Close, Save} from "@mui/icons-material"
import { Box, Container, CssBaseline, Stack,Grid,TextField, Toolbar, Switch, FormControlLabel, Button } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
const EditUser = () => {
  return (
    <Container>
      <CssBaseline/>
      <Toolbar/>
    <Box component="form">

         <Box sx={{background:'#747bff'}}>
            <Stack direction="row" rowGap={3} justifyContent="space-between" sx={{p:2,pb:8,pt:3,color:'#fff'}}>
                <IconButton>
                    <Close sx={{color:'#fff'}}/>
                </IconButton>
                <Typography variant="h6">
                    Update Profile
                </Typography>
                <IconButton>
                      <DoneIcon sx={{color:'#fff'}}/>  
                </IconButton>

                
            </Stack>
            
              <Stack direction="column" columnGap={3} justifyContent="center">
                <IconButton sx={{background:'#fff',width:90,height:90,margin:'auto','&:hover':{background:'#fff'}}}>
                    <CameraAlt fontSize='large'/>
                </IconButton>
                <Typography variant="body2" sx={{textAlign:'center',paddingBlock:2,color:'#fff'}}>
                    Choose profile picture
                </Typography>
                
            </Stack>
            <Stack direction="column" alignItems="left" component="div" sx={{color:'#fff',paddingInline:5}}>
                   <Typography  variant='subtitle1'>
                      I&apos;m an Educator
                   </Typography>
                   <FormControlLabel
                      control={<Switch classes={{checked:true,bar:false}} />}
                      label="Yes"/>
                    {/* <Switch/> */}
                </Stack>

         </Box>

        <Box  sx={{paddingBlock:5}}>
     
        <Grid container spacing={2}>
        <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  multiline
                  rows={4}
                  label="About me"
                  name="abou"
                
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                  <Button variant='contained' endIcon={<Save/>}>Save</Button>
              </Grid>
            </Grid>
           

        </Box>
    </Box>
    </Container>
  )
}

export default EditUser