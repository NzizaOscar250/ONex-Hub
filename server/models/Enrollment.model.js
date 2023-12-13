import mongoose from "mongoose"

const enrollmentSchema = new mongoose.Schema({
course:{
    type:mongoose.Schema.ObjectId,
    ref:'Courses'
},
Student:{
    type:mongoose.Schema.ObjectId,
    ref:'User'
},
LessonStatus:{
    lesson:{
        type:mongoose.Schema.ObjectId,
        ref:'Lesson'
    },
},
enrolled:{
    type:Date,
    default:Date.now
},
completed:Date
},{timestamps:true}
)



const Enrollment = mongoose.model("enrollment",enrollmentSchema)

export default Enrollment;