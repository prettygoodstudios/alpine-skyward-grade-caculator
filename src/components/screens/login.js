import React, {Component} from "react";
import {connect} from "react-redux";

import * as actions from "../../actions";

class LoginScreen extends Component {

    constructor(){
        super();
        this.state = {
            username: "",
            password: "",
            loading: false,
            error: ""
        }
    }

    updateInput = (e) => {
        let x = {}
        x[e.target.id] = e.target.value;
        this.setState(x);
    }

    finished = (success) => {
        this.setState({loading: false});
        if(success){
            this.setState({error: ""});
        }else{
            this.setState({error: "Incorrect Credentials"});
        }
    }

    getGrades = (term, username, password) => {
        this.setState({loading: true});
        this.props.getGrades("Q3", username, password, (response) => this.finished(response));
    }

    render(){
        const {username, password, loading, error} = this.state;
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
                <button onClick={() => this.getGrades("Q3", username, password)}>Log In</button>
            </div>
        )
    }
}



export default connect(null, actions)(LoginScreen);