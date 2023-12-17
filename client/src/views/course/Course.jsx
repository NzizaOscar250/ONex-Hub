
import { AddBoxOutlined, AddBusiness,ArrowDownward,ArrowUpward,Delete, Edit, Save,} from "@mui/icons-material"
import {  Button,Paper, Typography, CssBaseline, List, ListItem, ListItemAvatar, 
 ListItemText, Divider, Card, CardHeader, IconButton, Avatar, Dialog, 
 DialogTitle,
 DialogActions, DialogContent,
  DialogContentText,  
  ListItemSecondaryAction,
  Box,
  CircularProgress} from "@mui/material"
import {map} from "lodash"
import { Link, useNavigate, useParams} from "react-router-dom"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useTheme } from "@mui/material"
import { useState,useEffect } from "react"
import { useSelector } from "react-redux"
import auth from "../../helper/auth.helper.js"
import { removeCourse } from "../../actions/courses/"
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
   const myCourse = useSelector((state)=>state.mycourses).find((course)=>course._id == params.courseId)
   useEffect(() => {
     setCourse({...course,...myCourse})
 
   }, [myCourse])
  
   const onShowConfirm = (data) => {
  
        setOpen({...data,open:true});
    };
    const onConfirm = (data) =>(event)=> {
        
    
     if(data.open && data.type === "DELETE"){
            dispatch(removeCourse(data.courseId,toast.info("Removing course...."),navigate))
            setOpen({...open,...data,open:false});
            console.log(data)
     }

     setOpen({...open,open:false});
     
    };
    

    const openEdit = ()=>{
        setEdit((prev)=>!prev)
    }


    if (!myCourse) return  <><CircularProgress/> Course Not Found, it may have been deleted </>

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
            subheader={<Typography  sx={{py:1,fontSize:15}} color="primary">Published by <b>{course?.instructor?.username}</b></Typography>}
            action={
                auth.isMycourse(course?.instructor?._id) ? (<>
                    <IconButton color="secondary" component={Link} to="edit"><Edit/></IconButton>
                    { 
                       !course.published && <Button endIcon={<Save/>} color="secondary"
                                                     variant="contained" 
                                                     onClick={()=>{
                                                        onShowConfirm({title:'Delete Course',
                                                        content1:`This will permanently delete ${course.name} from your courses`,
                                                        content2:'are you sure ? Want to delete course',
                                                        type:'DELETE',
                                                        courseId:course._id})
                                                        
                                                        
                                                    } 
                                                    }>Publish</Button>
                    }
                    <IconButton color="secondary" onClick={()=> onShowConfirm({title:'Delete Course',
                        content1:`This will permanently delete ${course.name} from your courses`,
                        content2:'Are you sure you want to delete course?',
                        type:'DELETE',
                        courseId:course._id})
             
                    
                    }><Delete/></IconButton></>)

                    : <Button startIcon={<AddBusiness/>} color="primary" variant="contained" >Enroll</Button>
                
            }
            />
        <ListItem sx={{alignItems:'start',display:matchs?'block':'flex'}}>
            <ListItemAvatar sx={{paddingInlineEnd:4}}>
                {/* <Avatar src={code} /> */}
                <img src={course.image} alt="cool" style={{borderRadius:0,width:matchs?400:300,
                    height:matchs?250:200,objectFit:'cover',padding:4,background:'#ddd',borderRadius:'5px'}}/>
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
                    auth.isMycourse(course?.instructor?._id) && <Button startIcon={<Edit/>} sx={{mt:3}} onClick={openEdit}>Edit and Re-arrange</Button>
                
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