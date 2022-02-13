import React from 'react';
import { Link } from 'react-router-dom';
import main from '../assets/images/main.svg';
import Wrapper from '../assets/wrappers/LandingPage';
import { Logo } from '../components';

const LandingPage = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>

      <div className="container page">
        <div className="info">
          <h1>
            Job <span>tracking</span> app
          </h1>
          <p>
            Yuccie freegan beard mustache mixtape semiotics raw denim glossier
            unicorn kale chips quinoa poutine 8-bit. You probably haven't heard
            of them lyft tacos readymade microdosing food truck. Kombucha umami
            retro, slow-carb freegan cred lo-fi keffiyeh prism aesthetic
          </p>
          <Link to="/register" className="btn btn-hero">
            Login/Register
          </Link>
        </div>
        <img src={main} alt="main" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default LandingPage;
