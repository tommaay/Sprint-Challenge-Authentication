import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';

import Login from './components/Login';
import Register from './components/Register';
import Jokes from './components/Jokes';
import SignedinLinks from './components/Nav/SignedinLinks';
import SignedoutLinks from './components/Nav/SignedoutLinks';

import { Nav } from './styled/nav';

class App extends Component {
   state = {
      jokes: [],
      message: null,
      token: null,
      isLoggedIn: false,
   };

   componentWillReceiveProps() {}

   login = (creds, getJokes) => {
      axios
         .post('http://localhost:3300/api/login', creds)
         .then(res => {
            const token = res.data.token;

            localStorage.setItem('jwt', token);

            this.setState({ token: token, isLoggedIn: true });
            getJokes(token);
            console.log('jokes', getJokes);
         })
         .catch(err => ({ message: 'Unable to login.' }));
   };

   register = (creds, getJokes) => {
      axios
         .post('http://localhost:3300/api/register', creds)
         .then(res => {
            const token = res.data.token;

            localStorage.setItem('jwt', token);

            this.setState({ token: res.data.token, isLoggedIn: true });
            getJokes();
         })
         .catch(err => ({ message: 'Unable to register.' }));
   };

   logout = () => {
      localStorage.removeItem('jwt');
      this.setState({
         jokes: [],
         message: null,
         token: null,
         isLoggedIn: false,
      });
   };

   getJokes = token => {
      axios
         .get('http://localhost:3300/api/jokes', token)
         .then(res => this.setState({ jokes: res.data.value }))
         .catch(err => this.setState({ message: 'Unable to fetch jokes' }));
   };

   render() {
      console.log('render', this.state);

      const links = this.state.isLoggedIn ? (
         <SignedinLinks logout={this.logout} />
      ) : (
         <SignedoutLinks />
      );
      return (
         <BrowserRouter>
            <div className="App">
               <Nav>{links}</Nav>

               <Switch>
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
               </Switch>
            </div>
         </BrowserRouter>
      );
   }
}

export default App;
