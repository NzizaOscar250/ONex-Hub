
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useState} from "react"
import {signIn} from "../actions/auth"
import { useDispatch } from 'react-redux'
import { fireNotify } from '../actions/notifications';
import { useSelector } from 'react-redux';
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
   All right reserved    {'Copyright © '} by 
      <Link color="inherit" to="/" sx={{px:0.5}}>
         OsDev
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();


export default function SignIn() {

  const [data,setData] = useState({email:'',password:'',rememberme:false})
  const dispatch = useDispatch()
const navigate = useNavigate()
  const handleSubmit = (event) => {
    event.preventDefault();
    
     dispatch(signIn({...data},fireNotify("Authenticating...!"),navigate))
  };

  const handleChange = (name)=>e=>{
    setData({...data,[name]:e.target.value})
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form onSubmit={handleSubmit}  style={{ marginBlockStart: 1 }}>
            <TextField
              margin="normal"
              type="email"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus

              value={data.name}
              onChange={handleChange('email')}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
           
              autoComplete="current-password"
              value={data.password}
              onChange={handleChange('password')}
            />
            <FormControlLabel
              control={<Checkbox   color="primary" onChange={handleChange('rememberme')} value={data.rememberme} />}
              label="Remember me"
            />
            <Button
              
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              type="submit"
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="" >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
              Don&apos;t have an account? 
                <Link to="/auth/signup" >
                  {"Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
