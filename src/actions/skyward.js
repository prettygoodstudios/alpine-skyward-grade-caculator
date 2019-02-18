import axios from "axios";
import {GET_GRADES, GET_COURSE} from "./types";
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


export const getCourse = (course) => {
    return {
        type: GET_COURSE,
        payload: course
    }
}


