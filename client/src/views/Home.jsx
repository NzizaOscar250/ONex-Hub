import Enrollment from "./Enrollment"
import Courses from "./Courses"
import { Paper } from "@mui/material"
import {useSelector} from "react-redux"
const Home = () => {
  const published = useSelector((state)=>state.published)
  console.log(published)
  return (
    <Paper sx={{paddingBlock:5,paddingInline:1,pt:10}} elevation={0}>
      
        <Enrollment/>
        <Courses published={published}/>
    </Paper>
  )
}

export default Home