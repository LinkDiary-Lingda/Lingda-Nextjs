'use client';
import Loading from '@/app/loading';
import SplashScreen from '@/components/SplashScreen';
import { useIsFetching } from '@tanstack/react-query';
import React, { useState } from 'react';

export default function UseLoading({
  children,
}: {
  children: React.ReactNode;
}) {
  const [initialized, setInitialized] = useState(true);
  const finishLoading = () => setInitialized(false);
  const isFetching = useIsFetching();
  return (
    <>
      {children}
      {isFetching ? <Loading /> : null}
      {initialized ? <SplashScreen finishLoading={finishLoading} /> : null}
    </>
  );
}
