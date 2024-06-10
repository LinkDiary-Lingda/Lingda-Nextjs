'use client';
import React from 'react';
import { RecoilRoot, RecoilRootProps } from 'recoil';

export default function RecoilWrapper({ children }: RecoilRootProps) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
