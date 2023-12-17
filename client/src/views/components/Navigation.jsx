import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';

import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import {  NavLink,Link, useLocation} from 'react-router-dom';
import LocalLibraryRoundedIcon from '@mui/icons-material/LocalLibraryRounded';
import LocalLibrary from '@mui/icons-material/LocalLibrary';
import {map} from "lodash"
import { Tooltip,Avatar, useTheme, useMediaQuery, Stack, InputBase, alpha} from '@mui/material';
import DropMenu from './DropMenu';
import DrawerNav from './DrawerNav';
import auth from "../../helper/auth.helper.js"
import { Search } from '@mui/icons-material';
import { blue} from '@mui/material/colors';

const drawerWidth = 240;
let navItems = [{name:'Home',to:"/"}
];

function Navigation(props) {
 
  const isAuthorized = auth.isAuthenticated()
  const isEducator = auth.isEducator()
  const [profile,setProfile]=React.useState()
let updatedNavItems = isAuthorized
    ? [...navItems]
    : [
        ...navItems,
        { name: 'Signin', to: '/auth' },
        { name: 'Signup', to: '/auth/signup' },
      ];

 updatedNavItems = isEducator ? [...updatedNavItems,{name:'Teach',to:"courses",icon:<LocalLibrary sx={{fontSize:20}}/>,
 styles:{display:'flex',alignItems:'center',gap:1}}] : [...updatedNavItems]


 const location = useLocation()

 React.useEffect(()=>{
       setProfile(JSON.parse(sessionStorage.getItem('jwt')))
      
       window.scrollTo({
        top:0,
        left:0,
        behavior: 'smooth'
       })
       
 },[location])


 const { window: Window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Link to="/" sx={{ my: 2,textDecoration:'none',color:"#555" }}>
        ONeXHub
      </Link>
      <Divider />
      <List>
        {map(navItems, (item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = Window !== undefined ? () => Window().document.body : undefined;
  const theme = useTheme()

  const matchs = useMediaQuery(theme.breakpoints.up("md"))
  return (
    <>
    <Box >
      <CssBaseline />
      <AppBar  component="nav"  sx={{zIndex:matchs?2000:1000}}
      elevation={0}
      >

        <Toolbar  sx={{background:blue[400],justifyContent:'space-evenly'}}>
         <Box>
         <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' },alignItems:'center',gap:2, }}
          >
            <Link to="/" style={{color:"#fff",display:'flex' ,alignItems:'center',gap:8,fontSize:22}}>ONeXHub
            <LocalLibraryRoundedIcon/>
            </Link>
          </Typography>
         </Box>
          <Box sx={{flex:1}}>
          {/* borderRadius:theme.shape.borderRadius,
        backgroundColor:alpha(theme.palette.common.white,0.15), */}
             <Stack direction="row" sx={{width:'60%',m:'auto',
             background:alpha(theme.palette.common.white,0.67),
             display:'flex',
             paddingInline:1,borderRadius:theme.shape.borderRadius}}>
               <InputBase placeholder='search courses.........' sx={{flex:1}}/>
               <IconButton>
                <Search/>
               </IconButton>
             </Stack>
          </Box>
          <Box sx={{ display: { xs: 'none', sm: 'flex' },gap:3,alignItems:'center' }}>

            {
                map(updatedNavItems ,(value)=><NavLink to={value.to} key={value.name}  style={{color:"#fff"}}><span> {value?.icon}</span> <span>{value.name}</span> </NavLink>)
            }
            <NavLink to="/soon" style={{color:"#fff"}}>Docs</NavLink>
            <NavLink to="/soon" style={{color:"#fff"}}>FAQs</NavLink>
            <NavLink to="/soon" style={{color:"#fff"}}>About</NavLink>
           <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32,background:'#555' }}>
                {
                  profile?.user.username[0]
                }
            </Avatar>
          </IconButton>
        </Tooltip>
               <DropMenu anchorEl={anchorEl} handleClose={handleClose} open={open} profile={profile}/> 
          </Box>
          
        </Toolbar>
      </AppBar>
      {/* drawer */}

      <DrawerNav  drawer={drawer}
       drawerWidth={drawerWidth}
        container={container}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        />
    
</Box>

</>
)}

export default Navigation