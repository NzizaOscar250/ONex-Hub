
import {MenuItem,Menu,ListItemIcon,Avatar,Divider, Typography} from '@mui/material';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import auth from "../../helper/auth.helper.js"
import { Link,  useNavigate, } from 'react-router-dom';
import { Book, MenuBook, Person } from '@mui/icons-material';
import { Error } from '../../actions/notifications.js';
const DropMenu = ({anchorEl,handleClose,open,profile}) => {
const navigate = useNavigate()
  return (
    <>
    <Menu
        anchorEl={anchorEl || null}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}

       
          elevation={0} 
          sx={{
            overflow: 'visible',
        
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          }}

        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      > 
    
        <MenuItem >
        <ListItemIcon>
            <Person fontSize="small" />
          </ListItemIcon>
         <Link to="/profile" style={{color:"#555"}}>My account</Link>
        </MenuItem>
        
        <Divider />
        <MenuItem onClick={()=>{
          if(!auth.isEducator()) return Error("Update profile to be an educator")
          handleClose()
          navigate("/courses/new")
          }}>
           <ListItemIcon>
            <MenuBook sx={{fontSize:20}}/>
          </ListItemIcon>
          Add course
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={()=>{
           auth.clearJWT(()=>navigate("/auth"))
          handleClose()
          }}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
          </Menu>
    </>
  )
}

export default DropMenu