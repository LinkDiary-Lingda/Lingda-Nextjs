'use client';
import React, { useState } from 'react';
import { FieldError, UseFormSetValue } from 'react-hook-form';
import { MdCancel } from 'react-icons/md';
import { IoIosAlert } from 'react-icons/io';
import cls from 'classnames';

type InputProps = {
  label?: string;
  placeholder: string;
  type: string;
  register: () => any;
  onDelete?: () => void;
  error?: FieldError;
};

export default function InputGroup({
  label,
  placeholder,
  type,
  register,
  onDelete,
  error,
}: InputProps) {
  const [value, setValue] = useState('');
  const { onChange, name } = register();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChange(e);
  };
  return (
    <div className="flex flex-col gap-1">
      {label && <label htmlFor={name}>{label}</label>}
      <div
        className={cls(
          'flex flex-row items-center justify-between w-[312px] h-[56px] px-4 border rounded-md',
          { 'border-Gray-02': !error || !value },
          { 'border-Primary-02': value },
          { 'border-Red-02': error }
        )}
      >
        <input
          {...register()}
          onChange={handleInputChange}
          placeholder={placeholder}
          type={type}
          className="outline-none placeholder:text-Gray-06 text-semibold h-[54px] w-[280px]"
        />
        <div className="flex flex-row gap-2">
          {onDelete && (
            <button
              type="button"
              className=" outline-none"
              onClick={() => {
                setValue('');
                onDelete();
              }}
            >
              <MdCancel color="#9E9E9E" />
            </button>
          )}
          {error && <IoIosAlert color="#F04242" />}
        </div>
      </div>
      {error && <small className="text-red-500">{error.message}</small>}
    </div>
  );
}
