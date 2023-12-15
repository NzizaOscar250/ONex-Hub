import {AUTH,ERROR} from "../../constants"
import * as API from "../../API"
import { Update } from "../notifications"
export const signIn = (formData,id,redirect)=>async(dispatch)=>{

    try {
        const {data} = await API.SignIn(formData)
        Update(id,"Successfully Loged in","success")
        dispatch({type:AUTH,payload:data})
        redirect("/")
       
    } catch (error) {
        const {response} = error
        Update(id,response.data.error || error.message,"error")
    }
}

export const signUp = (formData,id,redirect)=>async(dispatch)=>{
    try {
         const {data} = await API.SignUp(formData)
         Update(id,"Account created successfully ","success")
         dispatch({type:AUTH,payload:data})
         redirect("/")
    } catch (error) {
        const {response} = error
        console.log(error) 
        Update(id,response.data.error || response.data,"error")
    }
}