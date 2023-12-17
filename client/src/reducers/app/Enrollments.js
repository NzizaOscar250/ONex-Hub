import { ENROLLMENTS } from "../../constants";

export default function Enrollments(enrollments=[],action){
    switch (action.type) {
        case ENROLLMENTS:
                return action.payload
        default:
            return enrollments
    }
}