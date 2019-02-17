import React, {Component} from 'react';
import {connect} from 'react-redux';

//helpers
import {calculateGrade} from '../../helpers/grades';

class GradesScreen extends Component {
    render(){
        const {grades} = this.props;

        return(
            <div className="grade-container">
                <h1>My Grades</h1>
                <table className="grade-table">
                    <thead>
                        <tr>
                            <th>Period</th>
                            <th>Course</th>
                            <th>Instructor</th>
                            <th>Grade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {grades.map((g, i) => {
                            const {info, report} = g;
                            const {course, period, instructor} = info;
                            return(
                                <tr key={i}>
                                    <td>{period}</td>
                                    <td>{course}</td>
                                    <td>{instructor}</td>
                                    <td>{calculateGrade(report)}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>Period</th>
                            <th>Course</th>
                            <th>Instructor</th>
                            <th>Grade</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        );
    }
}

function mapStateToProps(state){
    const {grades} = state.skyward;
    return{
        grades
    }
}

export default connect(mapStateToProps, null)(GradesScreen);