import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import UserModel from "../../models/Users.model.js"
import dotenv from "dotenv"


dotenv.config();


const secret=process.env.AUTH_SECRET_KEY;

export const allUsers=async(req,res)=>{
    const data=await UserModel.find();
    res.status(200).json(data)
}
    
export const signin=async(req,res)=>{
    const data=req.body;
    try {
        //check if user is available
        // return res.json(data)
        const userExist = await UserModel.findOne({email:data.email})
        if(!userExist) return res.status(401).json({error:'Email Not Found!'})

        if(!userExist.authenticate(data.password)) res.status(401).json({error: 'Incorrect Password'})

        const token = jwt.sign({_id:userExist._id,email:userExist.email,educator:userExist.educator},secret,{expiresIn:'24h' })


        res.cookie('remember_me', token, { expire: new Date() + 9999 })
     return   res.status(200).json({success:"userfound",token,user:{
            username:userExist.username,
            email:userExist.email,
            educator:userExist.educator

        }})

    } catch (error) {
        return res.status({error:error.message})
    }

}


export const signout = (req,res)=>{
    res.clearCookie("remember_me")
 return res.status(200).json({
 message: "signed out"
 })
}

export const empSignup=async(req,res)=>{
    // # Authorization: token xxx

    try{
        const {username,fname,lname,email,password}=req.body;
        //check if user alreasdy exist
           

              const validate = username == undefined || fname == undefined || lname == undefined || email == undefined || password == undefined
 
               if(validate) return res.json({error:'all field are required'})

        const userExist=await UserModel.findOne({email});
        if(userExist) res.status(403).send("Email already taken...!");
        //hash password

        // const hashedPass=await bcrypt.hash(password,10);
       
        const result=await UserModel.create({
            firstname:fname,
            lastname:lname,
            username:username,
            password:password,
            email:email
        });

        //generate token
        const token = jwt.sign({_id:result._id,email:result.email},
            secret,{expiresIn:'24h' })

            res.status(200).json({success:"user signed up",token,user:{
                _id:result._id,
                username:result.username,
                email:result.email,
                educator:false
    
            }})

    }
    catch(e){
        console.log(e.message)
    }
    
}