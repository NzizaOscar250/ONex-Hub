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

export const isStudent = (req,res,next)=>{
   const isStudent = req.userId && req.userId== req.enrollment.Student._id
   if(!isStudent) return res.status(403).json({error:"User is not Enrolled"})

   next()
}

export const isMycourse =  (req,res,next)=>{
    const isMycourse =  req.course && req.userId && req.course.instructor._id == req.userId
    if(isMycourse ) return res.status(403).json({error:'You can not enroll in your own course'})
    next()
 }




