import mongoose from "mongoose"
import CourseModel from "../../models/Course.model.js"



export const createCourse = async(req,res)=>{
    try {
         const {name,image,description,category} = req.body 
         const instructor = req.profile._id
        
         if(!mongoose.isValidObjectId(instructor)) return res.status(404).json({error:'Invalid Educator'})

         const newCourse = await CourseModel.create({
                name:name,
                description:description,
                image:image,
                instructor:instructor,
                category:category
         })

         return res.json(newCourse)

    } catch (error) {
        return res.status(403).json({error:error.message})
    }
}

export const getCourses = async (req,res)=>{
   try {
    const result = await CourseModel.find()
        
    if(!result) return res.status(403).json({error: "No Courses in system Yet"})


    return res.json(result)
   } catch (error) {
    return res.json({error:error.message})
   }
}


export const getCourseByInstructor = async (req,res)=>{
    try {
        const userId = req.profile._id

        if(!mongoose.isValidObjectId(userId)) return res.status(403).json({error: "Invalid instructor"})
        const result = await CourseModel.find({instructor:userId}).populate('instructor','_id firstname lastname username')

        return res.json(result)


    } catch (error) {
        return res.status(403).json({error:error.message})
    }
}

export const getCourse = async(req,res)=>{
        try {
          req.course.image = undefined
          res.json(req.course)
            
        } catch (error) {
            return res.status(403).json({error:error.message})
        }
}


export const getPublishedCourses = async(req,res)=>{
    try {
        const result = await CourseModel.find({published:true}).populate("instructor","_id username firstname lastname about")
        return res.json(result)
    } catch (error) {
        return res.status(403).json({error:error.message})
    }
}


export const updateCourse = async(req,res)=>{
    try {
    
         if(!mongoose.isValidObjectId(req.course._id)) return res.status(404).json({error:'Invalid course'})


       const    result = await CourseModel.findByIdAndUpdate(req.course._id,{
            ...req.body,
            updateDat:Date.now
     })
         return res.json(result)
    } catch (error) {
        return res.status(400).json({error})
    }
}


export const removeCourse = async(req,res)=>{
    try {
         const course = req.course._id

         const result = await CourseModel.findByIdAndDelete(course)
         return res.json(result)
    } catch (error) {
        return res.json({error:'could not be removed'})
    }
}







export const createLesson = async(req,res)=>{
    try {
            const lesson = req.body
            let result = await CourseModel.findByIdAndUpdate(req.course._id,{
                $push:{lessons:{title:lesson.title,content:lesson.content,resourse_url:lesson.resourse_url}}
            },{new:true}).populate('instructor','_id username firstname lastname').exec()


            return res.json(result)

    } catch (error) {
        return res.status(403).json({error: error.message})
    }
}

export const updateLesson = async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
}


export const deleteCourse = async (req,res)=>{

}

export const deleteLesson = async(req,res)=>{

}


export const courseById = async (req,res,next,id)=>{

    try {
            let course = await CourseModel.findById(id).populate('instructor','_id firstname lastname username')

            if(!course) return res.status(403).json({error:'Course Not Found'})
            req.course = course

            next()

    } catch (error) {
        return res.status(400).json({error:error.message+" ,Couldn't return a course "})        
    }
}

