'use client';
import useTopic from '@/hooks/topic/useTopic';
import React, { MouseEvent, useState } from 'react';
import { CiShare1 } from 'react-icons/ci';
import { FaRegStar, FaStar } from 'react-icons/fa';

export default function TopicButtons({
  stared,
  id,
}: {
  stared: boolean;
  id: number;
}) {
  const [isStared, setIsStared] = useState(stared);
  const { starTopicQuery } = useTopic();
  const handleStarBtn = (e: MouseEvent) => {
    e.preventDefault();
    setIsStared(true);
    starTopicQuery(id);
  };
  const handleCancelStarBtn = (e: MouseEvent) => {
    e.preventDefault();
    setIsStared(false);
    starTopicQuery(id);
  };

  return (
    <div className="flex gap-3">
      {isStared ? (
        <button
          type="button"
          aria-label="cancel-stared-button"
          onClick={handleCancelStarBtn}
        >
          <FaStar color="#57E5C3" size={16} />
        </button>
      ) : (
        <button type="button" aria-label="star-button" onClick={handleStarBtn}>
          <FaRegStar color="#57E5C3" size={16} />
        </button>
      )}

      <button type="button" aria-label="share-button">
        <CiShare1 color="#9E9E9E" size={16} />
      </button>
    </div>
  );
}
