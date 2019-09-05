import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

class Signup extends Component{

    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: ''
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.mutate({
            variables: {
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName
            }
        });
    }
    render(){
        return (
            <form onSubmit={this.onSubmit}>
                <input type="email" placeholder="Email" name="email" value={this.state.email} onChange={this.handleChange} required></input>
                <input type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange} required></input>
                <input type="text" placeholder="FirstName" name="firstName" value={this.state.firstName} onChange={this.handleChange} required></input>
                <input type="text" placeholder="LastName" name="lastName" value={this.state.lastName} onChange={this.handleChange} required></input>
                <button type="submit">Signup!</button>
            </form>
        )
    }
}

const mutation = gql`
    mutation AddUser($email: String!,$password: String!,$firstName: String!,$lastName: String!){
        addUser(email: $email,password: $password, firstName: $firstName, lastName: $lastName){
            id
        }
    }
`;

export default graphql(mutation)(Signup);