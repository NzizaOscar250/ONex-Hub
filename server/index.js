import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import dotenv from "dotenv"
import authroutes from "./routes/auth.routes.js"
import userRoutes from "./routes/user.routes.js"
import courseRoutes from "./routes/course.routes.js"
import enrollRoutes from "./routes/enroll.routes.js"

dotenv.config();
const app = express()
const PORT = process.env.PORT || 8000

const offlineUrl = "mongodb://127.0.0.1:27017/web_classroom"
const onlineUrl = process.env.DB || null;

app.use(bodyParser.json({limit:"30mb",extended:true}))
app.use(bodyParser.urlencoded({limit:'30mb',extended:true}))
app.use(cors())

app.use("/auth/",authroutes)
app.use("/user/",userRoutes)
app.use("/courses/",courseRoutes)
app.use("/enrollment/",enrollRoutes)
// app.use("/",(req,res)=>res.json({message:'working'}))

mongoose.connect(offlineUrl).then(()=>{
    app.listen(PORT,()=>console.log(`server started at: https:\\localhost:${PORT}`))
}).catch((e)=>console.log("error: ",e.message))


