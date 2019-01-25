import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';

import Login from './components/login';
import Register from './components/register';
import Jokes from './components/jokes';

class App extends Component {
   state = {
      jokes: [],
      message: null,
      token: null,
      isLoggedIn: false,
   };

   login() {
      axios
         .post('http://localhost:3300/api/login', creds)
         .then(res => {
            console.log('res.data', res.data);
            this.setState({ token: res.data.token });
            this.getJokes();
            console.log('login', state);
         })
         .catch(err => ({ message: 'Unable to login.' }));
   }

   register() {
      axios
         .post('http://localhost:3300/api/register')
         .then(res => {
            console.log('res.data', res.data);
            this.setState({ token: res.data.token });
            this.getJokes();
            console.log('register', state);
         })
         .catch(err => ({ message: 'Unable to register.' }));
   }

   getJokes() {
      axios
         .get('http://localhost:3300/api/jokes')
         .then(res => this.setState({ jokes: res.data.value }))
         .catch(err => this.setState({ message: 'Unable to fetch jokes' }));
   }

   render() {
      // console.log(this.state.jokes);
      return (
         <BrowserRouter>
            <div className="App">
               <Route
                  path="/login"
                  render={props => <Login {...props} login={this.login} />}
               />
               <Route
                  path="/register"
                  render={props => (
                     <Register {...props} register={this.register} />
                  )}
               />
               <Route
                  path="/jokes"
                  render={props => (
                     <Jokes {...props} getJokes={this.getJokes} />
                  )}
               />
            </div>
         </BrowserRouter>
      );
   }
}

export default App;
