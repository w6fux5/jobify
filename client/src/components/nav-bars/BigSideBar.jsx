import React from 'react';
import classnames from 'classnames';

import Wrapper from '../../assets/wrappers/BigSidebar';
import NavLinks from './NavLinks';
import Logo from '../Logo';

import { useAppContext } from '../../context/AppContext';

const BigSideBar = () => {
  const { showSideBar } = useAppContext();
  return (
    <Wrapper>
      <div
        className={`sidebar-container ${classnames({
          'show-sidebar': !showSideBar, // 配合smallSidebar, bigSideBar一開始要show出來，smallSideBar相反
        })}`}
      >
        <div className="container">
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
};

export default BigSideBar;
