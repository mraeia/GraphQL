import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import AuthContext from './context/auth-context';


class Login extends Component{

    static contextType = AuthContext;

    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: '',
            submit: false
        }
    }

    login = (data) => {
        console.log(data);
        this.context.login(data.login.token,data.login.id,data.login.tokenExpiration);
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.setState({submit:true});
    }

    render(){
        return (
            <div>
                {this.state.submit ? <Login email={this.state.email} password={this.state.password} login={this.login}/>: null}
                <form onSubmit={this.onSubmit}>
                    <input type="email" placeholder="Email" name="email" value={this.state.email} onChange={this.handleChange} required></input>
                    <input type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange} required></input>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

const query = gql`
    query Login($email: String!,$password: String!){
        login(email: $email,password: $password){
            id
            token
            tokenExpiration
        }
    }
`;

export default Login;