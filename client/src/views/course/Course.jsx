
import { AddBoxOutlined, AddBusiness,ArrowDownward,ArrowUpward,Delete, Edit, People, Save,VerifiedUser,} from "@mui/icons-material"
import {  Button,Paper, Typography, CssBaseline, List, ListItem, ListItemAvatar, 
 ListItemText, Divider, Card, CardHeader, IconButton, Avatar, Dialog, 
 DialogTitle,
 DialogActions, DialogContent,
  DialogContentText,  
  ListItemSecondaryAction,
  Box,
  CircularProgress,
  Stack} from "@mui/material"
import {map} from "lodash"
import { Link, useNavigate, useParams} from "react-router-dom"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useTheme } from "@mui/material"
import { useState,useEffect } from "react"
import { useSelector } from "react-redux"
import auth from "../../helper/auth.helper.js"
import { enrollCourse, enrollStatics, removeCourse,updateCourse } from "../../actions/courses/"
import { toast } from "react-toastify"
import { useDispatch } from "react-redux"







const Course = () => {

  const theme = useTheme();
  const matchs = useMediaQuery(theme.breakpoints.down('md'))
   const [open,setOpen] = useState({open: false,title:'',content1:'',content2:'',type:'',courseId:''})

   const [edit,setEdit] = useState(false)
   const params = useParams()
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const [course,setCourse] = useState({name:'',resourse_url:'',description:'',category:'',published:''})
   let myCourse = useSelector((state)=> state.mycourses.find((course)=>course._id == params.courseId) || state.published.find((course)=>course._id == params.courseId) )
    const {enrollments, stats} = useSelector((state)=>state.enrollments)


   
   useEffect(() => {
     setCourse({name:'',resourse_url:'',description:'',category:'',published:'',...myCourse})
        dispatch(enrollStatics(params.courseId))
        console.log("cool")
   }, [dispatch,myCourse,params])
  
   const onShowConfirm = (data) => {
  
        setOpen({...data,open:true});
    };
    const onConfirm = (data) =>(event)=> {
        event.preventDefault()
    
     if(data.open && data.type === "DELETE"){
            dispatch(removeCourse(data.courseId,toast.info("Removing course...."),navigate))
            setOpen({...open,...data,open:false});
     }
     
     if(data.open && data.type === "PUBLISH"){
        dispatch(updateCourse({published:true},toast.info("Publishing...!",{toastId:'oscar'}),data.courseId))
        setOpen({...open,...data,open:false})
     }
    //  unpublish

    if(data.open && data.type === "UNPUBLISH"){
        dispatch(updateCourse({published:false},toast.info("Publishing...!",{toastId:'oscar'}),data.courseId))
        setOpen({...open,...data,open:false})
     }

     setOpen({...open,open:false});
     
    };
    

    const openEdit = ()=>{
        setEdit((prev)=>!prev)
    }
    
    const handleEnroll = (courseId)=>{
        dispatch(enrollCourse(courseId,toast.info("Sending request...")))  
    }
 
    const checkEnroll=(courseId)=>{

        return enrollments.find((item)=>item.course._id == courseId)
    }
   



    if (!myCourse) return  <><CircularProgress/> </>

  return (

   <>
   
<Dialog open={open.open}>
            <DialogTitle color="primary">{open.title}</DialogTitle>

            <DialogContent>
                <DialogContentText >{open.content1}</DialogContentText>
                <DialogContentText sx={{paddingBlockEnd:4}}>                
                    {open.content2}
                </DialogContentText>
                <Divider/>
                <DialogActions>
                    <Button variant="contained" color="secondary" onClick={onConfirm({...open,open:false,type:'CANCEL'})}>Cancel</Button>
                    <Button variant="contained" color={open.type == "DELETE"?"error":"primary"} onClick={onConfirm(open)}>{open.type}</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>

   <Paper component="div" sx={{margin:'auto ',padding:4,minHeight:'100vh'}} elevation={0}>
    <CssBaseline/>
 
    <Card elevation={0} sx={{padding:0,margin:0}}>
        <CardHeader
            title={<Typography variant="h5" color="text.secondary">{course?.name}</Typography>}
            subheader={<Typography  sx={{py:1,fontSize:15}} color="primary"> { course.published ? "Published":"Added"} by <b>{course?.instructor?.username}</b></Typography>}
            action={
                <Stack direction="row" alignItems="center" gap={2}>
                  {
                    course.published && <Stack direction="row" gap={3}>

                            <div style={{fontSize:'14px',display:'flex',gap:5,alignItems:'center',color:'grey'}}>
                                    <People  style={{fontSize:'20px',color:'grey'}}/>
                                    <span> { stats?.totalEnrolled } </span>
                                    <span>enrolled</span>
                            </div>

                            <div style={{fontSize:'14px',display:'flex',gap:5,alignItems:'center',color:'grey'}}>
                                    <VerifiedUser  style={{fontSize:'20px',color:'grey'}}/>
                                    <span> { stats?.totalCompleted } </span>
                                    <span>completed</span>
                            </div>
                           
                        </Stack>}
                {
                    auth.isMycourse(course?.instructor?._id? course.instructor?._id : course?.instructor ) ? (<>
                    <IconButton color="secondary" component={Link} to="edit"><Edit/></IconButton>
                    <IconButton color="secondary" onClick={()=> onShowConfirm({title:'Delete Course',
                        content1:`This will permanently delete ${course.name} from your courses`,
                        content2:'Are you sure you want to delete course?',
                        type:'DELETE',
                        courseId:course._id})
             
                    
                    }><Delete/></IconButton>
                    { 
                       !course.published && course.lessons.length != 0 ? <Button endIcon={<Save/>} color="secondary"
                                                     variant="contained" 
                                                     onClick={()=>{
                                                        onShowConfirm({title:'Publish Course',
                                                        content1:`This will permanently make this  "${course.name} course" available to public`,
                                                        content2:'Are you sure to publish this course?',
                                                        type:'PUBLISH',
                                                        courseId:course._id})
                                                        
                                                        
                                                    } 
                                                    }>Publish</Button>
                                                    : !course.published && <Button variant="outlined" component={Link}  to="newlesson" >Add atleast one lesson to publish</Button>
                        
                        
                                    
                    }
                   </>)

                    : !auth.isMycourse(course?.instructor?._id) && !checkEnroll(course._id) ? <Button startIcon={<AddBusiness/>} 
                    color="primary" variant="contained" onClick={()=> handleEnroll(course._id)} >Enroll</Button> : <Button variant="outlined" component={Link} to={`/learn/${checkEnroll(course._id)._id}`}>Start Learing</Button>
               }
               </Stack> 
            }
            />
        <ListItem sx={{alignItems:'start',display:matchs?'block':'flex'}}>
            <ListItemAvatar sx={{paddingInlineEnd:4}}>
                {/* <Avatar src={code} /> */}
                <img src={course.image} alt="cool" style={{borderRadius:'5px',width:"100%",
                    height:matchs?250:200,objectFit:'cover',padding:4,background:'#ddd'}}/>
            </ListItemAvatar>
            <ListItemText primary={<Typography variant="h5" color="text.secondary">{course?.name}</Typography>}
                          secondary={<Typography variant="body2" sx={{py:1}}>{course?.description}</Typography>} />
           
          </ListItem>
         <Divider/>
    </Card>


<br/>

      <CardHeader 
            title={<>
             <Typography variant="h5" color="secondary">Lessons</Typography>
            </>}
            subheader={
                <>
                <Typography variant="body2" color="text.secondary">{course?.lessons?.length} Lessons</Typography>
               {
                    (auth.isMycourse(course?.instructor?._id) && course.lessons.length) ? <Button startIcon={<Edit/>} sx={{mt:3}} onClick={openEdit}>Edit and Re-arrange</Button>:''
                
               }
                
         
                </>
            }
            action={
                
                auth.isMycourse(course?.instructor?._id) &&  <Button startIcon={<AddBoxOutlined/>} 
            variant="contained" 
            color="secondary" 
            component={Link}
            to="newlesson"
            sx={{alignSelf:'start'}}>New Lesson</Button>
            
            }/>

      <List sx={{paddingBlockStart:5}}>
       {
        map(course?.lessons,(value,index)=>(
         <Box key={index}>
          <ListItem sx={{display:matchs?'block':'flex',}} >
            <ListItemAvatar sx={{paddingInlineEnd:4}}>
                {/* <Avatar src={code} /> */}
             <Avatar>{index+1}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={ <Link to="/learn/enrollmentId"><Typography variant="h6">{course.name}  {value.title}</Typography></Link>}
                          secondary={value?.content?.substring(0,160)}/>

                   {
                    edit && <ListItemSecondaryAction component="div" sx={{display:matchs?'flex':'block',justifyContent:'end', position:matchs&&'relative'}}>
                                   <IconButton><Edit/></IconButton>
                                    <IconButton><ArrowUpward/></IconButton>
                                    <IconButton><ArrowDownward/></IconButton>
                                    <IconButton><Delete/></IconButton>
                            </ListItemSecondaryAction>
                   }    
          </ListItem>
          
          <Divider variant="inset" component="li"/> 
          </Box>

        ))
       }
          
      </List>
   </Paper>
   
   </>
  )
}

export default Course