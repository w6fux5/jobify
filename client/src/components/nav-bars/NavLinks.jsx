import React from 'react';
import { NavLink } from 'react-router-dom';

import links from '../../utils/nav-link';

const NavLinks = ({ toggleSideBar }) => {
  return (
    <div className="nav-links">
      {links.map((link) => {
        const { id, path, text, icon } = link;

        return (
          <NavLink
            key={id}
            to={path}
            className="nav-link"
            onClick={toggleSideBar}
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;
