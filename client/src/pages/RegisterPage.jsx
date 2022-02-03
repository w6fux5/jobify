import React, { useState } from 'react';
import { Logo, FormRow, Alert } from '../components';
import Wrapper from '../assets/wrappers/RegisterPage';
import { useAppContext } from '../context/AppContext';

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
};

const RegisterPage = () => {
  const { isLoading, showAlert, displayAlert } = useAppContext();
  const [formData, setFormData] = useState(initialState);

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
    console.log(formData);
    setFormData(initialState);
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

        <button type="submit" className="btn btn-block">
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
