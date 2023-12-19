import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { CameraAlt, Close, Save} from "@mui/icons-material"
import { Box, Container, CssBaseline, Stack,Grid,TextField,Avatar, Toolbar, Switch, FormControlLabel, Button, CircularProgress } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import { useEffect, useRef,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  updateUser } from '../../actions/auth';
import { toast } from 'react-toastify';
import auth from "../../helper/auth.helper.js"
const EditUser = () => {


  const info = useSelector((state)=>state.auth.userInfo)
  const fileInputRef = useRef()
  const [data,setData] = useState({
    educator:'',
    profile:'',
    about:'',
    firstname:'',
    lastname:'', 
    username:'',
    email:'',...info})

const dispatch =useDispatch()
  const handleChange = (name)=>event=>{
    setData({...data,[name]:event.target.value})

  }
// handle submit

  const handleSubmit =  (e)=>{
    e.preventDefault ()
    if(auth.userInfo()){
      let userId = auth.userInfo()
       dispatch(updateUser({...data,userId:userId},toast.info("Updating...")))
    }
    else{
      toast.error("please login")
    }
  
    
  }
  const handleCheck = (event, checked) => {
    console.log(checked)
    setData({...data, 'educator': checked})
   }
   
//  handle change
  const handleFileChange = (event) => {
    const file = event.target.files[0];

  
    if (file) {
      const reader = new FileReader();
  
      reader.onloadend = () => {
        // `reader.result` contains the base64-encoded file data
         setData({...data,profile:reader.result})
      };
  
      // Read the file as a data URL
      reader.readAsDataURL(file);
    }
  };
  
  const handleHiddenInputClick = () => {
    fileInputRef.current.click();
  };

  
useEffect(()=>{
  setData({...data,...info})
},[info])


    if(!info) return <CircularProgress/>

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
                <input type='file' style={{display:'none'}} ref={fileInputRef} onChange={handleFileChange} />
                {
              data.profile ? <Avatar sx={{width:90,height:90,margin:'auto',cursor:'pointer',objectFit:'cover'}} src={data.profile}  onClick={handleHiddenInputClick}/> :
                      <IconButton onClick={handleHiddenInputClick} sx={{background:'#fff',width:90,height:90,margin:'auto','&:hover':{background:'#fff'}}}>
                        <CameraAlt fontSize='large'/>
                    </IconButton>
                
                }
                <Typography variant="body2" sx={{textAlign:'center',paddingBlock:2,color:'#fff'}}>
                    Choose profile picture
                </Typography>
                
            </Stack>
            <Stack direction="column" alignItems="left" component="div" sx={{color:'#fff',paddingInline:5}}>
                   <Typography  variant='subtitle1'>
                      I&apos;m an Educator
                   </Typography>
                   <FormControlLabel
                      control={<Switch classes={{checked:true,bar:false}} onChange={handleCheck}/>}
                      label={data.educator? 'Yes' : 'No'}/>
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
                  name="about"
                  value={data.about}
                  onChange={handleChange('about')}
                
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
             
                  label="First Name"
                
                  value={data.firstname}
                  onChange={handleChange('firstname')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  value={data.lastname}
                  onChange={handleChange('lastname')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Username*"
                  value={data.username}
                  onChange={handleChange('username')}

                />
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Email Address"
                  name="email"
                  value={data.email}
                  onChange={handleChange('email')}

                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="New Password"
                  type="password"
                  
                />
              </Grid>
              <Grid item xs={12}>
                  <Button variant='contained' endIcon={<Save/>} onClick={handleSubmit}>Save</Button>
              </Grid>
            </Grid>
           

        </Box>
    </Box>
    </Container>
  )
}

export default EditUser