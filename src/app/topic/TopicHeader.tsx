'use client';
import { editTopicState } from '@/atoms/topicState';
import Alert from '@/components/Alert';
import MenuBox from '@/components/menu/MenuBox';
import useTopic from '@/hooks/topic/useTopic';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { IoMdArrowBack } from 'react-icons/io';
import { useRecoilState } from 'recoil';

export default function TopicHeader() {
  const { id } = useParams();

  const [menuOn, setMenuOn] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [deleteOn, setDeleteOn] = useState(false);
  const [editTopic, setEditTopic] = useRecoilState(editTopicState);

  const handleMenuBtn = () => {
    setMenuOn(!menuOn);
  };
  const router = useRouter();
  const menus = [
    {
      title: '수정하기',
      handleClick: () => {
        setIsEdit(true);
        setDeleteOn(false);
      },
    },
    {
      title: '삭제하기',
      warning: true,
      handleClick: () => {
        setDeleteOn(true);
        setIsEdit(false);
      },
    },
  ];

  const { trashTopicQuery } = useTopic();

  const handleDelete = () => {
    if (typeof id === 'string') {
      trashTopicQuery(parseInt(id));
    }
  };
  const hadleEdit = () => {
    if (typeof id === 'string') {
      setEditTopic(parseInt(id));
      router.push(`/new`);
    }
  };

  return (
    <>
      <nav>
        <ul className="flex flex-row justify-between items-center h-[48px] w-full">
          <li
            className="text-Heading-3 cursor-pointer"
            onClick={router.back}
            aria-label="go-back-button"
          >
            <IoMdArrowBack />
          </li>
          <li>
            <p className="text-Heading-4" aria-label="title"></p>
          </li>
          <li className="relative">
            <button
              type="button"
              aria-label="edit-button"
              className="outline-none p-2"
              onClick={handleMenuBtn}
            >
              <BsThreeDotsVertical color="#9E9E9E" />
            </button>
            {menuOn && <MenuBox menus={menus} position="top-10 -left-20" />}
          </li>
        </ul>
      </nav>
      {deleteOn && (
        <div className="fixed max-w-[490px] w-full h-[100vh] -ml-6 -mt-12 z-30">
          <Alert
            isOpen={deleteOn}
            title="글을 삭제하시겠습니까?"
            informativeText=""
            secondaryBtn="취소"
            secondaryAction={() => {
              setDeleteOn(false);
              setMenuOn(false);
            }}
            primaryBtn="글 삭제하기"
            primaryAction={handleDelete}
          />
        </div>
      )}
      {isEdit && (
        <div className="fixed max-w-[490px] w-full h-[100vh] -ml-6 -mt-12 z-30">
          <Alert
            isOpen={isEdit}
            title="글을 수정하시겠습니까?"
            informativeText=""
            secondaryBtn="취소"
            secondaryAction={() => {
              setIsEdit(false);
              setMenuOn(false);
            }}
            primaryBtn="수정하기"
            primaryAction={hadleEdit}
          />
        </div>
      )}
    </>
  );
}
