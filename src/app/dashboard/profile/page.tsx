/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import authApi, { Profile as ProfileInterface } from "@/apis/auth";
import ChevronLeftIcon from "@/components/atoms/icons/ChevronLeftIcon";
import PencilIcon from "@/components/atoms/icons/PencilIcon";
import TripleDotIcon from "@/components/atoms/icons/TripleDotIcon";
import Typography from "@/components/atoms/Typography";
import CardContainer from "@/components/molecules/CardContainer";
import FormAbout from "@/components/organisms/FormAbout";
import useFetch from "@/hooks/useFetch";
import { dateFormat, getAge } from "@/utils/helper";
import { getLocalStorage, setLocalStorage, StorageKeys } from "@/utils/storage";
import { isArray } from "lodash";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Profile() {
  const {
    isLoading, data, onFetch,
  } = useFetch<ProfileInterface>({ initialLoading: true });
  const router = useRouter();

  const getProfile = async () => {
    try {
      const getPicture = getLocalStorage(StorageKeys.Picture);
      if (getPicture) {
        setPicture(getPicture);
      }
      onFetch(() => authApi.profile());
    } catch (error) {
      console.log(error);
    }
  }

  const [isEditAbout, setIsEditAbout] = useState(false);
  const [isEditInterest, setIsEditInterest] = useState(false);

  const handleEditAbout = () => {
    setIsEditAbout(!isEditAbout);
  }

  const handleEditInterest = () => {
    setIsEditInterest(!isEditInterest);
  }

  const handleBack = () => {
    router.back();
  };

  const handleUpdateInterests = () => {
    router.push('/dashboard/profile/interests');
  }

  const inputRef = useRef<HTMLInputElement>(null);
  const handlePicture = () => {
    inputRef.current?.click();
  }

  const [picture, setPicture] = useState<string | undefined>();
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
      });

      setLocalStorage(StorageKeys.Picture, base64);
      setPicture(base64);
    }
  }

  useEffect(() => {
    getProfile();
  }, []);


  return (
    <div className='relative h-screen min-h-screen bg-gradient-to-bl from-[#1F4247] via-[#0D1D23] to-[#09141A] p-4'>
      <div className="flex justify-between items-center h-fit">
        <button onClick={handleBack} className="flex items-center gap-3 h-fit">
          <ChevronLeftIcon className='w-6 h-6 text-white' containerClassName='fill-white' />
          <Typography className='text-white'>Back</Typography>
        </button>
        <Typography className='text-white'>@{data?.username}</Typography>
        <button>
          {/* <TripleDotIcon className='w-6 h-6 text-white' containerClassName='fill-white' /> */}
          <div className="w-[21.24px] h-[6.41px] relative">
            <div className="w-[4.54px] h-[4.54px] left-0 top-[3.21px] absolute origin-top-left -rotate-45 bg-white rounded-[1px]"></div>
            <div className="w-[4.54px] h-[4.54px] left-[7.42px] top-[3.21px] absolute origin-top-left -rotate-45 bg-white rounded-[1px]"></div>
            <div className="w-[4.54px] h-[4.54px] left-[14.83px] top-[3.21px] absolute origin-top-left -rotate-45 bg-white rounded-[1px]"></div>
          </div>
        </button>
      </div>
      <div className='mt-12'>
        <input
          type="file"
          ref={inputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
        {/* Profile */}
        {picture ? (
          <div className="flex justify-center items-center bg-white/5 rounded-lg h-[190px] w-full relative">
            <img src={picture} alt="Profile" className="w-[100%] object-cover h-[190px] rounded-lg" />
            <button className="absolute right-3 top-3" onClick={handlePicture}>
              <PencilIcon className='w-6 h-6' containerClassName="" />
            </button>
            <div className="absolute bottom-[-10px] left-3">
              <Typography variant="lead" className='text-white font-semibold'>@{data?.username},</Typography>
              <Typography className='text-white'>Male</Typography>

              <div className="flex gap-3 mt-2">
                <div className="h-9 px-4 py-2 bg-white/5 rounded-[100px] backdrop-blur-[50px] justify-start items-center gap-2 inline-flex">
                  <div data-svg-wrapper className="relative">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.4166 15.9417C16.6666 14.8083 16.6666 12.65 16.6666 11.6667C16.6666 10.7826 16.3154 9.93476 15.6903 9.30964C15.0652 8.68452 14.2174 8.33333 13.3333 8.33333C12.75 8.33333 12.1666 8.49999 11.6666 8.79999V4.99999C11.6666 4.33695 11.4032 3.70107 10.9344 3.23223C10.4656 2.76338 9.82968 2.49999 9.16664 2.49999C8.54164 2.49999 7.9583 2.74166 7.49997 3.14999C7.04187 2.73952 6.4484 2.51253 5.8333 2.51253C5.2182 2.51253 4.62474 2.73952 4.16664 3.14999C3.7083 2.73333 3.11664 2.49999 2.49997 2.49999V4.16666C2.72098 4.16666 2.93294 4.25446 3.08923 4.41074C3.24551 4.56702 3.3333 4.77898 3.3333 4.99999V13.3333H4.99997V4.99999C4.99997 4.77898 5.08777 4.56702 5.24405 4.41074C5.40033 4.25446 5.61229 4.16666 5.8333 4.16666C6.05432 4.16666 6.26628 4.25446 6.42256 4.41074C6.57884 4.56702 6.66664 4.77898 6.66664 4.99999V13.3333H8.3333V4.99999C8.3333 4.77898 8.4211 4.56702 8.57738 4.41074C8.73366 4.25446 8.94562 4.16666 9.16664 4.16666C9.38765 4.16666 9.59961 4.25446 9.75589 4.41074C9.91217 4.56702 9.99997 4.77898 9.99997 4.99999V11.6667C9.99997 12.65 9.99997 14.8083 11.25 15.9417C10.6 16.2833 9.89997 16.5333 9.16664 16.6667V18.3333C10.2416 18.3333 12.3666 17.2833 13.3333 16.775C14.3 17.2833 16.425 18.3333 17.5 18.3333V16.6667C16.7666 16.5333 16.0666 16.2833 15.4166 15.9417ZM13.3333 9.99999C13.7753 9.99999 14.1993 10.1756 14.5118 10.4881C14.8244 10.8007 15 11.2246 15 11.6667C15 14.1 14.55 15 13.3333 15C12.1166 15 11.6666 14.1 11.6666 11.6667C11.6666 11.2246 11.8422 10.8007 12.1548 10.4881C12.4674 10.1756 12.8913 9.99999 13.3333 9.99999Z" fill="white"/>
                    </svg>
                  </div>
                  <div className="text-center text-white text-sm font-semibold">{data?.horoscope}</div>
                </div>
                <div className="h-9 px-4 py-2 bg-white/5 rounded-[100px] backdrop-blur-[50px] justify-start items-center gap-2 inline-flex">
                  <div data-svg-wrapper className="relative">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.4168 11.25C6.28038 11.0243 7.92268 9.93055 8.33347 9.58334V6.66667L5.83347 5.83334C5.6623 5.15817 5.13118 3.7963 4.58347 3.33334L3.98004 5.21413C2.89601 5.69638 1.12495 7.87038 2.08346 10.4167C2.50013 11.25 3.36551 14.1667 4.58347 16.25" stroke="white" strokeWidth="1.44841" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M10 5.50223C11.8297 5.19952 15.6353 5.53248 16.2208 9.28594C16.3428 9.84094 16.1476 12.5036 14.3911 13.7144C14.0373 13.9583 13.75 14.9999 13.75 16.2499" stroke="white" strokeWidth="1.44841" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M10.8334 16.6666C10.8334 15.7462 10.0872 15 9.16671 15C8.24625 15 7.50005 15.7462 7.50005 16.6666" stroke="white" strokeWidth="1.44841" strokeLinecap="round"/>
                      <path d="M16.25 9.99999C16.4584 10.4167 17.3744 10.6956 18.0116 10.0424C18.3825 9.66207 18.6862 8.47244 17.7492 7.91665" stroke="white" strokeWidth="1.44841" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="text-center text-white text-sm font-semibold">{data?.zodiac}</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-[190px] bg-[#152229] rounded-2xl relative">
            <button className="absolute right-3 top-3">
              <PencilIcon className='w-6 h-6' containerClassName="" />
            </button>
            <div className="absolute bottom-3 left-3">
              <Typography className='text-white font-semibold'>@{data?.username},</Typography>
            </div>
          </div>
        )}

        {/* Card About */}
        {isEditAbout ? (
          <FormAbout
            data={data}
            handleBack={() => {
              getProfile();
              handleEditAbout();
            }}
          />
        ) : (
          <CardContainer>
            <div className="flex justify-between items-center">
              <Typography className='text-white font-semibold'>About</Typography>
              <button onClick={handleEditAbout}>
                <PencilIcon className='w-6 h-6' containerClassName="" />
              </button>
            </div>

            <div className="mt-3">
              {(data?.birthday || data?.horoscope || data?.zodiac || data?.weight || data?.height) ? (
                <div className="flex flex-col gap-2">
                  <Typography className='text-white'><span className="text-gray-400">Birthday:</span> {dateFormat(data?.birthday, 'DD / MM / YYYY')} (Age {getAge(data?.birthday)})</Typography>
                  <Typography className='text-white'><span className="text-gray-400">Heroscope:</span> {data?.horoscope}</Typography>
                  <Typography className='text-white'><span className="text-gray-400">Zodiac:</span> {data?.zodiac}</Typography>
                  <Typography className='text-white'><span className="text-gray-400">Height:</span> {data?.height} cm</Typography>
                  <Typography className='text-white'><span className="text-gray-400">Weight:</span> {data?.weight} kg</Typography>
                </div>
              ) : (
                <Typography className='text-gray-400'>Add in your your to help others know you better</Typography>
              )}
            </div>
          </CardContainer>
        )}

        {/* Interest About */}
        <CardContainer>
          <div className="flex justify-between items-center">
            <Typography className='text-white font-semibold'>Interest</Typography>
            <button onClick={handleUpdateInterests}>
              <PencilIcon className='w-6 h-6' containerClassName="" />
            </button>
          </div>

          <div className="mt-3">
            {data?.interests?.length && isArray(data?.interests) ? (
              <div className="flex flex-wrap gap-2">
                {data?.interests.map((interest) => (
                  <Typography key={interest} className='text-white bg-white/5 px-4 py-2 rounded-[100px]'>{interest}</Typography>
                ))}
              </div>
            ) : (
              <Typography className='text-gray-400'>Add in your interest to find a better match</Typography>
            )}
          </div>
        </CardContainer>
      </div>
    </div>
  )
}
