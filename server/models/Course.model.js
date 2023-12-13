import mongoose from "mongoose"

const lessonSchema = new mongoose.Schema({
    title:String,
    content:String,
    resourse_url:String,
    other_content:String
},{timestamps:true})



const courseSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:'Name is Required'
    },
    description:{
        type:String,
        trim:true
    },
    image:{
        type:String,
        required:"Image is Required"
    },
    published:{
        type:Boolean,
        default:false
    },
    instructor:{
        type:mongoose.Schema.ObjectId,
        ref:'Users'
    },
    lessons:[lessonSchema]
},{timestamps:true})


const CourseModel = mongoose.model("Courses",courseSchema);


export default CourseModel;
