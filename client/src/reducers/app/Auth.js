import {AUTH, USER_INFO} from "../../constants/index"
import auth from "../../helper/auth.helper.js"
const newAuth = auth;

export default function Auth (auth={data:null,userInfo:null},action){
    switch (action.type) {
        case AUTH:
            sessionStorage.setItem('jwt', JSON.stringify(action.payload))
              return {...auth, data:action?.payload} 
        case 'UPDATE_USER':    
                    newAuth.updateUser(action?.payload) 
              return {...auth,userInfo:action?.payload}
        case USER_INFO:
            return {...auth,userInfo:action?.payload}
        default:        
        return auth
    }   
}