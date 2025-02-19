'use client';

import authApi, { Profile } from "@/apis/auth";
import ChevronLeftIcon from "@/components/atoms/icons/ChevronLeftIcon";
import Typography from "@/components/atoms/Typography";
import useFetch from "@/hooks/useFetch";
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import MultiSelectField from "@/components/molecules/MultiSelectField";
import { useUser } from "@/hooks/useContext";

interface ProfileForm {
  interests: string[];
}

const aboutSchema = () =>
  Yup.object().shape({
    interests: Yup.array().of(Yup.string()).required('Interests is required'),
  });

export default function ProfileInterest() {
  const {
    isLoading, data, onFetch,
  } = useFetch<Profile>({ initialLoading: true });
  const router = useRouter();
  const user = useUser();

  const schema = useMemo(() => aboutSchema(), []) as Yup.ObjectSchema<ProfileForm>;
    const {
      watch,
      control,
      handleSubmit,
      setValue,
      formState: { isValid, errors },
    } = useForm<ProfileForm>({
      mode: 'onChange',
      resolver: yupResolver(schema),
      defaultValues: {
        interests: user.user?.interests || [],
      },
    });

  const getProfile = async () => {
    try {
      const res = await onFetch(() => authApi.profile());
      setValue('interests', res?.data?.interests || []);
    } catch (error) {
      console.log(error);
    }
  }

  const handleBack = () => {
    router.back();
  }

  const sendSubmit = async (formData: ProfileForm) => {
    try {
      console.log(formData);
      await authApi.updateProfile({
        ...data,
        interests: formData?.interests || data?.interests || []
      });

      handleBack?.();
    } catch (e: any) {
      console.error(e.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className='relative h-screen min-h-screen bg-gradient-to-bl from-[#1F4247] via-[#0D1D23] to-[#09141A] p-4'>
      <form onSubmit={handleSubmit(sendSubmit)}>
        <div className="flex justify-between items-center h-fit">
          <button onClick={handleBack} className="flex items-center gap-3 h-fit">
            <ChevronLeftIcon className='w-6 h-6 text-white' containerClassName='fill-white' />
            <Typography className='text-white'>Back</Typography>
          </button>
          <button onClick={handleSubmit(sendSubmit)}>
            <Typography variant="lead" className='font-semibold text-transparent bg-clip-text bg-gradient-to-tr from-[#ABFFFD] via-[#4599DB] to-[#AADAFF]'>Save</Typography>
          </button>
        </div>
        <div className='mt-12'>
          <Typography variant="lead" className='text-transparent !bg-clip-text font-semibold' style={{ background: 'var(--Golden-2, linear-gradient(74deg, #94783E -6.8%, #F3EDA6 16.76%, #F8FAE5 30.5%, #FFE2BE 49.6%, #D5BE88 78.56%, #F8FAE5 89.01%, #D5BE88 100.43%))' }}>Tell everyone about yourself</Typography>
          <Typography variant="h5" className='text-white font-bold mt-2'>What interest you?</Typography>

          <div className="flex justify-between items-center gap-2 mt-3">
          <Controller
            control={control}
            name="interests"
            render={({ field: { onChange, value } }) => (
              <MultiSelectField
                testID="select-is-active"
                options={[
                  { label: 'Music', value: 'Music' },
                  { label: 'Basketball', value: 'Basketball' },
                  { label: 'Fitness', value: 'Fitness' },
                  { label: 'Gymming', value: 'Gymming' },
                ]}
                className='min-h-9 !border-none !rounded-lg'
                inputClassName="min-h-12 py-0 px-0"
                variant='plain'
                required
                placeholder=""
                onChange={onChange}
                value={value}
                error={errors?.interests?.message}
              />
            )}
          />
          </div>
        </div>
      </form>
    </div>
  )
}
