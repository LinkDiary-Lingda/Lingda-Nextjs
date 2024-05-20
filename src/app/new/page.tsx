'use client';
import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import LinkInput from './LinkInput';
import { FaCirclePlus } from 'react-icons/fa6';
import { FaPlus } from 'react-icons/fa';
import NextButton from '@/components/NextButton';
import { useCategoryContext } from '@/context/CategoryContext';

export default function New() {
  const [urlNum, setUrlNum] = useState(1);
  const [textNum, setTextNum] = useState(1);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      categoryId: null,
      contentRequest: {
        textContents: [
          {
            text: '',
          },
        ],
        imageContents: [
          {
            imageUrl: '',
          },
        ],
        urlContents: [
          {
            url: '',
          },
        ],
      },
    },
  });
  const { categoryState } = useCategoryContext();

  const renderLinkInputs = useMemo(() => {
    const inputs = [];
    for (let i = 0; i < urlNum; i++) {
      inputs.push(
        <div
          className="mt-6 w-[312px]  flex flex-row gap-2 items-center border-b-2"
          key={i + 'urlLink'}
        >
          <button
            type="button"
            aria-label="add-link-button"
            onClick={() => setUrlNum((prev) => prev + 1)}
          >
            <FaCirclePlus size={20} color="#9E9E9E" />
          </button>
          <input
            {...register(`contentRequest.urlContents.${i}.url`)}
            placeholder="링크 추가 하기 (선택사항)"
            className="w-[312px] h-[55px] outline-none"
          />
        </div>
      );
    }
    return inputs;
  }, [register, urlNum]);

  return (
    <div className="flex flex-col relative h-[90vh]">
      <div className="flex flex-col items-center mt-4">
        <input
          {...register('name', {
            required: {
              value: true,
              message: '글 제목을 입력해주세요.',
            },
          })}
          placeholder="글 제목을 입력하세요."
          className="w-[312px] h-[55px] border-b-2 outline-none text-Body-1"
        />
        <div className="w-[312px] h-[55px] border-b-2 text-Body-1 flex items-center justify-between">
          <p className="text-Primary-04">
            {categoryState.name || '최상위 디바이더'}
          </p>
          {/* <input
            // {...register('catego', {
            //   required: {
            //     value: true,
            //     message: '카테고리를 선택해주세요.',
            //   },
            // })}
            className="outline-none bg-none"
            value={categoryState.name || '최상위 디바이더'}
            disabled
          />
          <button className="h-6 px-2 border border-Primary-02 text-Primary-02 text-Detail-1 font-pretendardBold rounded-md">
            카테고리 선택
          </button> */}
        </div>
        {renderLinkInputs}
        <div className="mt-6 w-[312px]  flex flex-row gap-2 items-center border-b-2">
          <input
            {...register(`contentRequest.textContents.0.text`)}
            placeholder="내용 추가 하기 (선택사항)"
            className="w-[312px] h-[55px] outline-none"
          />
        </div>
        <div className="w-full mt-6">
          <div className="flex ml-3">
            <span className="h-20 w-20 bg-Gray-02 rounded-lg flex items-center justify-center">
              <FaCirclePlus color="#9E9E9E" size={21} />
            </span>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 flex justify-center items-center w-full">
        <NextButton text="작성하기" errors={errors} />
      </div>
    </div>
  );
}
