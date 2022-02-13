import React, { useState } from 'react';
import classnames from 'classnames';

import Wrapper from '../../assets/wrappers/Navbar';
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import { useAppContext } from '../../context/AppContext';
import Logo from '../../components/Logo';

const NavBar = () => {
  const [showLogout, setShowLogout] = useState(false);

  const { toggleSideBar, logoutUser, user } = useAppContext();
  return (
    <Wrapper>
      <div className="nav-center">
        <button
          type="button"
          className="toggle-btn"
          onClick={() => toggleSideBar()}
        >
          <FaAlignLeft />
        </button>

        <div style={{}}>
          <Logo />
          <h3 className="logo-text">Dashboard</h3>
        </div>

        <div className="btn-container">
          <button
            type="button"
            className="btn"
            onClick={() => setShowLogout(!showLogout)}
          >
            <FaUserCircle />
            <span>{user?.name}</span>
            <FaCaretDown />
          </button>

          <div
            className={classnames({
              dropdown: true,
              'show-dropdown': showLogout,
            })}
          >
            <button
              type="button"
              className="dropdown-btn"
              onClick={() => logoutUser()}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default NavBar;
