import React from 'react';
import { FieldErrors } from 'react-hook-form';
import cls from 'classnames';

type NextButtonPros = {
  text: string;
  errors: FieldErrors;
};
export default function NextButton({ text, errors }: NextButtonPros) {
  return (
    <button
      type="submit"
      className={cls(
        'w-full h-[56px] text-On-Primary rounded-lg font-bold text-Body-1',
        {
          'bg-Primary': Object.keys(errors).length < 1,
          'bg-Primary-Container': Object.keys(errors).length > 0,
        }
      )}
      disabled={Object.keys(errors).length !== 0}
    >
      {text}
    </button>
  );
}
