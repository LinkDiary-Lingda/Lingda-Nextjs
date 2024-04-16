import React from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaChevronDown, FaCircle } from 'react-icons/fa';
import { GoPlus } from 'react-icons/go';
import { IoIosArrowDown } from 'react-icons/io';

export default function SideNav() {
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
          <p className="h-14 flex items-center border-b-[1px]">전체보기</p>
          <ul>
            <li className="h-14 flex items-center justify-between border-b-[1px] border-Gray-02">
              <div className="flex items-center gap-2">
                <FaCircle size={20} color="red" />
                <p>햄스터 키우기</p>
              </div>
              <button type="button" aria-label="edit-button">
                <BsThreeDotsVertical color="#9E9E9E" />
              </button>
            </li>
            <li>
              <ul className="border-b-[1px] border-Gray-02">
                <li className="h-14 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <IoIosArrowDown size={20} color="#9E9E9E" />
                    <p>햄스터 키우기</p>
                  </div>
                  <button type="button" aria-label="edit-button">
                    <BsThreeDotsVertical color="#9E9E9E" />
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
