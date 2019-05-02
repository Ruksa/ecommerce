import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

const NavBar=({totalCounters}) => {
    return ( 
        <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand " href="#">
         Navbar{" "}
        <span className="badge badge-pill badge-secondary">
             {totalCounters}
        </span>
        </a>
        <NavLink to="/movies">Movies </NavLink>
        
      </nav>
     );

};

 
export default NavBar;