'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import InputField from '@/components/molecules/InputField';
import Typography from '@/components/atoms/Typography';
import classNames from 'classnames';
import CardContainer from '../molecules/CardContainer';
import * as Yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import SelectField from '../molecules/SelectField';
import { noop } from 'lodash';
import DatePicker from '../molecules/DatePicker';
import PictureInput from '../molecules/PictureInput';
import authApi, { Profile } from '@/apis/auth';
import { useRouter } from 'next/navigation';
import { setLocalStorage, StorageKeys } from '@/utils/storage';

interface Props {
  data: Profile;
  classname?: string;
  handleBack?: () => void;
}

interface ProfileForm {
  name: string;
  picture: File;
  gender: 'man' | 'women';
  birthday: Date;
  horoscope: string;
  zodiac: string;
  height: number;
  weight: number;
  // interests: string[];
}

const aboutSchema = () =>
  Yup.object().shape({
    name: Yup.string().required('Name is required'),
    picture: Yup.mixed().required('Picture is required'),
    gender: Yup.string().oneOf(['man', 'women']).required(),
    birthday: Yup.date().required('Birthday is required'),
    height: Yup.number().required('Height is required'),
    weight: Yup.number().required('Weight is required'),
    // interests: Yup.array().of(Yup.string()).required('Interests is required'),
  });

