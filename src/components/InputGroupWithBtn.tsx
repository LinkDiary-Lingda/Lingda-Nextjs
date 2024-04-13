'use client';
import React, { useState } from 'react';
import { FieldError } from 'react-hook-form';
import cls from 'classnames';

type InputProps = {
  label?: string;
  placeholder: string;
  type: string;
  register: () => any;
  btnTitle: string;
  btnOnClick: () => any;
  btnHandled: boolean;
  btnHandledMsg: string;
  setBtnState: (status: boolean) => void;
  error?: FieldError;
};

export default function InputGroupWithBtn({
  label,
  placeholder,
  type,
  register,
  btnTitle,
  btnOnClick,
  btnHandled,
  btnHandledMsg,
  setBtnState,
  error,
}: InputProps) {
  const [value, setValue] = useState('');
  const { onChange, name } = register();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setBtnState(false);
    onChange(e);
  };
  return (
    <div className="flex flex-col gap-1">
      {label && <label htmlFor={name}>{label}</label>}
      <div
        className={cls(
          'flex flex-row items-center justify-between w-[312px] h-[56px] px-4 border rounded-md',
          { 'border-Gray-02': !error || !value },
          { 'border-Primary-02': value && !btnHandled },
          { 'border-Blue-02': btnHandled },
          { 'border-Red-02': error }
        )}
      >
        <input
          {...register()}
          onChange={handleInputChange}
          placeholder={placeholder}
          type={type}
          className="outline-none placeholder:text-Gray-06 text-semibold h-[54px] w-[230px]"
        />
        <div>
          <button
            className={cls(
              'text-Detail-1 text-Gray-06 underline underline-offset-4',
              { 'text-Primary-04': value }
            )}
            onClick={btnOnClick}
          >
            {btnTitle}
          </button>
        </div>
      </div>
      {error && (
        <small role="alert" className="text-red-500">
          {error.message}
        </small>
      )}
      {btnHandledMsg && (
        <small role="inform" className="text-Blue-02">
          {btnHandledMsg}
        </small>
      )}
    </div>
  );
}
