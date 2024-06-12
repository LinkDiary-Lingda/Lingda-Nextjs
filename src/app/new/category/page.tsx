'use client';
import { CategoryProps, currentCategoryState } from '@/atoms/categoryState';
import BackHeader from '@/components/header/BackHeader';
import useCategory from '@/hooks/category/useCategory';
import { CategoryDividerItem } from '@/types/category';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import cls from 'classnames';
import RootCategoryItem from '@/components/header/categories/RootCategoryItem';
import DividerItem from '@/components/header/categories/DividerItem';

export default function Page() {
  const router = useRouter();
  const [, setCurrentCategory] = useRecoilState(currentCategoryState);
  const [selectedCategory, setSelectedCategory] = useState<CategoryProps>(null);
  const { categoriesQuery } = useCategory();

  const handleSubmitButton = () => {
    if (selectedCategory) {
      const { id, name } = selectedCategory;
      setCurrentCategory({ id, name });
      router.back();
    }
  };

  const renderCategory = (category: CategoryDividerItem, isNested = false) => (
    <li
      key={category.id}
      className={cls('h-14 flex items-center justify-between cursor-pointer ', {
        'bg-none border-none': isNested && selectedCategory?.id !== category.id,
        'border-b-[1px] border-Outline-Low':
          !isNested && selectedCategory?.id !== category.id,
        'border-[1px] border-On-Primary-Container bg-Primary-Container-Low':
          selectedCategory?.id === category.id,
      })}
      onClick={() => {
        setSelectedCategory({ id: category.id, name: category.name });
      }}
    >
      <RootCategoryItem
        categoryId={category.id}
        name={category.name}
        color={category.color!}
        dividerId={category.dividerId}
        forUIOnly={true}
      />
    </li>
  );

  const renderDivider = (divider: CategoryDividerItem) => (
    <li
      key={divider.id}
      className={cls(
        'flex flex-col justify-between border-b-[1px] border-Outline-Low'
      )}
    >
      <DividerItem
        name={divider.name}
        id={divider.id + ''}
        toggled={true}
        forUIOnly={true}
      />
      <ul className="pl-6">
        {divider.categories &&
          divider.categories.map((item) => {
            if (item.type === 'CATEGORY') {
              return renderCategory(item, true);
            }
            if (item.type === 'DIVIDER') {
              return renderDivider(item);
            }
          })}
      </ul>
    </li>
  );
  return (
    <>
      <BackHeader title="카테고리 설정" />
      <div className="flex flex-col relative h-full w-full">
        <div className="mt-4 text-Body-1">
          <ul>
            {categoriesQuery &&
              categoriesQuery.map((item) => {
                if (item.type === 'CATEGORY') {
                  return renderCategory(item);
                }
                if (item.type === 'DIVIDER') {
                  return renderDivider(item);
                }
              })}
          </ul>
        </div>
        <div className="absolute left-1/2 transform -translate-x-1/2 w-screen bottom-6 flex justify-center items-center border-t-[1px] border-Outline-Lowest">
          <button
            type="button"
            className={cls(
              'h-[56px] w-full max-w-[440px] mx-6 text-white rounded-lg mt-4',
              {
                'bg-Primary': selectedCategory,
                'bg-Primary-Container': !selectedCategory,
              }
            )}
            disabled={!selectedCategory}
            onClick={handleSubmitButton}
          >
            선택하기
          </button>
        </div>
      </div>
    </>
  );
}
