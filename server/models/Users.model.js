import mongoose from "mongoose";
import crypto from "node:crypto";


const userSchema = new mongoose.Schema({
     username:{
        type:String,
        required:"Username is Required",
        trim:true
    },
    firstname:{
        type:String,
        required:'First name is Required'
    },
    lastname:{
        type:String,
        required:'Last name is Required'
    },
    about:String,
    profile:String,
    email:{
        type:String,
        trim:true,
        unique:"Email is Required",
        match:[/.+\@.+\..+/,"Please Fill in Valid Email Address"],
        required:"Email is Required...",
        
    },
    hashed_password:{
        type:String,
        required:"Password is required"
    },
   
    salt:String,
    educator:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

userSchema
.virtual('password')
.set(function(password){
    this._password = password
    this.salt = this.makeSalt()
    this.hashed_password = this.encryptPassword(password)

})
.get(function(){
    return this._password
})

userSchema.methods = {
    authenticate: function(plainText){
        return this.encryptPassword(plainText) === this.hashed_password
    },
    encryptPassword:function(password){
        if (!password) return ''
        try {
            return crypto.createHmac('sha1',this.salt).update(password).digest('hex')
        } catch (error) {
            console.log("schema error: ",error.message)
        }
    }
}

//validate

userSchema.path('hashed_password').validate(function(){
    if(this._password && this._password.length < 6 ){
        this.invalidate("password","Password Must be at least 6 characters")
    }
    if(this.isNew && !this._password){
        this.invalidate('password','Password is required')
    }

},null)




const UserModel = mongoose.model('Users',userSchema)

export default UserModel;