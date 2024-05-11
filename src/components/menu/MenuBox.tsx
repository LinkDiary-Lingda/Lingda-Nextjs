import React from 'react';
import MenuBar, { MenuProps } from './MenuBar';

type Props = {
  menus: MenuProps[];
  position?: string;
};

export default function MenuBox({ menus, position }: Props) {
  return (
    <div
      className={`w-32 px-1 py-1 rounded-lg bg-white shadow-xl overflow-hidden absolute top-10 border ${position}`}
    >
      {menus.map(({ title, warning, handleClick }) => (
        <MenuBar
          key={title}
          title={title}
          warning={warning}
          handleClick={handleClick}
        />
      ))}
    </div>
  );
}
