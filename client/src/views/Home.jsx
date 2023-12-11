import Enrollment from "./Enrollment"
import Courses from "./Courses"
import { Paper } from "@mui/material"
const Home = () => {
  return (
    <Paper sx={{paddingBlock:5,paddingInline:1,pt:10}} elevation={0}>
      
        <Enrollment/>
        <Courses/>
    </Paper>
  )
}

export default Home