import { GET_GRADES, GET_COURSE, UPDATE_GRADE, CLEAR_GRADES, ADD_ASSIGNMENT } from "../actions/types";

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
        case ADD_ASSIGNMENT:
            const {categoryIndex: catIndex, assignment} = action.payload;
            let grades2 = state.grades;
            let course2 = state.course;
            //course2.report[catIndex].assignments.push(assignment);
            let cIndex = 0;
            grades2.forEach((c, i) => {
                if(c.info.period == course2.info.period){
                    cIndex = i;
                }
            });
            grades2[cIndex].report[catIndex].assignments.push(assignment);
            //course2.report[catIndex].score.earned += assignment.score.earned;
            //course2.report[catIndex].score.total += assignment.score.total;
            grades2[cIndex].report[catIndex].score.earned += assignment.score.earned;
            grades2[cIndex].report[catIndex].score.total += assignment.score.total;
            return{
                ...state,
                course: course2,
                grades: grades2
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