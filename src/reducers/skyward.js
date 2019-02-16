import { GET_GRADES } from "../actions/types";

const INIT_STATE = {
    grades: {}
}

export default function(state = INIT_STATE, action){
    switch(action.type){
        case GET_GRADES:
            return {
                ...state,
                grades: action.payload
            }
        default :
            return {
                ...state
            }
    }
}