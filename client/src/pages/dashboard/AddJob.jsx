import React from 'react';
import { FormRow, FormRowSelect, Alert } from '../../components';
import Wrapper from '../../assets/wrappers/DashboardFormPage';

import { useAppContext } from '../../context/AppContext';

const AddJob = () => {
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    handleChange,
    clearValues,
    createJob,
    editJobId,
  } = useAppContext();

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (!position || !company || !jobLocation) {
      displayAlert();
      return;
    }

    if (isEditing) {
      // TODO edit job logic
      return;
    }

    createJob();
  };

  const jobInputHandler = ({ target }) => {
    const { name, value } = target;
    handleChange({ name, value });
  };
  return (
    <Wrapper>
      <form onSubmit={onSubmitHandler} className="form">
        <h3>{isEditing ? 'edit job' : 'add job'}</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          {/* position */}
          <FormRow
            type="text"
            name="position"
            label="Position"
            value={position}
            onChange={jobInputHandler}
          />
          {/* company */}
          <FormRow
            type="text"
            name="company"
            label="Company"
            value={company}
            onChange={jobInputHandler}
          />

          {/* location */}
          <FormRow
            type="text"
            label="Job Location"
            name="jobLocation"
            value={jobLocation}
            onChange={jobInputHandler}
          />

          {/* job status */}
          <FormRowSelect
            name="status"
            label="Status"
            value={status}
            list={statusOptions}
            onChange={jobInputHandler}
          />

          {/* job type */}
          <FormRowSelect
            name="jobType"
            label="Job Type"
            value={jobType}
            list={jobTypeOptions}
            onChange={jobInputHandler}
          />
          {/* btn container */}
          <div className="btn-container">
            <button
              type="submit"
              className="btn btn-block submit-btn"
              // onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'submit'}
            </button>
            <button
              type="button"
              className="btn btn-block clear-btn"
              onClick={clearValues}
            >
              clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddJob;
