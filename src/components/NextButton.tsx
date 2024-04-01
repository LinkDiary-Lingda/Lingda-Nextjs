import React from 'react';
import { FieldError, FieldErrors } from 'react-hook-form';
import cls from 'classnames';

type NextButtonPros = {
  text: string;
  errors: FieldErrors;
};
export default function NextButton({ text, errors }: NextButtonPros) {
  return (
    <button
      type="submit"
      className={cls('w-[312px] h-[56px] text-white rounded-lg', {
        'bg-Primary-02': Object.keys(errors).length < 1,
        'bg-Primary-01': Object.keys(errors).length > 0,
      })}
      disabled={Object.keys(errors).length !== 0}
    >
      {text}
    </button>
  );
}
