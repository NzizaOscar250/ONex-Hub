import {  CheckCircle, MenuBook, RadioButtonUnchecked } from "@mui/icons-material"
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CssBaseline, Divider, Drawer, Grid, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemSecondaryAction, ListItemText, ListSubheader, Toolbar, Typography, useMediaQuery, useTheme } from "@mui/material"
import {Lessons} from "../Db"
import {map,find } from "lodash"
import { useEffect, useState } from "react"
const Enrollment = () => {
    const [selected,setSelected] = useState(0)
    const [data,setData] = useState();

   
    useEffect(()=>{
            setData(find(Lessons,(dt,index)=>index === selected))
    },[selected])

    const theme = useTheme()
    const matchs = useMediaQuery(theme.breakpoints.down("sm"))
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
                                        map(Lessons,(value,index)=>(
                                            <ListItemButton component="div"
                                              key={index} onClick={()=>setSelected(index)}
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
                    <Typography variant="h5" color="text.secondary" sx={{paddingBlockEnd:2}}>Node js Fundamentals</Typography>

                    <Card component="div" sx={{minHeight:500,width:'100%'}} elevation={0}>
                        <CardHeader title={data?.title}
                            action={
                                <>
                                data?.completed ? <Button variant="contained" color="secondary">Completed</Button> : <Button variant="outlined">Mark as complete</Button>
                                
                                </>
                            }
                        />
                        <CardContent>
                            <Typography variant="body2">
                                {data?.desc}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button variant="contained">Resourse Link</Button>
                            <Button variant="outlined" color="secondary">Next</Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
       
       </div>
    
    
    </>
  )
}

export default Enrollment