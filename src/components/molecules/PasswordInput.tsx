'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import InputField from '@/components/molecules/InputField';
import Typography from '@/components/atoms/Typography';
import CircleCheckIcon from '@/components/atoms/icons/CircleCheckIcon';

interface Props {
  label?: string | undefined;
  error?: string | undefined;
  variant?: 'default' | 'plain';
  required?: boolean;
  showInfo?: boolean;
  placeholder?: string | undefined;
  value?: string | readonly string[] | number | undefined;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void | undefined;
}

interface InfoProps {
  text: string;
  valid?: boolean;
}

function Info(props: InfoProps): React.JSX.Element {
  const { valid, text } = props;
  return (
    <div className="flex items-center gap-2">
      <CircleCheckIcon width={16} height={16} className={valid ? 'fill-success' : '!fill-border-default'} />
      <Typography className={valid ? 'text-success' : 'text-red'}>{text}</Typography>
    </div>
  );
}

function isValidChar(input: string) {
  const regex = /^(.{8,20})$/;
  return regex.test(input);
}

function isValidNumberAndCapital(input: string) {
  const regex = /^(?=.*\d)(?=.*[A-Z]).+$/;
  return regex.test(input);
}

function isValidSpecialChar(input: string) {
  const regex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
  return regex.test(input);
}

function PasswordInput(props: Props): React.JSX.Element {
  const {
    label,
    error,
    variant = 'default',
    required,
    placeholder,
    value,
    onChange,
    showInfo = false,
  } = props;

  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const onFocus = () => {
      setIsFocused(true);
    };

    const onBlur = () => {
      setIsFocused(false);
    };

    if (showInfo && inputRef.current) {
      inputRef.current.addEventListener('focus', onFocus);
      inputRef.current.addEventListener('blur', onBlur);
    }

    return () => {
      if (showInfo && inputRef.current) {
        inputRef.current.removeEventListener('focus', onFocus);
        inputRef.current.removeEventListener('blur', onBlur);
      }
    };
  }, [inputRef]);

  return (
    <div className="relative">
      <InputField
        ref={inputRef}
        testID="password-input"
        variant={variant}
        label={label}
        required={required}
        type={showPassword ? 'text' : 'password'}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        error={error}
        suffix={(
          <button type="button" className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600" onClick={toggleShowPassword}>
            <Image src={showPassword ? '/icons/eye.svg' : '/icons/eye-slash.svg'} alt="show-password" width={16} height={16} />
          </button>
        )}
      />
      {showInfo && isFocused && (
        <div className="absolute z-10 mt-2 bg-white border border-border-default p-4 flex flex-col gap-2 rounded-md shadow">
          <Typography className="font-medium">
            Kata sandi harus berisi:
          </Typography>
          <Info text="Minimal 8 karakter (maks. 20)" valid={isValidChar(value as string)} />
          <Info text="Minimal 1 angka & huruf besar" valid={isValidNumberAndCapital(value as string)} />
          <Info text="Minimal 1 karakter khusus" valid={isValidSpecialChar(value as string)} />
        </div>
      )}
    </div>
  );
}

export default PasswordInput;
