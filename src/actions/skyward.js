import axios from "axios";
import {GET_GRADES, GET_COURSE, UPDATE_GRADE, CLEAR_GRADES, ADD_ASSIGNMENT} from "./types";
//import skyward  from 'skyward-rest';


export const getGrades = (term, userId, password, success) => {
    console.log("Hello World");
    return function(dispatch){
        axios.post("http://localhost:3010", {term: term, username: userId, password}).then(({data}) => {
            if(!data.error){
                dispatch({
                    type: GET_GRADES,
                    payload: data
                });
                success(true);
            }else{
                success(false);
            }
        }).catch((e) => {
            success(false);
        });
    }
}

export const updateGrade = ({course, categoryIndex, assignmentIndex, delta, deltaTotal, result}) => {
    return function(dispatch){
        const {report} = course;
        const assignment = report[categoryIndex].assignments[assignmentIndex];
        const currentEarned = assignment.score.earned == "*" ? 0 : parseFloat(assignment.score.earned);
        if(currentEarned + delta < 0){
            result("You can not enter a score less than 0.");
        }else{
            dispatch({
                type: UPDATE_GRADE,
                payload: {
                    categoryIndex,
                    assignmentIndex,
                    earned: currentEarned + delta,
                    delta,
                    deltaTotal
                }
            });
            result("Updated");
        }
    }
}

export const addAssignment = ({categoryIndex, assignment, result}) => {
    return function(dispatch){
        const {date, title, score} = assignment;
        const {earned, total} = score;
        if(earned >= 0 && total >= 0){
            if(date && title.length > 3){
                dispatch({
                    type: ADD_ASSIGNMENT,
                    payload: {
                        categoryIndex,
                        assignment
                    }
                });
                result("Successfully added assignment.");
            }else{
                result("You must provide a valid date and a title greater than 3 characters long.");
            }
        }else{
            result("You must enter a score greater than or equal to 0 and enter in a total greater than or equal to 0.");
        }
    }
}


export const getCourse = (course) => {
    return {
        type: GET_COURSE,
        payload: course
    }
}

export const clearGrades = () => {
    return{
        type: CLEAR_GRADES,
        payload: {}
    }
}


