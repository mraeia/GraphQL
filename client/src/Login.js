import React, { Component } from 'react';
import AuthContext from './context/auth-context';
import axios from 'axios';
import setAuthorizationToken from './utils/setAuthorizationToken';
import jwt from 'jsonwebtoken';
import {setCurrentUser} from './actions';
import { connect } from 'react-redux';


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

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();

        const query = {
            query: `
                query {
                    login(email: "${this.state.email}", password: "${this.state.password}"){
                        id
                        token
                        tokenExpiration
                    }
                }`
        };


        axios({
            method: 'post',
            url: 'http://localhost:3001/graphql',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(query)
          }).then(result => {
              const token = result.data.data.login.token;
              localStorage.setItem('jwt', token);
              setAuthorizationToken(token);
              this.props.setCurrentUser(jwt.decode(token));
          });
    }

    render(){
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <input type="email" placeholder="Email" name="email" value={this.state.email} onChange={this.handleChange} required></input>
                    <input type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange} required></input>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default connect(null, {setCurrentUser})(Login);