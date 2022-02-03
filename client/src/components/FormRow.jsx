import React from 'react';

const FormRow = ({ type, name, value, onChange, label }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {label || name}
      </label>
      <input
        id={name}
        className="form-input"
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        autoComplete="off"
      />
    </div>
  );
};

export default FormRow;
