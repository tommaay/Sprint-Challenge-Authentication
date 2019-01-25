import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Nav = styled.nav`
   width: 100%;
   padding: 15px;
   background: red;
   text-align: center;
   margin-bottom: 30px;
`;

export const NavItem = styled(NavLink)`
   color: white;
   font-size: 1.7rem;
   margin: 0 10px;
   text-decoration: none;
`;
