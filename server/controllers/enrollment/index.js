
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
        
        return res.status(200).json(result)


    } catch (error) {
        return res.status(403).json({error:error.message})
    }
}


export const findEnrollment = async(req,res,next)=>{
        try {
            const enrollments = await Enrollment.find({course:req.course._id,Student:req.userId})


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
                                       .populate('student','_id firstname lastname email username')
                                       .exec()
        if(!result) return res.status(404).json({error:'No Such Enrollment Exist'})

        req.enrollment = result
        next()
    } catch (error) {
        if(!result) return res.status(403).json({error:error.message,message:"couldn't return Enrollment"})

    }
}

export const readEnrollment = (req,res)=>{

    return res.json(req.enrollment)
}