import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import {  NavLink,useNavigate,Link } from 'react-router-dom';
import LocalLibraryRoundedIcon from '@mui/icons-material/LocalLibraryRounded';
import LocalLibrary from '@mui/icons-material/LocalLibrary';
import {map} from "lodash"
import { Tooltip,Avatar, useTheme, useMediaQuery} from '@mui/material';
import DropMenu from './DropMenu';
import DrawerNav from './DrawerNav';

const drawerWidth = 240;
const navItems = [{name:'Home',to:"/"},
{name:'Teach',to:"courses",icon:<LocalLibrary sx={{fontSize:20}}/>,
styles:{display:'flex',alignItems:'center',gap:1}},
{name:'Signin',to:"/auth"},{name:'Signup',to:"/auth/signup"}];

function Navigation(props) {
  const { window } = props;
 
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
    },[navigate])

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        StarClassRoom
      </Typography>
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

  const container = window !== undefined ? () => window().document.body : undefined;
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
            StarClassRoom
            <LocalLibraryRoundedIcon/>
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'flex' },gap:3,alignItems:'center' }}>

            {
                map(navItems,(value)=><NavLink to={value.to} key={value.name} className="nav"><span> {value?.icon}</span> <span>{value.name}</span> </NavLink>)
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