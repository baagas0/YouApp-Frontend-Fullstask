'use client';

import React, { useEffect, useState } from 'react';
import useFetch from '@/hooks/useFetch';
import { UserContext, UserContextType } from '@/context/UserCtx';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '@/rematch';
import authApi, { Profile } from '@/apis/auth';
import Button from '@/components/atoms/Button';
import Typography from '@/components/atoms/Typography';
import { useRouter } from 'next/navigation';
import { useFreshCallback } from '@/hooks/utils';
import Image from 'next/image';
import classNames from 'classnames';

interface RoleButtonProps {
  title: string;
  onClick: () => void;
  active?: boolean;
  icon: string;
}

function RoleButton(props: RoleButtonProps): React.JSX.Element {
  const {
    title, onClick, active = false, icon,
  } = props;
  const computedStyles = classNames(
    '!rounded-2xl !py-12 !px-4 bg-white w-full hover:bg-primary-5 group !w-[250px]',
    {
      '!bg-primary-5': active,
    },
  );
  return (
    <Button
      testID="select-role-1"
      variant="outline"
      className={computedStyles}
      onClick={onClick}
    >
      <div className="flex flex-col items-center justify-center gap-7">
        <Image src={icon} alt="role-icon" width={95} height={95} />
        <Typography variant="h6" className="font-medium text-text-gray">{title}</Typography>
      </div>
    </Button>
  );
}

interface ProfileProviderProps {
  children: React.ReactNode;
}

function UserProvider({ children }: ProfileProviderProps): React.JSX.Element {
  const { isReady, isLogin } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<Dispatch>();
  const router = useRouter();
  const [isReadyUser, setIsReadyUser] = useState(false);
  const { onFetch, data } = useFetch<Profile>();

  const handleGetDetail: UserContextType['getDetail'] = useFreshCallback(
    async () => {
      try {
        const auth = await onFetch(() => authApi.profile());
      } catch (e: any) {
        // err
        if (e?.message) {
          dispatch.toast.addToast({
            variant: 'error',
            message: e.message,
          });
        }
      } finally {
        setIsReadyUser(true);
      }
    },
  );

  useEffect(() => {
    if (isReady && isLogin) {
      handleGetDetail();
    }
  }, [isReady, isLogin]);

  const value = React.useMemo(() => ({
    isReady: isReadyUser,
    user: data,
    getDetail: handleGetDetail,
  }), [handleGetDetail, isReadyUser, data]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
