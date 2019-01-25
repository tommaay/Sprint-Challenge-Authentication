import React, { Component } from 'react';
import { NavItem } from '../../styled/nav';

const SignedinLinks = () => {
   return (
      <React.Fragment>
         <NavItem to="/login" onClick={this.props.logout}>
            Sign Out
         </NavItem>
      </React.Fragment>
   );
};

export default SignedinLinks;
