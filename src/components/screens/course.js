import React, {Component} from "react";
import {connect} from 'react-redux';


import history from "../../../history";
import * as actions from "../../actions";
import { calculateGrade } from "../../helpers/grades";

import Modal from "../widgets/modal";
import Error from "../widgets/error";

const Category = ({category, weight, score, assignments, remainingWeight, setGradeModal, index, setAssignmentModal}) => {
    return(
        <div key={index}>
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
            <a onClick={() => setAssignmentModal({categoryIndex: index})} className="button">Add Assignment</a>
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
                            <tr key={i}>
                                <td>{date}</td>
                                <td>{title}</td>
                                <td><a onClick={() => setGradeModal({assignmentIndex: i, categoryIndex: index, earned, total})}>{earned}</a></td>
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

    constructor(){
        super();
        this.state = {
            gradeModalVisible: false,
            gradeModalEarned: 0,
            gradeModalTotal: 0,
            gradeModalCategory: 0,
            gradeModalAssignment: 0,
            error: "",
            assignmentModalDate: "",
            assignmentModalScore: 0,
            assignmentModalTotal: 0,
            assignmentModalCategory: 0,
            assignmentModalVisible: false,
            assignmentModalTitle: ""
        }   
    }

    updateGradeInput = (e) => {
        this.setState({
            gradeModalEarned: e.target.value
        });
    }

    updateAssignmentInput = (key, e) => {
        let tempState = this.state;
        tempState[key] = e.target.value;
        this.setState({...tempState});
    }

    setGradeModal = ({assignmentIndex, categoryIndex, earned, total}) => {
        this.setState({
            gradeModalAssignment: assignmentIndex,
            gradeModalCategory: categoryIndex,
            gradeModalEarned: earned.toString(),
            gradeModalTotal: total,
            gradeModalVisible: true
        })
    }

    setAssignmentModal = ({categoryIndex}) => {
        this.setState({
            assignmentModalCategory: categoryIndex,
            assignmentModalVisible: true
        });
    }

    clearAssignmentModal = () => {
        this.setState({
            assignmentModalCategory: 0,
            assignmentModalScore: 0,
            assignmentModalTotal: 0,
            assignmentModalVisible: false,
            assignmentModalDate: "",
            error: "",
            assignmentModalTitle: ""
        });
    }

    sumbitAssignmentModal = () => {
        const {assignmentModalCategory, assignmentModalScore, assignmentModalTotal, assignmentModalDate, assignmentModalTitle} = this.state;
        if(/(0\d{1}|1[0-2])\/([0-2]\d{1}|3[0-1])\/(19|20)\d{2}/.test(assignmentModalDate)){
            if(assignmentModalTitle.length > 3){
                if(assignmentModalScore >= 0 && assignmentModalTotal >= 0){
                    const assignment = {
                        date: assignmentModalDate,
                        title: assignmentModalTitle,
                        score: {
                            earned: parseFloat(assignmentModalScore),
                            total: parseFloat(assignmentModalTotal)
                        }
                    }
                    this.props.addAssignment({categoryIndex: assignmentModalCategory, result: () => this.clearAssignmentModal(), assignment})
                }else{
                    this.setState({error: "You must enter a score greater than or equal to 0 and a total greater than or equal to 0."});
                }
            }else{
                this.setState({error: "Your assignment title must be atleast 4 characters long."});
            }
        }else{
            this.setState({error: "You must provide a date in the following format MM/DD/YYYY."});
        }
    }

    clearGradeModal = () => {
        this.setState({
            gradeModalAssignment: 0,
            gradeModalCategory: 0,
            gradeModalEarned: 0,
            gradeModalTotal: 0,
            gradeModalVisible: false,
            error: ""
        })
    }

    submitGradeModal = () => {
        const {gradeModalAssignment, gradeModalCategory, gradeModalEarned, gradeModalTotal} = this.state;
        if(parseFloat(gradeModalEarned) < 0 || !(gradeModalEarned.match(/^[0-9]+$/) != null) ){
            if(gradeModalEarned != "*"){
                this.setState({
                    error: "You must provide a number greater than or equal to 0."
                });
            }else{
                const currentEarned = this.props.report[gradeModalCategory].assignments[gradeModalAssignment].score.earned;
                const currentTotal = this.props.report[gradeModalCategory].assignments[gradeModalAssignment].score.total;
                const delta = currentEarned == "*" ? 0 : 0 - parseFloat(currentEarned);
                this.props.updateGrade({course: this.props, categoryIndex: gradeModalCategory, assignmentIndex: gradeModalAssignment, result: this.clearGradeModal, delta, deltaTotal: currentEarned == "*" ? 0 : -currentTotal});
            }
        }else{
            const currentEarned = this.props.report[gradeModalCategory].assignments[gradeModalAssignment].score.earned;
            const delta = currentEarned == "*" ? parseFloat(gradeModalEarned) : parseFloat(gradeModalEarned) - parseFloat(currentEarned);
            this.props.updateGrade({course: this.props, categoryIndex: gradeModalCategory, assignmentIndex: gradeModalAssignment, result: this.clearGradeModal, delta, deltaTotal: currentEarned == "*" ? parseFloat(gradeModalTotal) : 0});
        }
    }

    render(){
        const {info, report} = this.props;
        const {gradeModalVisible, gradeModalEarned, gradeModalAssignment, gradeModalTotal, gradeModalCategory, error, assignmentModalVisible, assignmentModalTitle, assignmentModalScore, assignmentModalTotal, assignmentModalDate} = this.state;
        const {course, period, instructor} = info;
        let categoryWeights = 0;
        report.forEach((cat) => {
            categoryWeights += parseFloat(cat.weight);
        });
        let remainingWeight = 100 - categoryWeights;
        return(
            <div className="grade-container">
                <Modal visible={gradeModalVisible} title="Edit Assignment Grade" submit={this.submitGradeModal} dismiss={this.clearGradeModal}>
                    <div className="assignment-modal">
                        <label for="grade" className="assignment-modal__label">Score</label>
                        <div className="assignment-modal__grade-input">
                            <input type="text" name="grade" id="grade" value={gradeModalEarned} onChange={(e) => this.updateGradeInput(e)}/>
                            <span>/{gradeModalTotal}</span>
                        </div>
                        <div className="assignment-modal__error">
                            <Error error={error}/>
                        </div>
                        <p>Note entering an * will mark an assignment as no count.</p>
                    </div>
                </Modal>
                <Modal visible={assignmentModalVisible} title="Add Assignment" submit={this.sumbitAssignmentModal} dismiss={this.clearAssignmentModal}>
                    <div className="assignment-modal">
                        <label for="title" className="assignment-modal__label">Title</label>
                        <input type="text" name="title" id="title" value={assignmentModalTitle} onChange={(e) => this.updateAssignmentInput("assignmentModalTitle", e)} style={{margin: "auto"}}/>
                        <label for="grade" className="assignment-modal__label">Score/Total</label>
                        <div className="assignment-modal__grade-input">
                            <input type="text" name="grade" id="grade" value={assignmentModalScore} onChange={(e) => this.updateAssignmentInput("assignmentModalScore", e)}/>
                            <span>/</span>
                            <input type="text" name="total" id="total" value={assignmentModalTotal} onChange={(e) => this.updateAssignmentInput("assignmentModalTotal", e)}/>
                        </div>
                        <label for="date" className="assignment-modal__label">Date</label>
                        <div className="assignment-modal__grade-input">
                            <input type="text" name="date" id="date" value={assignmentModalDate} onChange={(e) => this.updateAssignmentInput("assignmentModalDate", e)}/>
                        </div>
                        <div className="assignment-modal__error">
                            <Error error={error}/>
                        </div>
                    </div>
                </Modal>
                <h1>{course}</h1>
                <h3>Grade: {calculateGrade(report)}%</h3>
                <h3>Period: {period}</h3>
                <h3>{instructor}</h3>
                <a onClick={() => history.push("/grades")} className="button">Return To Schedule</a>
                {   report.map((cat, i) => {
                        if(!cat.score.earned){
                            return <div></div>;
                        }
                        return Category({...cat, remainingWeight, setGradeModal: this.setGradeModal, index: i, setAssignmentModal: this.setAssignmentModal});
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