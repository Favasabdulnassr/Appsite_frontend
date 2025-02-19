import React from 'react';

const FormField = ({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  error, 
  options = [], 
  ...props 
}) => {
  const renderField = () => {
    switch(type) {
      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={onChange}
            className={`form-input ${error ? 'form-input-error' : ''}`}
            {...props}
          />
        );
      case 'select':
        return (
          <select
            value={value}
            onChange={onChange}
            className={`form-input ${error ? 'form-input-error' : ''}`}
            {...props}
          >
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      default:
        return (
          <input
            type={type}
            value={value}
            onChange={onChange}
            className={`form-input ${error ? 'form-input-error' : ''}`}
            {...props}
          />
        );
    }
  };

  return (
    <div className="form-group">
      {label && <label className="form-label">{label}</label>}
      {renderField()}
      {error && <span className="form-error">{error}</span>}
    </div>
  );
};

export default FormField;