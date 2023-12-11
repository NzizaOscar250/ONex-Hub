import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8000

const url = "mongodb://127.0.0.1:27017/web_classroom"

app.use(bodyParser.json({extended:true}))
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())

app.use("auth/",)
app.use("user/",)
mongoose.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    app.listen(PORT,()=>console.log(`server started at: https:\\localhost:${PORT}`))
}).catch((e)=>console.log("error: ",e.message))


