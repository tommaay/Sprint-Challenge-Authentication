import React, { Component } from 'react';
import { NavItem } from '../../styled/nav';

const SignedinLinks = props => {
   return (
      <React.Fragment>
         <NavItem to="/login" onClick={props.logout}>
            Sign Out
         </NavItem>
      </React.Fragment>
   );
};

export default SignedinLinks;
