'use client';
import React, { Dispatch, createContext, useContext, useState } from 'react';

interface CategoryContextProps {
  categoryState: { id: number | undefined };
  setCategoryState: Dispatch<any>;
}

export const CategoryContext = createContext<CategoryContextProps>({
  categoryState: { id: undefined },
  setCategoryState: () => {},
});

export const CategoryContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [categoryState, setCategoryState] = useState({ id: undefined });
  return (
    <CategoryContext.Provider value={{ categoryState, setCategoryState }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategoryContext = () => useContext(CategoryContext);
