import React, {Component} from "react";
import {connect} from "react-redux";

import * as actions from "../../actions";
import history from "../../../history";

import Error from "../widgets/error";

class LoginScreen extends Component {

    constructor(){
        super();
        this.state = {
            username: "",
            password: "",
            loading: false,
            error: "",
            term: "Q1"
        }
    }

    updateInput = (e) => {
        let x = {}
        x[e.target.id] = e.target.value;
        this.setState(x);
    }

    finished = ({success, error}) => {
        this.setState({loading: false});
        if(success){
            this.setState({error: ""});
            history.push("/grades");
        }else{
            this.setState({error});
        }
    }

    getGrades = (term, username, password) => {
        this.setState({loading: true});
        if(username != "" && password != ""){
            this.props.getGrades(term, username, password, (response) => this.finished(response));
        }else{
            this.setState({error: "You must provide a username and password", loading: false});
        }
    }

    render(){
        const {username, password, loading, error, term} = this.state;
        if(loading){
            return(
                <div className="login-form">
                    <h1>Loading...</h1>
                </div>
            );
        }
        return(
            <div className="login-form">
                <h1>Alpine School District</h1>
                <h3>Skyward Grade Calculator</h3>
                <p>Log In using your Alpine School District Skyward credentials.</p>
                <label for="username">User Name</label>
                <input type="text" name="username" id="username" value={username} onChange={this.updateInput}/>
                <label for="password">Password</label>
                <input type="password" name="password" id="password" value={password} onChange={this.updateInput}/>
                <label for="term">Term</label>
                <select name="term" id="term" value={term} onChange={this.updateInput}>
                    <option name="Q1" value="Q1">Term 1</option>
                    <option name="Q2" value="Q2">Term 2</option>
                    <option name="Q3" value="Q3">Term 3</option>
                    <option name="Q4" value="Q4">Term 4</option>
                </select>
                <button onClick={() => this.getGrades(term, username, password)}>Log In</button>
                <Error error={error}/>
            </div>
        )
    }
}



export default connect(null, actions)(LoginScreen);
