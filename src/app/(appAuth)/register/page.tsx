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
import authApi from '@/apis/auth';

interface FormData {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const registerSchema = () =>
  Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), ''], 'Password does not match'),
  });

function Register() {
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

  const schema = React.useMemo(() => registerSchema(), []);
  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<FormData>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
  });

  const navigateToLogin = () => {
    router.replace('/login');
  };

  const handleRegister = async (formData: FormData) => {
    try {
      setErrorPassword(undefined);
      const payload = {
        email: formData.email,
        username: formData.username,
        password: formData.password,
      };

      await authApi.register(payload);

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
    if (isReady && isLogin) {
      handleRedirect();
    }
  }, [isReady, isLogin]);

  return (
    <div className='relative h-screen min-h-screen bg-gradient-to-bl from-[#1F4247] via-[#0D1D23] to-[#09141A] p-4'>
      <div className="flex items-center gap-3 h-fit">
        <ChevronLeftIcon className='w-6 h-6 text-white' containerClassName='fill-white' />
        <Typography className='text-white'>Back</Typography>
      </div>
      <div className='mt-12'>
        <Typography variant="h5" className='text-white font-bold'>Register</Typography>
        
        <form className='mt-6' onSubmit={handleSubmit(handleRegister)}>
          <Controller
            control={control}
            name='email'
            render={({ field: { onChange, value } }) => (
              <InputField
                testID='email-input'
                variant='plain'
                required
                placeholder='Enter Email'
                value={value}
                onChange={onChange}
                error={errors.username?.message}
              />
            )}
          />
          <Controller
            control={control}
            name='username'
            render={({ field: { onChange, value } }) => (
              <div className='mt-4'>
                <InputField
                  testID='username-input'
                  variant='plain'
                  required
                  placeholder='Create Username'
                  value={value}
                  onChange={onChange}
                  error={errors.username?.message}
                />
              </div>
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
                  placeholder='Create Password'
                  value={value}
                  onChange={onChange}
                  error={errors.password?.message || isErrorPassword}
                />
              </div>
            )}
          />
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, value } }) => (
              <div className='mt-4'>
                <PasswordInput
                  variant='plain'
                  required
                  placeholder='Confirm Password'
                  value={value}
                  onChange={onChange}
                  error={errors.confirmPassword?.message || isErrorPassword}
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
              onClick={handleSubmit(handleRegister)}
              disabled={!isValid}
              loading={isLoading}>
              <Typography className='text-xl font-bold'>Login</Typography>
            </Button>

            <Typography className=''>Have an account? <button type="button" onClick={navigateToLogin} className="text-[#93773e] text-[13px] font-medium">Login here</button></Typography>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
