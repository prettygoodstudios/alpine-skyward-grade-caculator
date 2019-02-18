import { GET_GRADES, GET_COURSE, UPDATE_GRADE } from "../actions/types";

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
        case UPDATE_GRADE:
            const {categoryIndex, assignmentIndex, earned} = action.payload;
            let {grades} = this.state;
            let {course} = this.state;
            let courseIndex = 0;
            grades.forEach((c, i) => {
                if(c.info.period == course.info.period){
                    courseIndex = i;
                }
            });
            course.report[categoryIndex].assingments[assignmentIndex].score.earned = earned;
            grades[courseIndex].report[categoryIndex].assingments[assignmentIndex].score.earned = earned;
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