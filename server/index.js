import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import dotenv from "dotenv"
import authroutes from "./routes/auth.routes.js"
import userRoutes from "./routes/user.routes.js"
import courseRoutes from "./routes/course.routes.js"
import enrollRoutes from "./routes/enroll.routes.js"
import serverless from "serverless-http";

dotenv.config();
export const app = express()

// const offlineUrl = "mongodb://127.0.0.1:27017/web_classroom"
const onlineUrl = process.env.DB 
app.use(bodyParser.json({limit:"30mb",extended:true}))
app.use(bodyParser.urlencoded({limit:'30mb',extended:true}))
app.use(cors())

app.use("/api/auth/",authroutes)
app.use("/api/user/",userRoutes)
app.use("/api/courses/",courseRoutes)
app.use("/api/enrollment/",enrollRoutes)

// app.use("/",(req,res)=>res.json({message:'working'}))

mongoose.connect(onlineUrl).then(()=>{
    console.log("connected to mongo db")
}).catch((e)=>console.log("error: ",e.message));


const handler = serverless(app);

// Export the handler for Netlify
exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return await handler(event, context);
};
