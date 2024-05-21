'use client';
import React, { useState } from 'react';
import { CiShare1 } from 'react-icons/ci';
import { FaRegStar, FaStar } from 'react-icons/fa';

export default function TopicButtons({ stared }: { stared: boolean }) {
  const [isStared, setIsStared] = useState(stared);
  const handleStarBtn = () => {};
  return (
    <div className="flex gap-3">
      {isStared ? (
        <button
          type="button"
          aria-label="stared-button"
          onClick={handleStarBtn}
        >
          <FaStar color="#57E5C3" size={16} />
        </button>
      ) : (
        <button
          type="button"
          aria-label="unstared-button"
          onClick={handleStarBtn}
        >
          <FaRegStar color="#57E5C3" size={16} />
        </button>
      )}

      {/* <button type="button" aria-label="share-button">
        <CiShare1 color="#9E9E9E" size={16} />
      </button> */}
    </div>
  );
}
