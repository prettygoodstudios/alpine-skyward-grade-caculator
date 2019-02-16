import React, {Component} from "react";
import {connect} from "react-redux";

import * as actions from "../../actions";

class LoginScreen extends Component {

    constructor(){
        super();
        this.state = {
            username: "",
            password: ""
        }
    }

    updateInput = (e) => {
        let x = {}
        x[e.target.id] = e.target.value;
        this.setState(x);
    }

    render(){
        const {username, password} = this.state;
        const {getGrades} = this.props;
        return(
            <div className="login-form">
                <h1>Alpine School District</h1>
                <h3>Skyward Grade Calculator</h3>
                <p>Log In using your Alpine School District Skyward credentials.</p>
                <label for="username">User Name</label>
                <input type="text" name="username" id="username" value={username} onChange={this.updateInput}/>
                <label for="password">Password</label>
                <input type="password" name="password" id="password" value={password} onChange={this.updateInput}/>
                <button onClick={() => getGrades("Q3", username, password)}>Log In</button>
            </div>
        )
    }
}



export default connect(null, actions)(LoginScreen);