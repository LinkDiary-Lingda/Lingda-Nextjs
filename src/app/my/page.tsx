'use client';
import { FaPlus } from 'react-icons/fa';
import Content from './content';
import Filters from './filters';
import Link from 'next/link';
import useTopic from '@/hooks/topic/useTopic';

export default function My() {
  const { topicQuery } = useTopic();

  return <>{topicQuery && <>{topicQuery.length > 0 && <Content />}</>}</>;
}
