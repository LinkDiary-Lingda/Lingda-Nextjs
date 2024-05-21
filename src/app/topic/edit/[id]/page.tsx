'use client';
import React, {
  ChangeEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useForm } from 'react-hook-form';
import { FaCirclePlus } from 'react-icons/fa6';
import useTopic from '@/hooks/topic/useTopic';
import Image from 'next/image';
import cls from 'classnames';
import { useParams } from 'next/navigation';
import { TopicItem } from '@/types/topic';

export default function Edit() {
  const { id } = useParams();
  const [urlNum, setUrlNum] = useState(1);
  const [topic, setTopic] = useState<TopicItem>();
  const [images, setImages] = useState<string[] | undefined>(
    topic?.contentResponses.imageContents.map((image) => image.imageUrl)
  );
  const fileInput = useRef(null);
  const textarea = useRef<HTMLTextAreaElement>(null);
  const handleResizeHeight = () => {
    if (textarea.current) {
      textarea.current.style.height = 'auto';
      textarea.current.style.height = textarea.current.scrollHeight + 'px';
    }
  };

  const { updateImageQuery, createTopicQuery, topicDetailQuery } = useTopic();
  useEffect(() => {
    async function getTopic() {
      if (typeof id == 'string') {
        const topic = await topicDetailQuery(parseInt(id));
        setTopic(topic);
      }
    }
    getTopic();
  }, [id, topicDetailQuery]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      name: topic?.name,
      categoryId: topic?.categoryId,
      contentRequest: {
        textContents: topic?.contentResponses.textContents,
        imageContents: topic?.contentResponses.imageContents,
        urlContents: topic?.contentResponses.urlContents,
      },
    },
  });

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
    // fileInput.current?.click();
  };

  const handleUploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    // if (e.target.files) {
    //   const imageBody = e.target.files[0];
    //   const profileImageUrl = await updateImageQuery({
    //     imageBody,
    //     name: imageBody.name,
    //   });
    //   setImages((prev) => [...prev, profileImageUrl]);
    //   setValue(
    //     `contentRequest.imageContents.${images.length}.imageUrl`,
    //     profileImageUrl
    //   );
    // }
  };

  const handleSumbitBtn = (data: any) => {
    createTopicQuery(data);
  };

  return (
    <>
      {topic && (
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
              defaultValue={topic.name}
              className="w-[312px] h-[55px] border-b-2 outline-none text-Body-1"
            />
            {errors.name && (
              <small className="w-full ml-8 mt-1 text-start text-Red-02">
                {errors.name.message}
              </small>
            )}
            <div className="w-[312px] h-[55px] border-b-2 text-Body-1 flex items-center justify-between mb-6">
              <p className="text-Primary-04">{topic.categoryName}</p>
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
            {topic.contentResponses.urlContents.length > 0 &&
              topic.contentResponses.urlContents.map(({ url }, i) => (
                <div
                  className="h-[55px] w-[312px] flex flex-row gap-2 items-center border-b-2"
                  key={url}
                >
                  <button
                    type="button"
                    aria-label="add-link-button"
                    onClick={() => setUrlNum((prev) => prev + 1)}
                  >
                    <FaCirclePlus size={20} color="#9E9E9E" />
                  </button>
                  <input
                    defaultValue={url}
                    {...register(`contentRequest.urlContents.${i}.url`)}
                    className="w-[312px] h-[53px] outline-none"
                  />
                </div>
              ))}
            <div className="mt-6 w-[312px]  flex flex-row gap-2 items-center border-b-2">
              <textarea
                defaultValue={topic.contentResponses.textContents[0].text}
                ref={textarea}
                onInput={handleResizeHeight}
                rows={2}
                onChange={(e) => {
                  setValue(
                    'contentRequest.textContents.0.text',
                    e.target.value
                  );
                }}
                placeholder="내용 추가 하기 (선택사항)"
                className="w-[312px] outline-none resize-y"
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
                {topic.contentResponses.imageContents.length > 0 &&
                  topic.contentResponses.imageContents.map(({ imageUrl }) => (
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
              수정하기
            </button>
          </div>
        </div>
      )}
    </>
  );
}
