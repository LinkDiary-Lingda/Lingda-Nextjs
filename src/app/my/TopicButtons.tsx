'use client';
import useTopic from '@/hooks/topic/useTopic';
import React, { MouseEvent, useState } from 'react';
import { CiShare1 } from 'react-icons/ci';
import { FaRegStar, FaStar } from 'react-icons/fa';
import fullStar from '../../images/full-star.png';
import emptyStar from '../../images/empty-star.png';
import shareImg from '../../images/share-image.png';
import Image from 'next/image';

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
          <Image
            src={fullStar}
            width={20}
            height={20}
            alt="star-cancel-button"
          />
        </button>
      ) : (
        <button type="button" aria-label="star-button" onClick={handleStarBtn}>
          <Image src={emptyStar} width={20} height={20} alt="star-button" />
        </button>
      )}

      <button type="button" aria-label="share-button">
        <Image src={shareImg} width={20} height={20} alt="share-button" />
      </button>
    </div>
  );
}
