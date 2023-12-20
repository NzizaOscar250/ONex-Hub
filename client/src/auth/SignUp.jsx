
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { signUp } from '../actions/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { fireNotify } from '../actions/notifications';
import { Link } from 'react-router-dom';
import { Paper } from '@mui/material';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
   All right reserved    {'Copyright © '} by 
      <Link color="inherit" href="" sx={{px:0.5}}>
         OsDev
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {

  const [data,setData] = useState({email:'',password:'',fname:'',lname:'',username:''})
  const dispatch = useDispatch()
const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault();
     dispatch(signUp({...data},fireNotify("Processing...!"),navigate))
  };

  const handleChange = (name)=>e=>{
    setData({...data,[name]:e.target.value})
  }


  return (
    <ThemeProvider theme={defaultTheme}>
      <Paper component="main" elevation={0}  sx={{margin:'2em auto ',width:500,paddingInline:5,background:'rgba(235, 235, 235, 0.25)'}}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form onSubmit={handleSubmit} style={{ marginBlockStart: '2em' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  color='secondary'
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={data.fname}
                  onChange={handleChange('fname')}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  color='secondary'
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  value={data.lname}
                  onChange={handleChange('lname')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
              <TextField
                  required
                  fullWidth
                  color='secondary'
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  value={data.username}
                  onChange={handleChange('username')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  color='secondary'
                  type='email'
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={data.email}
                  onChange={handleChange('email')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  
                  color='secondary'
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={data.password}
                  onChange={handleChange('password')}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, new demanding courses,eBooks and updates via email."
                  
                />
              </Grid>
            </Grid>
            <Button
            
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="secondary"
              type="submit"
              disableElevation
            >
             Sign Up

            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/auth" style={{textDecoration:'underline',color:'dodgerblue'}} >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Paper>
    </ThemeProvider>
  );
}
