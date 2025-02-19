'use client';

import React, { useEffect, useState } from 'react';
import useFetch from '@/hooks/useFetch';
import { UserContext, UserContextType } from '@/context/UserCtx';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '@/rematch';
import authApi, { AuthDetailData, UserActiveRoleData, UserRegisteredRoleData } from '@/apis/auth';
import Button from '@/components/atoms/Button';
import Typography from '@/components/atoms/Typography';
import { useRouter } from 'next/navigation';
import { useFreshCallback } from '@/hooks/utils';
import profileApi from '@/apis/profile';
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
  const [isShowRole, setIsShowRole] = useState(false);
  const [profilePicture, setProfilePicture] = useState<string>('');
  const { onFetch, data } = useFetch<AuthDetailData>();
  const { onFetch: onFetchRole, data: dataRole } = useFetch<UserActiveRoleData>();
  const { onFetch: onFetchRegisteredRole, data: dataRegisteredRole } = useFetch<UserRegisteredRoleData[]>();
  const [access, setAccess] = useState<string[]>([]);
  const [isShowForbidden, setIsShowForbidden] = useState(false);

  const handleGetPicture = async (userId: string) => {
    const res = await profileApi.participantDetail(userId);
    setProfilePicture(res.data.profilePicture || '');
  };

  const handleGetAccess: UserContextType['getAccess'] = useFreshCallback(
    async () => {
      try {
        const res = await AclApi.getAccess();
        // const accessList: string[] = [];
        // res.listAccess.filter((x) => x.checked).forEach((item) => {
        //   accessList.push(item.accessCode);
        //   item.subMenu.filter((y) => y.checked).forEach((subItem) => {
        //     accessList.push(subItem.accessCode);
        //   });
        // });
        setAccess(res);
      } catch (e: any) {
        if (e?.message) {
          dispatch.toast.addToast({
            variant: 'error',
            message: e.message,
          });
        }
      }
    },
  );

  const handleGetDetail: UserContextType['getDetail'] = useFreshCallback(
    async () => {
      try {
        const auth = await onFetch(() => authApi.detail());
        await onFetchRole(() => authApi.getActiveRole(auth.data.id));
        await onFetchRegisteredRole(() => authApi.getRegisteredRole(auth.data.id));
        await handleGetAccess();
        handleGetPicture(auth.data.id);
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

  // useInterval(async () => {
  //   if (isReady && isLogin) {
  //     await handleGetAccess();
  //   }
  // }, 3000);

  const handleShowRole: UserContextType['showRole'] = useFreshCallback(
    async () => {
      try {
        setIsShowRole(true);
      } catch (e) {
        // err
      } finally {
        // finally
      }
    },
  );

  const handleHideRole: UserContextType['hideRole'] = useFreshCallback(
    () => {
      setIsShowRole(false);
    },
  );

  const handleForbidden = useFreshCallback(
    (newStatus?: boolean) => {
      if (newStatus === undefined) {
        setIsShowForbidden(true);
      }
      if (newStatus === false) {
        setIsShowForbidden(false);
      }
      if (newStatus === true) {
        setIsShowForbidden(true);
      }
    },
  );

  const handleBackForbidden = () => {
    handleForbidden(false);
    router.back();
  };

  useEffect(() => {
    if (isReady && isLogin) {
      handleGetDetail();
    }
  }, [isReady, isLogin]);

  const value = React.useMemo(() => ({
    isReady: isReadyUser,
    user: data,
    role: dataRole,
    profilePicture,
    access,
    handleGetPicture,
    handleForbidden,
    getAccess: handleGetAccess,
    getDetail: handleGetDetail,
    showRole: handleShowRole,
    hideRole: handleHideRole,
  }), [handleGetDetail, isReadyUser, data, dataRole, profilePicture, handleGetPicture]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
