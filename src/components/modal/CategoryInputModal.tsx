'use client';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import ColorPalete from './ColorPalete';
import { CategoryItem } from '@/types/category';
import cls from 'classnames';
import useCategory from '@/hooks/category/useCategory';

type Props = {
  isCategory: boolean;
  modalOn: boolean;
  closeModal: () => void;
  closeMenu: () => void;
  isEdit?: { id: number; name: string; color?: string } | null;
  dividerId: number | null;
};

export default function InputModal({
  isCategory,
  modalOn,
  closeModal,
  isEdit,
  closeMenu,
  dividerId,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      name: '',
      type: isCategory ? 'CATEGORY' : 'DIVIDER',
      color: isCategory ? '#F04242' : null,
      prevId: null,
      dividerId: dividerId,
    },
  });

  const { createCategoryQuery, editCategoryItemQuery } = useCategory();

  const onCreateSubmit: SubmitHandler<CategoryItem> = (item) => {
    createCategoryQuery(item);
    closeModal();
    closeMenu();
  };

  const onEditSubmit: SubmitHandler<CategoryItem> = (item) => {
    editCategoryItemQuery({
      id: isEdit?.id,
      name: item.name,
      color: item.color,
    });
    closeModal();
    closeMenu();
  };

  useEffect(() => {
    if (isEdit) {
      setValue('name', isEdit.name);
      if (isEdit.color) {
        setValue('color', isEdit.color);
      }
    }
  }, [isEdit, setValue]);

  return (
    <>
      {modalOn && (
        <>
          <section
            className="absolute flex justify-center items-center top-0 left-0 h-full w-full bg-opacity-50 bg-black z-30"
            onClick={() => {
              closeModal();
              closeMenu();
            }}
          >
            <div
              className="bg-white w-[312px] rounded-xl flex flex-col justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              <form
                onSubmit={handleSubmit(isEdit ? onEditSubmit : onCreateSubmit)}
              >
                <div className="flex flex-col items-center text-Body-1 gap-[10px] py-6 leading-Body-1 text-On-Surface-Primary">
                  <p>
                    {isCategory
                      ? '카테고리 이름과 색상을 설정해주세요.'
                      : '디바이더 이름을 설정해주세요.'}
                  </p>
                  <input
                    type="text"
                    className="border-2 border-Primary rounded-lg h-[56px] w-[264px] outline-none px-4 text-On-Surface-Primary font-semibold placeholder:text-On-Surface-Third placeholder:font-medium"
                    placeholder="이름을 입력하세요"
                    {...register('name', {
                      required: true,
                      maxLength: 15,
                    })}
                    defaultValue={isEdit?.name || ''}
                  />
                  {isCategory && (
                    <div className="w-[264px] flex items-center justify-center">
                      <ColorPalete setValue={setValue} value={isEdit?.color} />
                    </div>
                  )}
                </div>
                <div className="flex justify-between items-center font-semibold ">
                  <button
                    type="button"
                    className="h-[44px] flex-1 bg-Surface-Container-Lowest text-Body-1 text-Primary2 border-t border-Primary2 rounded-bl-xl"
                    onClick={() => {
                      closeModal();
                      closeMenu();
                    }}
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className={cls(
                      'h-[44px] flex-1 bg-Primary-01 text-On-Primary rounded-br-xl text-Body-2',
                      {
                        'bg-Primary-Container border-t border border-Primary-Container':
                          errors.name,
                        'bg-Primary2 border-t border-Primary2': !errors.name,
                      }
                    )}
                  >
                    {isEdit ? '수정하기' : '생성하기'}
                  </button>
                </div>
              </form>
            </div>
          </section>
        </>
      )}
    </>
  );
}
