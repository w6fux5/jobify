import React, { useState } from 'react';

import { useAppContext } from '../../context/AppContext';

import Wrapper from '../../assets/wrappers/DashboardFormPage';

import { FormRow, Alert } from '../../components';

const Profile = () => {
  const { user, userLocation, displayAlert, showAlert, updateUser, isLoading } =
    useAppContext();

  const [formData, setFormData] = useState({
    name: user?.name,
    lastName: user?.lastName,
    email: user?.email,
    location: userLocation,
  });

  const onChangeHandler = ({ target }) => {
    const { name, value } = target || {};
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const { name, lastName, email, location } = formData;
    if (!name || !lastName || !email || !location) {
      displayAlert();
      return;
    }
    updateUser(formData);
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={onSubmitHandler}>
        <h3>ProFile</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow
            type="text"
            name="name"
            label="Name"
            onChange={onChangeHandler}
            value={formData.name}
          />
          <FormRow
            type="text"
            name="lastName"
            label="Last Name"
            onChange={onChangeHandler}
            value={formData.lastName}
          />
          <FormRow
            type="text"
            name="email"
            label="Email"
            onChange={onChangeHandler}
            value={formData.email}
          />
          <FormRow
            type="text"
            name="location"
            label="Location"
            onChange={onChangeHandler}
            value={formData.location}
          />
          <button className="btn btn-block" type="submit">
            {isLoading ? 'Loading...' : 'Save Change'}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Profile;
