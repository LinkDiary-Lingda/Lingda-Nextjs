'use client';
import React, { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>렌더링 에러 발생!!</h2>
      <button onClick={reset}>재시도하기</button>
    </div>
  );
}
