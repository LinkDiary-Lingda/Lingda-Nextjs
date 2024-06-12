'use client';
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useForm } from 'react-hook-form';
import useTopic from '@/hooks/topic/useTopic';
import Image from 'next/image';
import addBtn from '../../images/topic-add-btn.png';
import deleteBtn from '../../images/image-delete-btn.png';
import cls from 'classnames';
import { currentCategoryState } from '@/atoms/categoryState';
import { useRecoilState } from 'recoil';
import { isValidUrl } from '@/utils/validation';
import BackHeader from '@/components/header/BackHeader';
import { useRouter } from 'next/navigation';
import { currentTopicState } from '@/atoms/topicState';
import { defaultTopic } from '@/types/topic';

export default function New() {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);
  const fileInput = useRef<HTMLInputElement>(null);
  const [currentCategory] = useRecoilState(currentCategoryState);
  const [currentTopic, setCurrentTopic] = useRecoilState(currentTopicState);
  const textarea = useRef<HTMLTextAreaElement>(null);
  const handleResizeHeight = () => {
    if (textarea.current) {
      textarea.current.style.height = 'auto';
      textarea.current.style.height = textarea.current.scrollHeight + 'px';
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      name: currentTopic.name || '',
      categoryId: currentCategory?.id || null,
      categoryName: currentCategory?.name || null,
      contentRequest: {
        textContents: currentTopic.contentRequest.textContents,
        imageContents: currentTopic.contentRequest.imageContents,
        urlContents: currentTopic.contentRequest.urlContents,
      },
    },
  });

  const watchedUrls = watch('contentRequest.urlContents');

  useEffect(() => {
    if (watchedUrls.length === 0 || watchedUrls[watchedUrls.length - 1]?.url) {
      setValue('contentRequest.urlContents', [...watchedUrls, { url: '' }]);
    }
  }, [watchedUrls, setValue]);

  const { updateImageQuery, createTopicQuery } = useTopic();

  const handleUrlChange = useCallback(
    (index: number, value: string) => {
      const newUrls = [...watchedUrls];
      newUrls[index].url = value;
      setValue('contentRequest.urlContents', newUrls);
      setCurrentTopic((prevTopic) => {
        return {
          ...prevTopic,
          contentRequest: {
            ...prevTopic?.contentRequest,
            urlContents: newUrls,
          },
        };
      });
    },
    [setValue, watchedUrls, setCurrentTopic]
  );

  const renderLinkInputs = useMemo(() => {
    return watchedUrls.map((_, i) => (
      <div
        className="h-[55px] w-full flex flex-row gap-2 items-center border-b-[1px] border-Outline-Low"
        key={i + 'url_link'}
      >
        {(!watchedUrls[i]?.url || watchedUrls[i]?.url === '') && (
          <Image src={addBtn} width={20} height={20} alt="add-link-btn-img" />
        )}
        <input
          {...register(`contentRequest.urlContents.${i}.url`, {
            onChange: (e) => handleUrlChange(i, e.target.value),
          })}
          placeholder="링크 추가 하기 (선택사항)"
          className={cls(
            'w-full h-[53px] outline-none text-Body-1 placeholder:text-On-Surface-Third',
            {
              'text-On-Surface-Primary': !isValidUrl(watchedUrls[i]?.url),
              'text-Success': isValidUrl(watchedUrls[i]?.url),
            }
          )}
        />
      </div>
    ));
  }, [register, watchedUrls, handleUrlChange]);

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
      setCurrentTopic((prevTopic) => {
        return {
          ...prevTopic,
          contentRequest: {
            ...prevTopic.contentRequest,
            imageContents: [
              ...prevTopic.contentRequest.imageContents,
              { imageUrl: profileImageUrl },
            ],
          },
        };
      });
    }
  };

  const handleDeleteImage = (imageUrl: string) => {
    const newImages = images.filter((image) => image !== imageUrl);
    setImages(newImages);
    setValue(
      'contentRequest.imageContents',
      newImages.map((url) => ({ imageUrl: url }))
    );
    setCurrentTopic((prevTopic) => {
      return {
        ...prevTopic,
        contentRequest: {
          ...prevTopic.contentRequest,
          imageContents: newImages.map((url) => ({ imageUrl: url })),
        },
      };
    });
  };

  const handleSumbitBtn = (data: any) => {
    const filteredData = {
      ...data,
      contentRequest: {
        ...data.contentRequest,
        textContents: data.contentRequest.textContents.filter(
          (item: { text: string }) => item.text !== ''
        ),
        imageContents: data.contentRequest.imageContents.filter(
          (item: { imageUrl: string }) => item.imageUrl !== ''
        ),
        urlContents: data.contentRequest.urlContents.filter(
          (item: { url: string }) => item.url !== ''
        ),
      },
    };

    createTopicQuery(filteredData);
    setCurrentTopic(defaultTopic);
  };

  return (
    <>
      <BackHeader title="글 작성하기" />
      <div className="flex flex-col relative h-full w-full">
        <div className="flex flex-col items-center mt-4">
          <input
            {...register('name', {
              required: {
                value: true,
                message: '글 제목을 입력해주세요.',
              },
              onChange: (e) => {
                setCurrentTopic((prevTopic) => {
                  return {
                    ...prevTopic,
                    name: e.target.value,
                    contentRequest: {
                      ...prevTopic.contentRequest,
                    },
                  };
                });
              },
            })}
            placeholder="글 제목을 입력하세요."
            className="w-full h-[55px] border-b-[1px] border-Outline-Low outline-none text-Body-1 placeholder:text-On-Surface-Third text-On-Surface-Primary"
          />
          {errors.name && (
            <small className="w-full mt-1 text-start text-Red-02 text-Detail-1">
              {errors.name.message}
            </small>
          )}
          <div className="w-full h-[55px] border-b-[1px] border-Outline-Low flex items-center justify-between mb-6 gap-1">
            <input
              {...register('categoryName', {
                required: {
                  value: true,
                  message: '카테고리를 선택해주세요.',
                },
              })}
              placeholder="카테고리명을 입력하세요."
              className="w-full outline-none text-Body-1 disabled:bg-transparent placeholder:text-On-Surface-Third text-On-Surface-Primary"
              value={currentCategory?.name}
              disabled
            />
            <button
              className="h-6 w-24 bg-Surface-Container-Lowest border-[1px] border-Primary-02 text-Primary-02 text-Detail-1 font-bold rounded flex items-center justify-center"
              onClick={() => router.push('/new/category')}
            >
              카테고리 선택
            </button>
          </div>
          {errors.categoryName && (
            <small className="w-full -mt-6 text-start text-Red-02 text-Detail-1">
              {errors.categoryName.message}
            </small>
          )}
          {renderLinkInputs}
          <div className="relative mt-6 w-full flex gap-2 items-center border-b-[1px] border-Outline-Low">
            {!currentTopic.contentRequest.textContents[0].text && (
              <Image
                src={addBtn}
                width={20}
                height={20}
                alt="add-link-btn-img"
              />
            )}
            <textarea
              ref={textarea}
              onInput={handleResizeHeight}
              rows={1}
              defaultValue={currentTopic.contentRequest.textContents[0].text}
              onChange={(e) => {
                setValue('contentRequest.textContents.0.text', e.target.value);
                setCurrentTopic((prevTopic) => {
                  return {
                    ...prevTopic,
                    contentRequest: {
                      ...prevTopic.contentRequest,
                      textContents: [{ text: e.target.value }],
                    },
                  };
                });
              }}
              placeholder="내용 추가 하기 (선택사항)"
              className="w-full outline-none flex items-center justify-center h-[55px] py-[15px] resize-none box-border"
              style={{
                minHeight: 'calc(55px - 30px)',
              }}
            />
          </div>
          <div className="w-full mt-6">
            <div className="flex gap-3">
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
                <Image
                  src={addBtn}
                  width={32}
                  height={32}
                  alt="add-link-btn-img"
                />
              </button>
              {currentTopic.contentRequest.imageContents.length > 1 &&
                currentTopic.contentRequest.imageContents.map(
                  ({ imageUrl }) => (
                    <div
                      className="relative h-20 w-20 rounded-lg overflow-hidden"
                      key={imageUrl}
                    >
                      <button
                        className="absolute top-0 right-0 rounded-full"
                        onClick={() => handleDeleteImage(imageUrl)}
                      >
                        <Image
                          src={deleteBtn}
                          width={32}
                          height={32}
                          alt="delete-button-image"
                        />
                      </button>
                      <Image
                        height={80}
                        width={80}
                        src={imageUrl}
                        alt="added-topic-image"
                      />
                    </div>
                  )
                )}
            </div>
          </div>
        </div>
        <div className="absolute left-1/2 transform -translate-x-1/2 w-screen bottom-6 flex justify-center items-center border-t-[1px] border-Outline-Lowest">
          <button
            type="button"
            className={cls(
              'h-[56px] w-full max-w-[440px] mx-6 text-white rounded-lg mt-4',
              {
                'bg-Primary': Object.keys(errors).length < 1,
                'bg-Primary-Container': Object.keys(errors).length > 0,
              }
            )}
            disabled={Object.keys(errors).length !== 0}
            onClick={handleSubmit(handleSumbitBtn)}
          >
            작성하기
          </button>
        </div>
      </div>
    </>
  );
}
