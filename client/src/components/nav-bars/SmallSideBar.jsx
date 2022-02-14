import React from 'react';

import classnames from 'classnames';

import { FaTimes } from 'react-icons/fa';

import Wrapper from '../../assets/wrappers/SmallSidebar';
import NavLinks from './NavLinks';
import Logo from '../Logo';

import { useAppContext } from '../../context/AppContext';

const SmallSideBar = () => {
  const { toggleSideBar, showSideBar } = useAppContext();
  return (
    <Wrapper>
      <div
        className={classnames({
          'sidebar-container': true,
          'show-sidebar': showSideBar,
        })}
      >
        <div className="content">
          <button type="button" className="close-btn" onClick={toggleSideBar}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks toggleSideBar={toggleSideBar} />
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSideBar;
