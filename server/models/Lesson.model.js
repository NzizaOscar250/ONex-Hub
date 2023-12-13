import mongoose from "mongoose"


const lessonSchema = new mongoose.Schema({
    title:String,
    content:String,
    resourse_url:String,
    other_content:String
},{timestamps:true})


const Lesson = mongoose.model("Lessons",lessonSchema)

export default Lesson;