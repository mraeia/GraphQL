import React, { Component } from 'react';


class Login extends Component{

    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: ''
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
                password: this.state.password
            }
        });
    }
    render(){
        return (
            <form onSubmit={this.onSubmit}>
                <input type="email" placeholder="Email" name="email" value={this.state.email} onChange={this.handleChange} required></input>
                <input type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange} required></input>
                <button type="submit">Submit</button>
            </form>
        )
    }
}

export default Login;