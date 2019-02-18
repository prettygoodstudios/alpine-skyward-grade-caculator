import { GET_GRADES, GET_COURSE } from "../actions/types";

const INIT_STATE = {
    grades: {},
    course: {}
}

export default function(state = INIT_STATE, action){
    switch(action.type){
        case GET_GRADES:
            return {
                ...state,
                grades: action.payload
            }
        case GET_COURSE:
            return {
                ...state,
                course: action.payload
            }
        default :
            return {
                ...state
            }
    }
}