import React from 'react';
export type MenuProps = {
  title: string;
  warning?: boolean;
  handleClick: () => any;
};
export default function MenuBar({ title, warning, handleClick }: MenuProps) {
  return (
    <button
      type="button"
      className="px-2 py-2 w-full flex"
      onClick={handleClick}
    >
      <p
        className={
          warning ? 'text-Body-2 text-Red-02' : 'text-Body-2 text-Gray-09'
        }
      >
        {title}
      </p>
    </button>
  );
}
