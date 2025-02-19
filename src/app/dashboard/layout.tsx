'use client';
import { Dispatch, RootState } from '@/rematch';
import { useRouter } from 'next/navigation';
import React, { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

interface Props {
  children: React.ReactNode;
}

function Dashboard(props: Props): React.JSX.Element {
  const { children } = props;
  const router = useRouter();
  const dispatch = useDispatch<Dispatch>();
  const { isReady, isLogin } = useSelector((state: RootState) => state.auth);

  // useEffect(() => {
  //   console.log('init dashboard layout.tsx');
  //   router.push('/dashboard/profile');
  // }, []);

  useEffect(() => {
    console.log('init 1', isReady);
    if (!isReady) {
      dispatch.auth.init();
    }
  }, [isReady, dispatch.auth]);

  // useEffect(() => {
  //   if (isReady && isLogin) {
  //     router.replace('/dashboard/profile');
  //   } else {
  //     router.replace('/login');
  //   }
  // }, [isReady, isLogin]);

  return (
    <Suspense>
        {isReady && children}
    </Suspense>
  );
}

export default Dashboard;
