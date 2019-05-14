import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authentication';

import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Stripe from './components/Stripe';
import Admin from './components/Admin';

import 'bootstrap/dist/css/bootstrap.min.css';
import Operator from './components/Operator';
import Dentist from './components/Dentist';

if(localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/login'
  }
}

class App extends Component {
  render() {
    return (
      <Provider store = { store }>
        <Router>
            <div>
                  <Route exact path="/" component={ Home } />
                  <Route  path="/register" component={ Register } />
                  <Route  path="/login" component={ Login } />
                  <Route  path="/admin" component={ Admin } />
                  <Route  path="/operator" component={ Operator } />
                  <Route  path="/dentist" component={ Dentist } />
                  <Route  path="/stripe" component={ Stripe } />

            </div>
          </Router>
        </Provider>
    );
  }
}



export default App;


