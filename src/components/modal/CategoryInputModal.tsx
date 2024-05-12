'use client';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import ColorPalete from './ColorPalete';
import { CategoryItem } from '@/types/category';
import cls from 'classnames';
import {
  createCategoryItem,
  editCategoryItem,
  getCategoryItems,
} from '@/service/categoroy/category';
import { useSession } from 'next-auth/react';

type Props = {
  isCategory: boolean;
  modalOn: boolean;
  setModalOn: Dispatch<SetStateAction<boolean>>;
  isEdit?: { id: number; name: string; color?: string };
};

export default function InputModal({
  isCategory,
  modalOn,
  setModalOn,
  isEdit,
}: Props) {
  const { data }: any = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      name: '',
      type: isCategory ? 'CATEGORY' : 'DIVIDER',
      color: isCategory ? '#F04242' : null,
      prevId: null,
      dividerId: null,
    },
  });

  const onCreateSubmit: SubmitHandler<CategoryItem> = async (item) => {
    try {
      await createCategoryItem(item, data.accessToken);
      setModalOn(false);
      const categories = await getCategoryItems(data.accessToken);
    } catch (error) {
      console.log(error);
    }
  };

  const onEditSubmit: SubmitHandler<CategoryItem> = async (item) => {
    try {
      if (isEdit) {
        await editCategoryItem({
          id: isEdit.id,
          name: item.name,
          color: item.color,
          token: data.accessToken,
        });
        setModalOn(false);
        const categories = await getCategoryItems(data.accessToken);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {modalOn && (
        <>
          {isEdit ? (
            <section
              className="absolute flex justify-center items-center top-0 -left-2 h-full w-[360px] bg-opacity-50 bg-black z-30"
              onClick={() => setModalOn(false)}
            >
              <div
                className="bg-white w-[312px] rounded-xl flex flex-col justify-between"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <form onSubmit={handleSubmit(onEditSubmit)}>
                  <div className="flex flex-col items-center text-Body-1 gap-2 pt-8 pb-8 leading-Body-1">
                    {isCategory ? (
                      <p>카테고리 이름과 색상을 설정해주세요.</p>
                    ) : (
                      <p>디바이더 이름을 설정해주세요.</p>
                    )}
                    <input
                      type="text"
                      className="border-2 border-Primary-03 rounded-lg h-[56px] w-[264px] outline-none px-4"
                      placeholder={isEdit.name}
                      {...register('name', {
                        required: true,
                        maxLength: 15,
                      })}
                      defaultValue={isEdit.name}
                    />
                    {isCategory && <ColorPalete setValue={setValue} />}
                  </div>
                  <div className="flex justify-between items-center font-semibold text-Body-2">
                    <button
                      type="button"
                      className="h-[44px] flex-1 text-Primary-04 border-t border-Primary-02"
                      onClick={() => setModalOn(false)}
                    >
                      취소
                    </button>
                    <button
                      type="submit"
                      className={cls(
                        'h-[44px] flex-1 bg-Primary-01 text-white rounded-br-xl',
                        {
                          'bg-Primary-01 border-t border-Primary-01':
                            errors.name,
                          'bg-Primary-02  border-t border-Primary-02':
                            !errors.name,
                        }
                      )}
                    >
                      수정하기
                    </button>
                  </div>
                </form>
              </div>
            </section>
          ) : (
            <section
              className="absolute flex justify-center items-center top-0 -left-2 h-full w-[360px] bg-opacity-50 bg-black z-30"
              onClick={() => setModalOn(false)}
            >
              <div
                className="bg-white w-[312px] rounded-xl flex flex-col justify-between"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <form onSubmit={handleSubmit(onCreateSubmit)}>
                  <div className="flex flex-col items-center text-Body-1 gap-2 pt-8 pb-6 leading-Body-1">
                    {isCategory ? (
                      <p>카테고리 이름과 색상을 설정해주세요.</p>
                    ) : (
                      <p>디바이더 이름을 설정해주세요.</p>
                    )}
                    <input
                      type="text"
                      className="border rounded-lg h-[56px] w-[264px] outline-none px-4"
                      {...register('name', {
                        required: true,
                        maxLength: 15,
                      })}
                    />
                    {isCategory && <ColorPalete setValue={setValue} />}
                  </div>
                  <div className="flex justify-between items-center font-semibold text-Body-2">
                    <button
                      type="button"
                      className="h-[44px] flex-1 text-Primary-04 border-t border-Primary-02"
                      onClick={() => {
                        setModalOn(false);
                      }}
                    >
                      취소
                    </button>
                    <button
                      type="submit"
                      className={cls(
                        'h-[44px] flex-1 bg-Primary-01 text-white rounded-br-xl',
                        {
                          'bg-Primary-01 border-t border-Primary-01':
                            errors.name,
                          'bg-Primary-02  border-t border-Primary-02':
                            !errors.name,
                        }
                      )}
                    >
                      생성하기
                    </button>
                  </div>
                </form>
              </div>
            </section>
          )}
        </>
      )}
    </>
  );
}
