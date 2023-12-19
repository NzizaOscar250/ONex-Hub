import Enrollment from "../../models/Enrollment.model.js"

export const create = async(req,res)=>{
    let newEnrollment = {
        course:req.course,
        Student:req.userId
    }


    newEnrollment.lessonStatus = req.course.lessons.map((lesson)=> {
        return {lesson:lesson,completed:false}
    })
    const enrollment = new Enrollment(newEnrollment)

    try {
        
        const result = await enrollment.save()
            if(result){
                    
        const enrollments = await Enrollment.find({course:result.course,Student:result.Student}).populate('course','_id name image description category').exec()
        // enrollments.enrollment.course.instructor.hashed_password=undefined
        // enrollments.enrollment.course.instructor.salt=undefined
        // enrollments.enrollment.course.instructor.profile=undefined
        return res.json(enrollments)
            }
    
        
       


    } catch (error) {
        return res.status(403).json({error:error.message})
    }
}


export const findEnrollment = async(req,res,next)=>{
        try {
            const enrollments = await Enrollment.find({course:req.course._id,Student:req.userId})
                                                .populate({path:'course',populate:{path:'instructor'}})
                                                .populate('Student','_id firstname lastname email username').exec()


            if(enrollments.length == 0){
                next();
            }
            else{
                return res.json(enrollments[0])
            }

        } catch (error) {
                return res.status(400).json({error:error.message})
        }
}



export const ById = async(req,res,next,id)=>{
    try {
        const result = await Enrollment.findById(id)
                                       .populate({path:'course',populate:{path:'instructor'}})
                                       .populate('Student','_id firstname lastname email username')
                                       .exec();

        if(!result) return res.status(404).json({error:'No Such Enrollment Exist'})


       req.enrollment = result
      next()
    } catch (error) {
      return res.status(403).json({error:error.message,message:"couldn't return Enrollment"})

    }
}

export const readEnrollment = (req,res)=>{
    req.enrollment.course.instructor.hashed_password=undefined
    req.enrollment.course.instructor.salt=undefined
    req.enrollment.course.instructor.profile=undefined
    
    
    return res.json(req.enrollment)
}



// completed courses

export const complete = async(req,res)=>{
   
    let updatedData = {}
    updatedData['lessonStatus.$.complete'] = req.body.complete;
    updatedData.updatedAt = Date.now()

    if(req.body.courseCompleted){
        updatedData.completed = req.body.courseCompleted;

        try {
            let enrollment = await Enrollment.updateOne({'lessonStatus._id':req.body.lessonStatus},{'$set':updatedData})
            res.json(enrollment)

        } catch (error) {
            return res.status(400).json({error:error.message,message:'Lesson could not be completed'})
        }
    }
   return res.status(400).json({error:"Could not be completed"})
   
}



// list all enrollment


export const listEnrollments = async(req,res)=>{
    try {
        const results = await Enrollment.find({Student: req.userId}).sort({'completed':1}).populate('course','_id name image description category').exec();
        if(!results) return res.status(404).json({error:"No enrolled courses yet!"})

        return res.json(results)
    } catch (error) {
        return res.status(400).json({error:"Could not fetch data"})
    }
}


//enrollment status instructor course


export const enrollmentStatus = async (req,res)=>{

    try {
        let stats= {}
        stats.totalEnrolled = await Enrollment.find({course:req.course._id}).countDocuments();
        stats.totalCompleted = await Enrollment.find({course:req.course._id}).exists("completed",true).countDocuments();

        return res.json(stats)
    } catch (error) {
            return res.status(400).json({error:"Statics Couldn't be fetched"})
    }
}