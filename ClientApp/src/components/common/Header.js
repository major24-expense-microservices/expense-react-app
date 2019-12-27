import React from 'react';
import { NavLink } from 'react-router-dom';
import LoginOutHeader from './LoginOutHeader';

const Header = () => {
  const activeStyle = { color: '#F15B2A' };

  return (
    <nav>
      <NavLink to="/" activeStyle={activeStyle} exact>Home</NavLink>{ " | "}
      <NavLink to="/user-profile" activeStyle={activeStyle} exact>User Profile</NavLink>{ " | "}
      <LoginOutHeader />

      {/* <NavLink to="/courses" activeStyle={activeStyle} exact>Courses</NavLink>{ " | "}
      <NavLink to="/about" activeStyle={activeStyle}>About</NavLink> { " | "}
      <NavLink to="/sample-container" activeStyle={activeStyle}>Sample Container (misc)</NavLink> */}
    </nav>
  )
}

export default Header;
