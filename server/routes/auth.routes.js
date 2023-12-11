import express from "express";
import {signin,empSignup,allUsers,signout} from "../controllers/auth/authControllers.js"
const authroutes=express.Router();

authroutes.post("/signin",signin);
authroutes.post('/signup',empSignup)
          .get("/signout",signout)


export default authroutes