import UserModel from "../models/Users.model.js"
import mongoose from "mongoose"






































/**
 * endpoint-> users/
 * */ 

export const getUser = async(req,res)=>{
    /**
     * Remove sensitive information, such as 
     * the hashed_password and salt values, before
     * sending the user object in the response to the requesting client
    */


    req.profile.hashed_password = undefined
    req.profile.salt=undefined
    res.status(200).json(req.profile)
}





export const updateUser = async(req,res)=>{
   try {
    let user = req.profile;

    // user.updated = Date.now()
    const newUpdate = {...req.body,
        profile:req.body.profile,
        about:req.body.about,
        updatedAt:Date.now}

        
        const updated = await UserModel.findByIdAndUpdate(user._id,newUpdate)
       

        updated.hashed_password = undefined
        updated.salt = undefined
        res.json(updated)
    // res.json({waitint:"cool"})

   } catch (error) {
    console.log("on update users",error.message)
   }
}




export const deleteUser = async(req,res)=>{
    try {
        // let user = req.profile
        // let deletedUser = await user.remove()
        
        const deletedUser = await UserModel.findByIdAndRemove(req.profile._id)
        deletedUser.hashed_password = undefined
        deletedUser.salt = undefined
        res.json(deletedUser)
        } catch (err) {
        return res.status(400).json({
        error: err
        })
}
}

export const userById = async(req,res,next,id)=>{
    try {
        
     if (!mongoose.isValidObjectId(id)) res.status(400).json({error: 'Invalid user id'})

        let user = await UserModel.findById(id)
        if(!user){
            res.status(400).json({error: 'User Not Found'})
        }
        
        user.salt = undefined
        user.hashed_password = undefined

        req.profile = user;
        next()


    } catch (error) {
        console.log("On userById",error.message)
    }
}


export const getUserDetailsById = async(req,res,next,id)=>{
    try {

        if (!mongoose.isValidObjectId(id)) res.status(400).json({error: 'Invalid user id'})

        let user = await UserModel.findById(id)
         if(!user){
            res.status(400).json({error: 'User Not Found'})
        }

        req.profile = user;
       
        next()


    } catch (error) {
        console.log("On userById",error.message)
    }
}
/**
 * 
 *  any client can perform CRUD
 * operations on the user model. However, we want to restrict access to some of these
 * operations with authentication and authorization
 */



/***
 * FOLLOW OR UNFOLLOW END POINTS
 */


export const addFollowing = async (req,res,next)=>{
try {
    const {followId} = req.body
    
    if (!mongoose.isValidObjectId(followId)) return res.status(400).json({error: 'Invalid user'})
    
    await UserModel.findByIdAndUpdate(req.userId,{
        $push:{following:followId}
    })

     next()

} catch (error) {
    console.log("On addFollowing",error.message)
}
}
export const addFollower = async (req,res)=>{
        try {

            const {followId} = req.body
            
            if (!mongoose.isValidObjectId(followId)) return res.status(400).json({error: 'Invalid user'})
    
            let result = await UserModel.findByIdAndUpdate(followId,{
                $push:{followers:req.userId}
            },{new:true})
            .populate("following","_id username profile about")
            .populate("followers","_id username profile about")
            .exec()

            result.hashed_password = undefined;
            result.salt = undefined
            res.json(result)
        } catch (error) {
         console.log("on addFollower",error.message)
        }
}



export const removeFollowing = async (req,res,next)=>{
          const {unfollowId} = req.body
          try {
                if(!mongoose.isValidObjectId(unfollowId))return res.status(401).json({error:'Invalid user '})
            
        await UserModel.findByIdAndUpdate(req.userId,{
            $pull:{following:unfollowId}
        })
        next()
          } catch (error) {
            console.log("on removeFollowing",error.message)
          }
}



export const removeFollower = async (req,res)=>{
    const {unfollowId} = req.body
    try {
          if(!mongoose.isValidObjectId(unfollowId)) return res.status(401).json({error:'Invalid user '})
      
 const result = await UserModel.findByIdAndUpdate(unfollowId,{
      $pull:{followers:req.userId}
  },{new:true}).populate('following','_id username profile about')
               .populate('followers','_id username profile about')
               .exec()
               result.hashed_password = undefined
               result.salt=undefined

               res.json(result)
  

    } catch (error) {
        console.log("on RemoveFollower",error.message)
    }
}

