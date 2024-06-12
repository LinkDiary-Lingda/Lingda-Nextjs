'use client';
import Loading from '@/app/loading';
import { useIsFetching } from '@tanstack/react-query';
import React from 'react';

export default function UseLoading({
  children,
}: {
  children: React.ReactNode;
}) {
  const isFetching = useIsFetching();
  return (
    <>
      {children}
      {isFetching ? <Loading /> : null}
    </>
  );
}
