import React, { Component } from 'react';
import { Form, Label, Input, Button } from '../styled/form';

class Register extends Component {
   state = {
      username: '',
      password: '',
   };

   changeHandler = e => {
      e.preventDefault();
      this.setState({
         [e.target.id]: e.target.value,
      });
   };

   submitHandler = e => {
      e.preventDefault();
      this.props.register(this.state);
      this.setState({ username: '', password: '' });
      this.props.history.push('/jokes');
   };

   render() {
      return (
         <Form onSubmit={this.submitHandler}>
            <Label htmlFor="username">Username</Label>
            <Input
               type="text"
               name="username"
               id="username"
               onChange={this.changeHandler}
            />

            <Label htmlFor="password">Password</Label>
            <Input
               type="password"
               name="password"
               id="password"
               onChange={this.changeHandler}
            />

            <Button>Register</Button>
         </Form>
      );
   }
}

export default Register;
