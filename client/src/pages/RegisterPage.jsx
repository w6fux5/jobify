import React, { useState, useEffect } from 'react';
import { Logo, FormRow, Alert } from '../components';
import Wrapper from '../assets/wrappers/RegisterPage';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
};

const RegisterPage = () => {
  // Router
  const navigate = useNavigate();

  // Context
  const { user, isLoading, showAlert, displayAlert, setupUser } =
    useAppContext();

  /// Init State
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (!user) return;
    navigate('/');
  }, [user, navigate]);

  const onChange = ({ target }) => {
    const { name, value } = target || {};
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = formData || {};

    if ((!isMember && !name) || !email || !password) {
      displayAlert();
      return;
    }

    const currentUser = { name, email, password };

    if (isMember) {
      setupUser({
        currentUser,
        endPoint: 'login',
        alert: '正在登入...',
      });
      return;
    }

    setupUser({
      currentUser,
      endPoint: 'register',
      alert: 'User created! Redirecting...',
    });
  };

  const onToggleIsMember = () => {
    setFormData((prev) => ({ ...prev, isMember: !prev.isMember }));
  };

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{formData.isMember ? 'Login' : 'Register'}</h3>

        {showAlert && <Alert />}

        {!formData.isMember && (
          <FormRow
            type="text"
            name="name"
            onChange={onChange}
            label="Name"
            value={formData.name}
          />
        )}

        <FormRow
          type="email"
          name="email"
          onChange={onChange}
          label="Email"
          value={formData.email}
        />
        <FormRow
          type="password"
          name="password"
          onChange={onChange}
          label="Password"
          value={formData.password}
        />

        <button type="submit" className="btn btn-block" disabled={isLoading}>
          Submit
        </button>

        <p>
          {formData.isMember ? 'Not a member yet ?' : 'Already a member ?'}

          <button
            type="button"
            className="member-btn"
            onClick={onToggleIsMember}
          >
            {formData.isMember ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default RegisterPage;
