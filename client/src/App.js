import React, { Component } from 'react';
import { BrowserRouter,Link,Route } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import AuthContext from './context/auth-context';

class App extends Component {
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
        <AuthContext.Provider>
          <Route exact path="/" component={Signup} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
        </AuthContext.Provider>
      </div>
    </BrowserRouter>
    )
  }
}

export default App;