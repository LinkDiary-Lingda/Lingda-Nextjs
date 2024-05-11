'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import ColorPalete from './ColorPalete';

export default function InputModal({ isCategory }: { isCategory?: boolean }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
    clearErrors,
  } = useForm({
    defaultValues: {
      name: '',
      categoryType: 'CATEGORY',
      color: '#F04242',
      prevId: 0,
      dividerId: 0,
    },
  });
  const [modalOn, setModalOn] = useState(true);
  return (
    <>
      {modalOn && (
        <section className="absolute flex justify-center items-center top-0 -left-2 h-full w-[360px] bg-opacity-50 bg-black z-30">
          <div className="bg-white w-[312px] rounded-xl flex flex-col justify-between">
            <div className="flex flex-col items-center text-Body-1 gap-2 py-9 leading-Body-1">
              <p>카테고리 이름과 색상을 설정해주세요.</p>
              <input
                type="text"
                className="border rounded-lg h-[56px] w-[264px]"
                placeholder=""
                {...register('name', { required: true })}
              />
              <div>
                <ColorPalete />
              </div>
            </div>
            <div className="flex justify-between items-center border-t border-Primary-02 font-semibold text-Body-2">
              <button
                className="h-[44px] flex-1 text-Primary-04"
                onClick={() => {}}
              >
                취소
              </button>
              <button
                className="h-[44px] flex-1 bg-Primary-02 text-white rounded-br-xl"
                onClick={() => {}}
              >
                생성하기
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
