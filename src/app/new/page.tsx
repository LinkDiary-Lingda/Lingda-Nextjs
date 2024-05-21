'use client';
import React, { ChangeEvent, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaCirclePlus } from 'react-icons/fa6';
import { useCategoryContext } from '@/context/CategoryContext';
import useTopic from '@/hooks/topic/useTopic';
import Image from 'next/image';
import cls from 'classnames';
import { defaultTopic } from '@/types/topic';

export default function New() {
  const [urlNum, setUrlNum] = useState(1);
  const [images, setImages] = useState<string[]>([]);
  const fileInput = useRef(null);
  const { categoryState } = useCategoryContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      name: '',
      categoryId: categoryState.id || null,
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

  const { updateImageQuery, createTopicQuery } = useTopic();

  const renderLinkInputs = useMemo(() => {
    const inputs = [];
    for (let i = 0; i < urlNum; i++) {
      inputs.push(
        <div
          className="h-[55px] w-[312px] flex flex-row gap-2 items-center border-b-2"
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
            className="w-[312px] h-[53px] outline-none"
          />
        </div>
      );
    }
    return inputs;
  }, [register, urlNum]);

  const handleImageBtn = () => {
    fileInput.current?.click();
  };

  const handleUploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const imageBody = e.target.files[0];
      const profileImageUrl = await updateImageQuery({
        imageBody,
        name: imageBody.name,
      });
      setImages((prev) => [...prev, profileImageUrl]);
      setValue(
        `contentRequest.imageContents.${images.length}.imageUrl`,
        profileImageUrl
      );
    }
  };

  const handleSumbitBtn = (data) => {
    createTopicQuery(data);
  };

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
        {errors.name && (
          <small className="w-full ml-8 mt-1 text-start text-Red-02">
            {errors.name.message}
          </small>
        )}
        <div className="w-[312px] h-[55px] border-b-2 text-Body-1 flex items-center justify-between mb-6">
          <p className="text-Primary-04">{categoryState.name || '전체보기'}</p>
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
          <div className="flex ml-3 gap-3">
            <button
              className="h-20 w-20 bg-Gray-02 rounded-lg flex items-center justify-center"
              type="button"
              onClick={handleImageBtn}
            >
              <input
                type="file"
                accept="image/*"
                ref={fileInput}
                className="hidden"
                onChange={handleUploadImage}
              />
              <FaCirclePlus color="#9E9E9E" size={21} />
            </button>
            {images.length > 0 &&
              images.map((imageUrl) => (
                <div
                  className="h-20 w-20 rounded-lg overflow-hidden"
                  key={imageUrl}
                >
                  <Image
                    height={80}
                    width={80}
                    src={imageUrl}
                    alt="added-topic-image"
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 flex justify-center items-center w-full">
        <button
          type="button"
          className={cls('w-[312px] h-[56px] text-white rounded-lg', {
            'bg-Primary-02': Object.keys(errors).length < 1,
            'bg-Primary-01': Object.keys(errors).length > 0,
          })}
          disabled={Object.keys(errors).length !== 0}
          onClick={handleSubmit(handleSumbitBtn)}
        >
          작성하기
        </button>
      </div>
    </div>
  );
}
