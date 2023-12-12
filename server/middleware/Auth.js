import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()
const secret=process.env.SECRET;
export const isAuthorized = async(req,res,next)=>{
    try {
        const token = req.headers.authorization.split(" ")[1]
        let decodedData ;
        const isCustomAuth = token.length  < 500
        if(token && isCustomAuth){
            decodedData = jwt.verify(token,secret)
            req.userId = decodedData?._id
        }
        else{
            decodedData = jwt.decode(token)
            req.userId = decodedData._id
        }
        next()
    } catch (error) {
        
        res.status(401).json({error:'Requires Sign in '})
    }
}