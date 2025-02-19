'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Typography from '@/components/atoms/Typography';
import Button from '@/components/atoms/Button';
import InputField from '@/components/molecules/InputField';
import PasswordInput from '@/components/molecules/PasswordInput';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '@/rematch';
import * as Yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { isEmpty } from 'lodash';
import { appRoute } from '@/constants/routes';
import useFetch from '@/hooks/useFetch';
import ChevronLeftIcon from '@/components/atoms/icons/ChevronLeftIcon';

interface FormData {
  username: string;
  password: string;
}

const loginSchema = () =>
  Yup.object().shape({
    username: Yup.string()
      .required('Username/Email is required'),
    password: Yup.string().required('Password is required'),
  });

function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch<Dispatch>();
  const { isLoading } = useSelector((state: RootState) => state.auth);
  const [isErrorPassword, setErrorPassword] = useState<string | undefined>(
    undefined
  );
  const { isLoading: isLoadingReset, onFetch: onFetchReset } =
    useFetch<string>();

  const [isShowProfileNotComplete, setIsShowProfileNotComplete] =
    useState(false);
  const [isShowProfileWaiting, setIsShowProfileWaiting] = useState(false);

  const handleRedirect = async () => {
    router.replace('/dashboard/profile');
  };

  const schema = React.useMemo(() => loginSchema(), []);
  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<FormData>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const [isShowForgotPassword, setIsShowForgotPassword] = useState(false);

  const toggleForgotPassword = () => {
    setIsShowForgotPassword(!isShowForgotPassword);
  };

  const navigateToRegister = () => {
    router.replace('/register');
  };

  const handleLogin = async (formData: FormData) => {
    try {
      setErrorPassword(undefined);
      const payload = {
        username: formData.username,
        password: formData.password,
      };
      await dispatch.auth.handleLogin(payload);
      handleRedirect();
    } catch (e: any) {
      if (e?.message === 'invalid_grant') {
        setErrorPassword('Kata sandi anda salah');
      } else {
        dispatch.toast.addToast({
          variant: 'error',
          message: e?.message || 'Login gagal. Silakan Coba Lagi',
        });
      }
    }
  };

  const { isReady, isLogin } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    console.log('isReady', isReady);
    console.log('isLogin', isLogin);
    if (isReady && isLogin) {
      handleRedirect();
    } else {
      dispatch.auth.init();
    }
  }, [isReady, isLogin]);

  return (
    <div className='relative h-screen min-h-screen bg-gradient-to-bl from-[#1F4247] via-[#0D1D23] to-[#09141A] p-4'>
      <div className="flex items-center gap-3 h-fit">
        <ChevronLeftIcon className='w-6 h-6 text-white' containerClassName='fill-white' />
        <Typography className='text-white'>Back</Typography>
      </div>
      <div className='mt-12'>
        <Typography variant="h5" className='text-white font-bold'>Login</Typography>
        
        <form className='mt-6' onSubmit={handleSubmit(handleLogin)}>
          <Controller
            control={control}
            name='username'
            render={({ field: { onChange, value } }) => (
              <InputField
                testID='email-input'
                variant='plain'
                required
                placeholder='Enter Username/Email'
                value={value}
                onChange={onChange}
                error={errors.username?.message}
              />
            )}
          />
          <Controller
            control={control}
            name='password'
            render={({ field: { onChange, value } }) => (
              <div className='mt-4'>
                <PasswordInput
                  variant='plain'
                  required
                  placeholder='Enter Password'
                  value={value}
                  onChange={onChange}
                  error={errors.password?.message || isErrorPassword}
                />
              </div>
            )}
          />

          <div className='flex flex-col gap-6 mt-6 text-center'>
            <Button
              type='submit'
              testID='login'
              className={`w-full h-12 bg-gradient-to-r from-[#62cdcb] to-[#4599db] ${
                isValid ? 'shadow-[0_4px_20px_0px_#62cdcb] transition-shadow duration-300' : ''
              }`}
              onClick={handleSubmit(handleLogin)}
              disabled={!isValid}
              loading={isLoading}>
              <Typography className='text-xl font-bold'>Login</Typography>
            </Button>

            <Typography className=''>No account? <button type="button" onClick={navigateToRegister} className="text-[#93773e] text-[13px] font-medium">Register here</button></Typography>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
