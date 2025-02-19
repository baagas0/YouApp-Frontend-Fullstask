/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '@/rematch';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch<Dispatch>();
  const { isReady, isLogin } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    console.log('init home', isReady);
    if (!isReady) {
      dispatch.auth.init();
    }
  }, [isReady, dispatch.auth]);

  useEffect(() => {
    if (isReady && isLogin) {
      router.replace('/dashboard/profile');
    } else {
      router.replace('/login');
    }
  }, [isReady, isLogin]);

  return null;
}
