import React, { DragEvent } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaChevronDown, FaCircle } from 'react-icons/fa';
import { GoPlus } from 'react-icons/go';
import { IoIosArrowDown } from 'react-icons/io';

const DeviderItem = ({
  title,
  dataId,
  dragOverHandler,
  dropHandler,
}: {
  title: string;
  dataId: string;
  dragOverHandler: (e: DragEvent<HTMLElement>) => void;
  dropHandler: (e: DragEvent<HTMLElement>) => void;
}) => (
  <div
    className="h-14 flex items-center justify-between"
    onDragOver={dragOverHandler}
    onDrop={dropHandler}
    data-id={dataId}
  >
    <div className="flex items-center gap-2">
      <IoIosArrowDown size={20} color="#9E9E9E" />
      <p>{title}</p>
    </div>
    <button type="button" aria-label="edit-button">
      <BsThreeDotsVertical color="#9E9E9E" />
    </button>
  </div>
);

const RootListItem = ({ color, title }: { color: string; title: string }) => (
  <li
    className="h-14 flex items-center justify-between border-b-[1px] border-Gray-02"
    draggable
  >
    <div className="flex items-center gap-2">
      <FaCircle size={20} color={color} />
      <p>{title}</p>
    </div>
    <button type="button" aria-label="edit-button">
      <BsThreeDotsVertical color="#9E9E9E" />
    </button>
  </li>
);

const NestedListItem = ({ color, title }: { color: string; title: string }) => (
  <li className="h-14 ml-6 flex items-center justify-between" draggable>
    <div className="flex items-center gap-2">
      <FaCircle size={20} color={color} />
      <p>{title}</p>
    </div>
    <button type="button" aria-label="edit-button">
      <BsThreeDotsVertical color="#9E9E9E" />
    </button>
  </li>
);

export default function SideNav() {
  const dragOverHandler = (e) => {
    e.preventDefault();
    console.log('hihih');
  };

  const dropHandler = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    console.log('dropped!!!');
    console.log(e.target.dataset.id);
  };
  return (
    <section className="w-full absolute px-2 z-20">
      <div className="absolute w-full h-[100vh] bg-black opacity-30"></div>
      <div className="absolute w-[302px] h-[100vh] bg-white z-20 pl-6 pr-1">
        <div className="h-[48px] flex flex-row items-center justify-between">
          <button
            className="flex flex-row gap-1 items-center text-Gray-06 text-Body-1"
            aria-label="myInfo-button"
          >
            <span>Hamster1004</span>
            <FaChevronDown size={12} />
          </button>
          <button className="w-9 h-9 flex items-center justify-center">
            <GoPlus size={18} />
          </button>
        </div>
        <div className="mt-4 w-64 text-Body-1">
          <div
            className="h-14 flex items-center border-b-[1px]"
            onDragOver={dragOverHandler}
            onDrop={dropHandler}
            data-id="1"
          >
            전체보기
          </div>
          <ul>
            <RootListItem title="햄스터 키우기" color="red" />
            <li className="flex flex-col justify-between border-b-[1px] border-Gray-02">
              <DeviderItem
                title="디자인 블로그"
                dataId="2"
                dragOverHandler={dragOverHandler}
                dropHandler={dropHandler}
              />
              <ul>
                <NestedListItem color="green" title="색상" />
                <NestedListItem color="gray" title="폰트" />
              </ul>
            </li>
            <RootListItem title="햄스터 키우기" color="orange" />
          </ul>
        </div>
        <div className="mt-6">
          <ul>
            <li className="h-9 flex items-center text-Body-2">
              버전 정보 V1.0
            </li>
            <li className="h-9 flex items-center text-Body-2">공지사항</li>
            <li className="h-9 flex items-center text-Body-2">고객센터</li>
            <li className="h-9 flex items-center text-Body-2">이용약관</li>
            <li className="h-9 flex items-center text-Body-2">환경설정</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
