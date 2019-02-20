import { GET_GRADES, GET_COURSE, UPDATE_GRADE, CLEAR_GRADES } from "../actions/types";

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
        case CLEAR_GRADES:
            return {
                ...state,
                grades: action.payload
            }
        case GET_COURSE:
            return {
                ...state,
                course: action.payload
            }
        case UPDATE_GRADE:
            const {categoryIndex, assignmentIndex, earned, delta, deltaTotal} = action.payload;
            let {grades} = state;
            let {course} = state;
            let courseIndex = 0;
            grades.forEach((c, i) => {
                if(c.info.period == course.info.period){
                    courseIndex = i;
                }
            });
            console.log(state);
            course.report[categoryIndex].assignments[assignmentIndex].score.earned = earned;
            grades[courseIndex].report[categoryIndex].assignments[assignmentIndex].score.earned = earned;
            if(deltaTotal < 0){
                course.report[categoryIndex].assignments[assignmentIndex].score.earned = "*";
                grades[courseIndex].report[categoryIndex].assignments[assignmentIndex].score.earned = "*";
            }
            course.report[categoryIndex].score.earned += delta;
            course.report[categoryIndex].score.total += deltaTotal;
            return {
                ...state,
                grades,
                course
            }
        default :
            return {
                ...state
            }
    }
}