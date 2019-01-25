import React from 'react';
import { NavItem } from '../../styled/nav';

const SignedoutLinks = () => {
   return (
      <React.Fragment>
         <NavItem to="/login">Login</NavItem>
         <NavItem to="/signup">Sign Up</NavItem>
      </React.Fragment>
   );
};

export default SignedoutLinks;
