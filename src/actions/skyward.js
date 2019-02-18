import axios from "axios";
import {GET_GRADES, GET_COURSE, UPDATE_GRADE} from "./types";
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

export const updateGrade = ({course, categoryIndex, assignmentIndex, delta, result}) => {
    return function(dispatch){
        const {report} = course;
        const assignment = report[categoryIndex].assignments[assignmentIndex];
        if(assignment.score.earned + delta < 0){
            result("You can not enter a score less than 0.");
        }else{
            dispatch({
                type: UPDATE_GRADE,
                payload: {
                    categoryIndex,
                    assignmentIndex,
                    earned: assignment.score.earned + delta
                }
            });
            result("Updated");
        }
    }
}


export const getCourse = (course) => {
    return {
        type: GET_COURSE,
        payload: course
    }
}


