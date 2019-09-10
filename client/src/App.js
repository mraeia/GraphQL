import React, { Component } from 'react';
import { BrowserRouter,Link,Route,Switch } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import setAuthorizationToken from './utils/setAuthorizationToken';
import { connect } from 'react-redux';
import {setCurrentUser} from './actions';
import jwt from 'jsonwebtoken';

class App extends Component {

  componentDidMount(){
    if (localStorage.jwt){
      setAuthorizationToken(localStorage.jwt);
      this.props.setCurrentUser(jwt.decode(localStorage.jwt));
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <ul>
            <li>
              <Link to="/">Signup</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>

          <hr />
            <div>
              {this.props.currentUser != null ? this.props.currentUser.firstName: null}
            </div>
            <Switch>
              <Route exact path="/" component={Signup} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
            </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = state => {
  return {  currentUser : state.currentUser };
};

export default connect(mapStateToProps,{setCurrentUser})(App);