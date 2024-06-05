'use client';
import React, { useState } from 'react';
import { FieldError, UseFormClearErrors } from 'react-hook-form';
import cls from 'classnames';

type InputProps = {
  label?: string;
  placeholder: string;
  type: string;
  register: () => any;
  error?: any;
  clearErrors?: UseFormClearErrors<any>;
};

export default function InputGroup({
  label,
  placeholder,
  type,
  register,
  error,
  clearErrors,
}: InputProps) {
  const [value, setValue] = useState('');
  const { onChange, name } = register();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (clearErrors) {
      clearErrors();
    }
    setValue(e.target.value);
    onChange(e);
  };

  return (
    <div className="w-full flex flex-col gap-1">
      {label && <label htmlFor={name}>{label}</label>}
      <div
        className={cls(
          'flex flex-row items-center justify-between w-full h-[56px] px-4 rounded-md',
          { 'border border-Error': error },
          { 'border border-Surface-Container': !error && !value },
          { 'border-2 border-Primary': value && !error }
        )}
      >
        <input
          {...register()}
          onChange={handleInputChange}
          placeholder={placeholder}
          type={type}
          className="outline-none placeholder:text-On-Surface-Third placeholder:font-medium w-full text-On-Surface-Primary font-semibold"
        />
      </div>
      {/* {error && <small className="text-Error">{error.message}</small>} */}
    </div>
  );
}
