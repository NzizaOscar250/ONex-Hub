import {  CheckCircle, MenuBook, RadioButtonUnchecked } from "@mui/icons-material"
import { Avatar, Button, Card, CardActions, CardContent, CardHeader,
     CircularProgress, CssBaseline, Divider, Drawer, Grid, List, ListItem,
     ListItemAvatar, ListItemButton, ListItemIcon, ListItemSecondaryAction,
     ListItemText, ListSubheader, Toolbar, Typography, useMediaQuery, useTheme } from "@mui/material"

import {map} from "lodash"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getEnrollments } from "../../actions/courses"
import { toast } from "react-toastify"
const Enrollment = () => {
    const [index,setIndex] = useState(0)
    const [selected,setSelected] = useState(index)
    
    const {enrollId} = useParams()
    const dispatch = useDispatch();
    const learning = useSelector((state)=>state.enrollments.learning)
    const theme = useTheme()
    const matchs = useMediaQuery(theme.breakpoints.down("sm"))


    useEffect(()=>{
            dispatch(getEnrollments(enrollId,toast.info("Getting course ready..",{toastId:1})))
    },[dispatch,enrollId])

   const handleChange =(i)=>{
        const result = learning?.course?.lessons[i]
         setSelected({...result})
         window.scrollTo({
            top:0,
            left:0,
            behavior:'smooth'
         })
       
   }

   useEffect(()=>{
    const result = learning?.course?.lessons[index]
    setSelected({...result})
   },[index,learning?.course])


  if(!learning) return <CircularProgress/>
  const {course} = learning;


  return (
    <>
       <div>
            <Toolbar/>
            <CssBaseline/>
            <Grid container >
                <Grid item sm={2} sx={{background:'#ddd'}}>
                    <Drawer variant="permanent" open={true}
                     sx={{  '& .MuiDrawer-paper':
                     { boxSizing: 'border-box', 
                     
                     alignItems:'start',minWidth:240},overflowY:'auto',display:matchs?"none":"block"}}  >
                        <Toolbar/>
                        <List>
                            <ListItem sx={{gap:0,justifyContent:'center'}}>
                                <ListItemIcon sx={{m:0,p:0}}><MenuBook/></ListItemIcon>
                                <ListItemText primary={
                                    <Typography variant="h6" color="text.secondary">Course Overview</Typography>
                                }/>
                            </ListItem>
                            <Divider/>

                            <List>
                                <ListSubheader component="div">
                                Lessons
                                </ListSubheader>


                                    {
                                        map(course.lessons,(value,index)=>(
                                            <ListItemButton component="div"
                                              key={index} onClick={()=>handleChange(index)}
                                                sx={{gap:0}}
                                              >
                                                    <ListItemAvatar>
                                                        <Avatar >{index + 1} </Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                    sx={{paddingInlineEnd:6}}
                                                        primary={value.title}/>
                                                        <ListItemSecondaryAction>
                                                            {
                                                             value.completed?<CheckCircle color="primary"/> : <RadioButtonUnchecked color="secondary"/>
                                                            }
                                                        </ListItemSecondaryAction>
                                            </ListItemButton>
                                        ))
                                    }

                            </List>
                            <ListItem sx={{gap:0,justifyContent:'center',position:'sticky',bottom:0}}>
                                
                                <ListItemText primary={
                                    <Typography variant="p" color="text.primary" align="center" sx={{textAlign:'center',display:'block'}}>
                                       Completed 1 out of 7
                                    </Typography>
                                }/>
                            </ListItem>
                        </List>
                    </Drawer>
                </Grid>
                <Grid item sm={10} sx={{margin:'auto',minHeight:'100vh',
                paddingBlock:10,paddingInlineStart:10}}>
                    <Typography variant="h5" color="text.secondary" sx={{paddingBlockEnd:2}}>{course.name}</Typography>

                    <Card component="div" sx={{minHeight:500,width:'100%'}} elevation={0}>
                        <CardHeader title={selected?.title}
                            action={
                                
                                selected?.completed ? <Button variant="contained" color="secondary">Completed</Button> : <Button variant="outlined" onClick={()=>alert(selected?._id)}> Mark as complete</Button>
                                
                                
                            }
                        />
                        <CardContent>
                            <Typography variant="p">
                                {selected?.content}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            { 
                                index !== 0 && <Button variant="outlined" color="secondary" onClick={()=>setIndex((prev)=> prev -1 )}>Prev</Button>
                            }

                            <Button variant="contained">Resourse Link</Button>

                            {
                                (course.lessons.length - 1 > index) && <Button variant="outlined" color="secondary"  onClick={()=>setIndex((prev)=> prev+1)} >Next</Button>
                            }

                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
       
       </div>
    
    
    </>
  )
}

export default Enrollment