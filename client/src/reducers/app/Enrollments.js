import { ENROLLED_IN, ENROLLMENTS, ENROLL_COURSE, LEARN } from "../../constants";

export default function Enrollments(data={enrollments:[],learning:null},action){
     let i;
    switch (action.type) {
        case ENROLL_COURSE:
            console.log(data,"action: ",action.payload)
             i =[action.payload]
            return {...data,enrollments:[...data.enrollments, ...i]}
        case ENROLLMENTS:
        case ENROLLED_IN:
                return {...data,enrollments:[...action.payload]}
        case LEARN:
            return {...data,learning:action.payload}
        default:
            return data
    }
}

