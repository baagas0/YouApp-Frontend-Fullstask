import React, { useRef, useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import Typography from '../atoms/Typography';

interface PictureInputProps {
  value?: string | readonly string[] | number | undefined;
  onChange?: (file: File) => void | undefined;
  label?: string;
  containerClassName?: string;
  className?: string;
  error?: string;
}

function PictureInput(props: PictureInputProps): React.JSX.Element {
  const { label, value, onChange, containerClassName, className, error } = props;
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
    };
      reader.readAsDataURL(file);
      onChange?.(file);
    }
  };

  return (
    <>
      <div className='flex gap-3 items-center w-full'>
        <button 
          type='button' 
          className='w-[57px] h-[57px] relative overflow-hidden rounded-[17px]'
          onClick={handleClick}
        >
          {preview ? (
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-cover"
            />
          ) : (
            <>
              <div className='w-full h-full absolute top-0 left-0 bg-white/10'></div>
              <div data-svg-wrapper className='left-[19px] top-[19px] absolute'>
                <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path fillRule='evenodd' clipRule='evenodd' d='M11 1C11 0.447715 10.5523 0 10 0C9.44771 0 9 0.447715 9 1V9H1C0.447715 9 0 9.44771 0 10C0 10.5523 0.447715 11 1 11H9V19C9 19.5523 9.44771 20 10 20C10.5523 20 11 19.5523 11 19V11H19C19.5523 11 20 10.5523 20 10C20 9.44771 19.5523 9 19 9H11V1Z' fill='url(#paint0_linear_110_373)' />
                  <defs>
                    <linearGradient id='paint0_linear_110_373' x1='-3.5' y1='16.4706' x2='25.4962' y2='8.19759' gradientUnits='userSpaceOnUse'>
                      <stop offset='0.0237305' stopColor='#94783E' />
                      <stop offset='0.216904' stopColor='#F3EDA6' />
                      <stop offset='0.329505' stopColor='#F8FAE5' />
                      <stop offset='0.486109' stopColor='#FFE2BE' />
                      <stop offset='0.723574' stopColor='#D5BE88' />
                      <stop offset='0.809185' stopColor='#F8FAE5' />
                      <stop offset='0.902849' stopColor='#D5BE88' />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </>
          )}
        </button>
        <input
          type="file"
          ref={inputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
        <Typography className='text-white font-semibold'>{label}</Typography>
      </div>
      {error && (
        <Typography variant="paragraph-xs" className="text-error font-light mt-1">{error}</Typography>
      )}
    </>
  );
}

export default PictureInput;