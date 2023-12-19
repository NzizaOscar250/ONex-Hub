import express from "express";
import {signin,empSignup,signout} from "../controllers/auth/authControllers.js"
const authroutes=express.Router();

authroutes.post("/signin",signin);
authroutes.post('/signup',empSignup)
          .get("/signout",signout)
          .get("/",(req,res)=>{res.send("<h1>Welcome to my home playground</h1>")})




export default authroutes