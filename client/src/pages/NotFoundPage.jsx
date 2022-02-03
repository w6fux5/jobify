import React from 'react';
import { Link } from 'react-router-dom';
import notFound from '../assets/images/not-found.svg';
import Wrapper from '../assets/wrappers/NotFoundPageWrapper';

const NotFoundPage = () => {
  return (
    <Wrapper className="full-page">
      <div>
        <img src={notFound} alt="not found" />
        <h3>Text</h3>
        <p>text</p>
        <Link to="/">Back Home</Link>
      </div>
    </Wrapper>
  );
};

export default NotFoundPage;
