import {GET_GRADES} from "./types";
//import skyward  from 'skyward-rest';


export const getGrades = (term, userId, password) => {
    console.log("Hello World");
    return function(dispatch){
        skyward(url)(userId, password)
        .then(student => {
            student.scrape(term)
            .then((grades) => {
                student.close();
                console.log(grades);
                dispatch({
                    type: GET_GRADES,
                    payload: grades
                });
            })
        });
    }
}