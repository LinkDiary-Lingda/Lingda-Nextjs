import React from 'react';
import MenuBar, { MenuProps } from './MenuBar';

type Props = {
  menus: MenuProps[];
};

export default function MenuBox({ menus }: Props) {
  return (
    <div className="w-32 px-1 py-1 rounded-lg bg-white shadow-xl overflow-hidden absolute top-10 ">
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
