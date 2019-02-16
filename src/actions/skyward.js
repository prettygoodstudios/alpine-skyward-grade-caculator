import axios from "axios";
import {GET_GRADES} from "./types";
//import skyward  from 'skyward-rest';


export const getGrades = (term, userId, password, success) => {
    console.log("Hello World");
    return function(dispatch){
        axios.post("http://localhost:3010", {term: term, username: userId, password}).then(({data}) => {
            dispatch({
                type: GET_GRADES,
                payload: data
            });
            success(true);
        }).catch((e) => {
            console.log(e);
            success(false);
        });
    }
}