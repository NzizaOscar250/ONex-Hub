import {AUTH} from "../../constants/index"


export default function Auth (auth={data:null},action){
    switch (action.type) {
        case AUTH:
            sessionStorage.setItem('jwt', JSON.stringify(action.payload))
            console.log(action.payload)
              return {...auth, data:action?.payload}  
        default:
            
        return auth
    }   
}