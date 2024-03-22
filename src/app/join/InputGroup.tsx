import React from 'react';
import { FieldError, RegisterOptions, useForm } from 'react-hook-form';

type InputProps = {
  label: string;
  name: string;
  placeholder: string;
  type: string;
  register: () => any;
  error?: FieldError;
};

export default function InputGroup({
  label,
  name,
  placeholder,
  type,
  register,
  error,
}: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name}>{label}</label>
      <input
        {...register()}
        placeholder={placeholder}
        type={type}
        className="border rounded-sm p-2 outline-none"
      />
      {error && <small className="text-red-500">{error.message}</small>}
    </div>
  );
}
