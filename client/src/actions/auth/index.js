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
        console.log(error)
        Update(id,response?.data?.error,"error")
    }
}

export const signUp = (formData,id,redirect)=>async(dispatch)=>{
    try {
         const {data} = await API.SignUp(formData)

         dispatch({type:AUTH,payload:data})
         redirect("/")
    } catch (error) {
        console.log("wowowow")
        dispatch({type:ERROR,payload:error.message})
    }
}