import { Paper, Toolbar, Typography,Link } from "@mui/material"
import notfound from "../assets/404.svg"
const NotFound = () => {
  return (
    <Paper sx={{paddingInline:5}}>
      <Toolbar/>
      <Typography >
          Back to <Link href="/" sx={{textDecoration:'underlined'}} color="primary">Home</Link>
      </Typography>
      
        <img src={notfound} alt="not found"/>
        
    </Paper>
  )
}

export default NotFound