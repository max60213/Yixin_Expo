'use client';

import React, { useState, useEffect } from 'react';
import './form-input.css';

interface FormInputProps {
  type?: 'text' | 'email' | 'tel' | 'password' | 'number';
  placeholder?: string;
  required?: boolean;
  className?: string;
  disabled?: boolean;
  maxLength?: number;
  autoComplete?: string;
  error?: string;
  success?: boolean;
  id?: string;
  name?: string;
  defaultValue?: string;
}

const FormInput = ({
  type = 'text',
  placeholder,
  required = false,
  className = '',
  disabled = false,
  maxLength,
  autoComplete,
  error,
  success = false,
  id,
  name,
  defaultValue = ''
}: FormInputProps) => {
  const [value, setValue] = useState(defaultValue);

  // 當 defaultValue 改變時更新 value
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const getInputClassName = () => {
    const baseClass = 'form-input';
    const classes = [baseClass];
    
    if (disabled) classes.push(`${baseClass}--disabled`);
    if (error) classes.push(`${baseClass}--error`);
    if (success) classes.push(`${baseClass}--success`);
    if (value && value.length > 0) classes.push(`${baseClass}--has-value`);
    if (className) classes.push(className);
    
    return classes.join(' ');
  };

  return (
    <div className="form-input-wrapper">
      <div className={getInputClassName()}>
        <input
          type={type}
          value={value}
          onChange={handleChange}
          required={required}
          disabled={disabled}
          maxLength={maxLength}
          autoComplete={autoComplete}
          id={id}
          name={name}
          className="form-input__field noto-sans-tc"
        />
        {placeholder && (
          <div className="form-input__placeholder noto-sans-tc">{placeholder}</div>
        )}
      </div>
      {error && (
        <div className="form-input__error noto-sans-tc">
          {Array.isArray(error) ? (
            <ul className="form-input__error-list">
              {error.map((err, index) => (
                <li key={index}>{err}</li>
              ))}
            </ul>
          ) : (
            <span>{error}</span>
          )}
        </div>
      )}
    </div>
  );
};

export default FormInput;
