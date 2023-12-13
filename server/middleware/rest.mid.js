export const isEducator = (req,res,next)=>{
    const isEducator = req.profile &&  req.profile.educator

    if(!isEducator){
        return res.status(403).json({error:'You are not an Educator',dt:req.profile})

    }
    next()
}


export const isInstructor = (req,res,next)=>{

    const isInstructor = req.course && req.userId && req.course.instructor._id == req.userId
    if(!isInstructor) return res.status(403).json({error:'You are Not authorized to add lesson to this course'})

    next()
}


