'use client';
import React, { Dispatch, createContext, useContext, useState } from 'react';

interface CategoryContextProps {
  categoryState: { id: number | null; name: string };
  setCategoryState: Dispatch<any>;
}

export const CategoryContext = createContext<CategoryContextProps>({
  categoryState: { id: null, name: '' },
  setCategoryState: () => {},
});

export const CategoryContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [categoryState, setCategoryState] = useState({
    id: null,
    name: '',
  });
  return (
    <CategoryContext.Provider value={{ categoryState, setCategoryState }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategoryContext = () => useContext(CategoryContext);
