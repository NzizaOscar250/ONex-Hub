import { COURSE_STATITICS, ENROLLED_IN, ENROLLMENTS, ENROLL_COURSE, LEARN } from "../../constants";

export default function Enrollments(data={enrollments:[],learning:null,stats:null},action){
     let i;
    switch (action.type) {
        case ENROLL_COURSE:
             return data;
        case ENROLLMENTS:
        case ENROLLED_IN:
                return {...data,enrollments:[...action.payload]}
        case LEARN:
            return {...data,learning:action.payload}
        case COURSE_STATITICS:
            return {...data,stats:action.payload}
        default:
            return data
    }
}

