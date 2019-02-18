import React, {Component} from "react";
import {connect} from 'react-redux';


import history from "../../../history";
import * as actions from "../../actions";
import { calculateGrade } from "../../helpers/grades";

const Category = ({category, weight, score, assignments, remainingWeight}) => {
    return(
        <div>
            <table className="category-header">
                <span>
                    {category}
                </span>
                {   weight != "" &&
                    <span>
                        {weight != "00" ? weight : remainingWeight}%
                    </span>
                }
            </table>
            <table className="assignment-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Assignment</th>
                        <th>Score</th>
                        <th>Total</th>
                        <th>%</th>
                    </tr>
                </thead>
                <tbody>
                    { assignments.map((a, i) => {
                        const {date, title, score} = a;
                        const {earned, total} = score;
                        return(
                            <tr>
                                <td>{date}</td>
                                <td>{title}</td>
                                <td><a onClick={() => alert("Your Earned "+earned)}>{earned}</a></td>
                                <td>{total}</td>
                                <td>{(earned == "*" || total == 0) ? "" : (earned/total*100).toFixed(2)}</td>
                            </tr>
                        )
                    })
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <th>Date</th>
                        <th>Assignment</th>
                        <th>Score</th>
                        <th>Total</th>
                        <th>%</th>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}

class CourseScreen extends Component{
    render(){
        const {info, report} = this.props;
        const {course, period, instructor} = info;
        let categoryWeights = 0;
        report.forEach((cat) => {
            categoryWeights += parseFloat(cat.weight);
        });
        let remainingWeight = 100 - categoryWeights;
        return(
            <div className="grade-container">
                <h1>{course}</h1>
                <h3>Grade: {calculateGrade(report)}%</h3>
                <h3>Period: {period}</h3>
                <h3>{instructor}</h3>
                <a onClick={() => history.push("/grades")} className="back-button">Return To Schedule</a>
                {   report.map((cat) => {
                        if(!cat.score.earned){
                            return <div></div>;
                        }
                        return Category({...cat, remainingWeight});
                    })
                }
            </div>
        )
    }
}

function mapStateToProps(state){
    const {course} = state.skyward;
    return{
        ...course
    }
}

export default connect(mapStateToProps, actions)(CourseScreen);