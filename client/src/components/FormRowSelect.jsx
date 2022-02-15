const FormRowSelect = ({ label, name, value, onChange, list }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="form-select"
      >
        {list?.map((itemValue, index) => {
          return (
            <option key={index} value={itemValue}>
              {itemValue}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormRowSelect;
