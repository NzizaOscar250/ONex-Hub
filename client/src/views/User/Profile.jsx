
import Typography from '@mui/material/Typography';
import { Edit, Save} from "@mui/icons-material"
import { Box, Container, CssBaseline, Stack,Grid,TextField, Toolbar, Switch, FormControlLabel, Button, Avatar } from '@mui/material';
import { Link,  } from 'react-router-dom';
const Profile = () => {
  return (
    <Container>
      <CssBaseline/>
      <Toolbar/>
    <Box component="form">

         <Box sx={{background:'#747bff',paddingInline:2,}}>
            <Stack direction="row" rowGap={3} justifyContent="space-between" sx={{pb:8,pt:3,color:'#fff'}}>
                <Typography variant="h6">
                    My Profile
                </Typography>
                <Link to="/profile/edit" >
                      <Edit sx={{color:'#fff'}}/>  
                </Link>

                
            </Stack>
            
              <Stack direction="column" columnGap={3} justifyContent="center">
                <Avatar/>
                <Typography variant='title'>Nziza Oscar</Typography>
                <Typography variant='subtitle'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae, obcaecati.</Typography>
                    {/* <CameraAlt fontSize='large'/> */}

              
                
                
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

export default Profile