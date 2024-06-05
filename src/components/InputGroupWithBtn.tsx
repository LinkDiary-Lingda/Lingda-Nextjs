'use client';
import React, { useState } from 'react';
import { UseFormClearErrors } from 'react-hook-form';
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
  error?: any;
  clearErrors: UseFormClearErrors<any>;
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
  clearErrors,
}: InputProps) {
  const [value, setValue] = useState('');
  const { onChange, name } = register();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearErrors();
    setValue(e.target.value);
    setBtnState(false);
    onChange(e);
  };
  return (
    <div className="w-full flex flex-col gap-1">
      {label && <label htmlFor={name}>{label}</label>}
      <div
        className={cls(
          'flex flex-row items-center justify-between h-[56px] px-4 rounded-md',
          { 'border border-Surface-Container': !error && !value },
          { 'border-2 border-Primary': value && !btnHandled && !error },
          { 'border border-Success': btnHandled },
          { 'border border-Error': error }
        )}
      >
        <input
          {...register()}
          onChange={handleInputChange}
          placeholder={placeholder}
          type={type}
          className="text-Body-1 outline-none placeholder:text-On-Surface-Third placeholder:font-medium text-On-Surface-Primary font-semibold w-[230px]"
        />
        <div>
          <button
            type="button"
            className={cls(
              'text-Detail-1 text-On-Surface-Third underline underline-offset-4 font-semibold',
              { 'text-Primary-04': value && !error }
            )}
            disabled={error || btnHandled}
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
        <small role="inform" className="text-Success">
          {btnHandledMsg}
        </small>
      )}
    </div>
  );
}
