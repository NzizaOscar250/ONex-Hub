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

import {  NavLink,useNavigate ,Link} from 'react-router-dom';
import LocalLibraryRoundedIcon from '@mui/icons-material/LocalLibraryRounded';
import LocalLibrary from '@mui/icons-material/LocalLibrary';
import {map} from "lodash"
import { Tooltip,Avatar, useTheme, useMediaQuery} from '@mui/material';
import DropMenu from './DropMenu';
import DrawerNav from './DrawerNav';
import auth from "../../helper/auth.helper.js"

const drawerWidth = 240;
let navItems = [{name:'Home',to:"/"},
{name:'Teach',to:"courses",icon:<LocalLibrary sx={{fontSize:20}}/>,
styles:{display:'flex',alignItems:'center',gap:1}}];

function Navigation(props) {
 
  const isAuthorized = auth.isAuthenticated()

 const updatedNavItems = isAuthorized
    ? [...navItems]
    : [
        ...navItems,
        { name: 'Signin', to: '/auth' },
        { name: 'Signup', to: '/auth/signup' },
      ];

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
  const navigate = useNavigate ();

  React.useEffect(()=>{
        handleClose()
        window.scrollTo({
          top:0,
          left:0,
          behavior: 'smooth'
         })
    },[navigate])

    

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
        <Toolbar>
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
          <Box sx={{ display: { xs: 'none', sm: 'flex' },gap:3,alignItems:'center' }}>

            {
                map(updatedNavItems ,(value)=><NavLink to={value.to} key={value.name} className="nav"><span> {value?.icon}</span> <span>{value.name}</span> </NavLink>)
            }
           <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>O</Avatar>
          </IconButton>
        </Tooltip>
               <DropMenu anchorEl={anchorEl} handleClose={handleClose} open={open}/> 
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