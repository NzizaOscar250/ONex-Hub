import {AUTH, USER_INFO} from "../../constants"
import * as API from "../../API"
import { Update } from "../notifications"
export const signIn = (formData,id,redirect)=>async(dispatch)=>{

    try {
        const {data} = await API.SignIn(formData)

        if(data){Update(id,"Successfully Loged in","success")
        dispatch({type:AUTH,payload:data})
        redirect("/")}
        
       
    } catch (error) {
        const {response} = error
        console.log(response)
        Update(id,response?.data?.error,"error")
    }
}

export const signUp = (formData,id,redirect)=>async(dispatch)=>{
    try {
         const {data} = await API.SignUp(formData)
         if(data){ Update(id,"Account created successfully ","success")
         dispatch({type:AUTH,payload:data})
         redirect("/")}
    } catch (error) {
        const {response} = error
        Update(id,response.data.error || response.data,"error")
    }
}


export const updateUser = (formData,notId)=> async(dispatch)=>{
    try {
        const {data} = await API.updateProfile(formData)
        if(data){ Update(notId,"Account updated successfully ","success")
        dispatch({type:'UPDATE_USER',payload:data})}
    
   } catch (error) {

    
       Update(notId,"Updating failed","error")
   }

} 




export const fetchUserDetails = (id)=>async(dispatch)=>{
    try {
        const {data} = await API.fetchUser(id)
        dispatch({type:USER_INFO,payload:data})
    } catch (error) {
        console.log(error.message)
    }
}