function FormAbout(props: Props): React.JSX.Element {
  const {
    data,
    classname,
    handleBack,
  } = props;

  const router = useRouter();

  const schema = React.useMemo(() => aboutSchema(), []) as Yup.ObjectSchema<ProfileForm>;
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
      name: data?.name || '',
      gender: undefined,
      birthday: data?.birthday ? new Date(data.birthday) : new Date(),
      horoscope: data?.horoscope || '--',
      zodiac: data?.zodiac || '--',
      height: data?.height || 0,
      weight: data?.weight || 0,
      // interests: [],
    },
  });
  const watchBirthday = watch('birthday');

  const sendSubmit = async (formData: ProfileForm) => {
    try {
      console.log(formData);
      await authApi.updateProfile({
        ...formData,
        interests: data?.interests || []
      });

      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(formData.picture);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
      });

      setLocalStorage(StorageKeys.Picture, base64);

      handleBack?.();
    } catch (e: any) {
      console.error(e.message);
    }
  };

  const getHoroscope = (date: Date): string => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
  
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries';
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus';
    if ((month === 5 && day >= 21) || (month === 6 && day <= 21)) return 'Gemini';
    if ((month === 6 && day >= 22) || (month === 7 && day <= 22)) return 'Cancer';
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo';
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo';
    if ((month === 9 && day >= 23) || (month === 10 && day <= 23)) return 'Libra';
    if ((month === 10 && day >= 24) || (month === 11 && day <= 21)) return 'Scorpius';
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius';
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricornus';
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius';
    return '♓ Pisces';
  };
  
  const getChineseZodiac = (date: Date): string => {
    const year = date.getFullYear();
    const zodiacSigns = ['Monkey', 'Rooster', 'Dog', 'Pig', 'Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat'];
    return zodiacSigns[year % 12];
  };
  
  const handleHeroscpoeZodiac = (date: Date) => {
    setValue('horoscope', getHoroscope(date));
    setValue('zodiac', getChineseZodiac(date));
  };

  useEffect(() => {
    if (watchBirthday) {
      handleHeroscpoeZodiac(watchBirthday);
    }
  }, [watchBirthday]);

  return (
    <CardContainer>
      <form onSubmit={handleSubmit(sendSubmit)}>
        <div className="flex justify-between items-center">
          <Typography className='text-white font-semibold'>About</Typography>
          <button type="submit" onClick={handleSubmit(sendSubmit)}>
            <Typography className='text-[#93773e] font-semibold'>Save & Update</Typography>
          </button>
        </div>
        <div className="mt-12">
            <Controller
              control={control}
              name='picture'
              render={({ field: { onChange, value } }) => (
                <PictureInput label="Add image" onChange={onChange} error={errors.picture?.message} />
              )}
            />
            
            <div className="flex justify-between items-center gap-2 mt-3">
              <Typography className='text-gray-400'>Dispay name:</Typography>
              <div className="w-[60%]">
                <Controller
                  control={control}
                  name='name'
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      testID='name-input'
                      containerClassName='border border-white/20 rounded-lg'
                      inputClassName="h-9 py-1 px-4 text-right"
                      variant='plain'
                      required
                      placeholder='Enter Name'
                      value={value}
                      onChange={onChange}
                      error={errors.name?.message}
                    />
                  )}
                />
              </div>
            </div>
            <div className="flex justify-between items-center gap-2 mt-3">
              <Typography className='text-gray-400'>Gender:</Typography>
              <div className="w-[60%]">
                <Controller
                  control={control}
                  name='gender'
                  render={({ field: { onChange, value } }) => (
                    <SelectField
                      testID="select-is-active"
                      options={[
                        { label: 'Man', value: 'man' },
                        { label: 'Women', value: 'women' },
                      ]}
                      className='h-9 !border !border-white/20 !rounded-lg'
                      inputClassName="h-9 py-0 px-0  text-right"
                      variant='plain'
                      required
                      placeholder="Select Gender"
                      onChange={onChange}
                      value={value}
                      error={errors?.gender?.message}
                    />
                  )}
                />
              </div>
            </div>
            <div className="flex justify-between items-center gap-2 mt-3">
              <Typography className='text-gray-400'>Birthday:</Typography>
              <div className="w-[60%]">
                <Controller
                  control={control}
                  name='birthday'
                  render={({ field: { onChange, value } }) => (
                    <DatePicker
                      variant="plain"
                      testID="group-name"
                      placeholderText="DD MM YYYY"
                      required
                      onChangeDate={(val) => onChange(val.startDate)}
                      startDate={value}
                      endDate={undefined}
                      onChange={noop}
                      inputClassName="h-9 py-1 px-4"
                      className="text-right"
                    />
                  )}
                />
              </div>
            </div>
            <div className="flex justify-between items-center gap-2 mt-3">
              <Typography className='text-gray-400'>Horoscope:</Typography>
              <div className="w-[60%]">
                <Controller
                  control={control}
                  name='horoscope'
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      testID='name-input'
                      containerClassName='border border-white/20 rounded-lg'
                      inputClassName="h-9 py-1 px-4 text-right"
                      variant='plain'
                      required
                      placeholder='Enter Heroscope'
                      value={value}
                      onChange={onChange}
                      readonly
                      error={errors.horoscope?.message}
                    />
                  )}
                />
              </div>
            </div>
            <div className="flex justify-between items-center gap-2 mt-3">
              <Typography className='text-gray-400'>Zodiac:</Typography>
              <div className="w-[60%]">
                <Controller
                  control={control}
                  name='zodiac'
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      testID='name-input'
                      containerClassName='border border-white/20 rounded-lg'
                      inputClassName="h-9 py-1 px-4 text-right"
                      variant='plain'
                      required
                      placeholder='Enter Zodiac'
                      value={value}
                      onChange={onChange}
                      readonly
                      error={errors.zodiac?.message}
                    />
                  )}
                />
              </div>
            </div>
            <div className="flex justify-between items-center gap-2 mt-3">
              <Typography className='text-gray-400'>Height:</Typography>
              <div className="w-[60%]">
                <Controller
                  control={control}
                  name='height'
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      testID='name-input'
                      containerClassName='border border-white/20 rounded-lg'
                      inputClassName="h-9 py-1 px-4 text-right"
                      variant='plain'
                      required
                      placeholder='Enter Height'
                      value={value}
                      onChange={onChange}
                      error={errors.height?.message}
                    />
                  )}
                />
              </div>
            </div>
            <div className="flex justify-between items-center gap-2 mt-3">
              <Typography className='text-gray-400'>Weight:</Typography>
              <div className="w-[60%]">
                <Controller
                  control={control}
                  name='weight'
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      testID='name-input'
                      containerClassName='border border-white/20 rounded-lg'
                      inputClassName="h-9 py-1 px-4 text-right"
                      variant='plain'
                      required
                      placeholder='Enter Weight'
                      value={value}
                      onChange={onChange}
                      error={errors.weight?.message}
                    />
                  )}
                />
              </div>
            </div>
        </div>
      </form>
    </CardContainer>
  );
}

export default FormAbout;
