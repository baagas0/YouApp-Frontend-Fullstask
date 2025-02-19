import React, { forwardRef, HTMLInputTypeAttribute, useState } from 'react';
import { isEmpty } from 'lodash';
import classNames from 'classnames';
import Typography from '@/components/atoms/Typography';
import Input from '@/components/atoms/Input';

interface Props {
  containerClassName?: string;
  inputClassName?: string;
  type?: HTMLInputTypeAttribute | undefined;
  label?: string | undefined;
  labelInfo?: React.ReactNode | undefined;
  affix?: React.ReactNode | undefined;
  suffix?: React.ReactNode | undefined;
  info?: React.ReactNode | undefined;
  required?: boolean;
  valid?: boolean;
  error?: string;
  placeholder?: string | undefined;
  value?: string | readonly string[] | number | undefined;
  checked?: boolean | undefined;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void | undefined;
  onFocus?: () => void | undefined;
  onBlur?: () => void | undefined;
  onEnter?: () => void | undefined;
  testID: string;
  name?: string;
  variant?: 'default' | 'plain';
  disabled?: boolean;
  min?: number | string | undefined;
  max?: number | string | undefined;
  number?: boolean;
  readonly?: boolean;
}

const InputField = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const {
    containerClassName,
    inputClassName,
    type,
    label,
    labelInfo,
    affix,
    suffix,
    info,
    required,
    valid,
    error,
    placeholder,
    value,
    checked,
    onChange,
    onFocus,
    onBlur,
    onEnter,
    testID,
    name,
    variant = 'default',
    disabled = false,
    min,
    max,
    number = false,
    readonly,
  } = props;

  const [isFocus, setIsFocus] = useState(false);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onEnter) {
      onEnter();
    }
  };

  const handleFocus = () => {
    if (onFocus) onFocus();
    setIsFocus(true);
  };

  const handleBlur = () => {
    if (onBlur) onBlur();
    setIsFocus(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (number) {
      if (/^\d*$/.test(e.target.value)) {
        if (onChange) {
          onChange(e);
        }
      }
    } else if (onChange) {
      onChange(e);
    }
  };

  const isError = !isEmpty(error);

  const variants = {
    default: 'bg-white p-4 rounded-2xl border border-black border-opacity-10',
    plain: '',
  };

  const labelComputedClasses = classNames(
    'text-base',
    {
      'text-primary': isFocus,
      '!text-valid': valid,
      '!text-error': isError,
    },
  );

  const inputComputedClasses = classNames(
    'relative flex rounded-md bg-white/0',
    {
      'border-primary': isFocus,
      '!border-valid': valid,
      '!border-error': isError,
      '!bg-gray-100': disabled,
    },
  );

  const computedClasses = classNames(
    'flex flex-col',
    variants[variant],
    containerClassName,
  );

  const renderLabel = () => {
    if (!isEmpty(label)) {
      return (
        <div className="flex justify-between mb-4">
          <label className={labelComputedClasses} htmlFor={label}>
            {label}
            {required && <span className="text-required">*</span>}
          </label>
          {!isEmpty(labelInfo) && labelInfo}
        </div>
      );
    }
    return null;
  };

  return (
    <div className={computedClasses} data-cek="sad">
      {renderLabel()}
      <div className={inputComputedClasses}>
        {affix && affix}
        <Input
          className={`rounded-lg py-4 px-4 bg-white/5 ${inputClassName}`}
          ref={ref}
          testID={testID}
          disabled={disabled}
          readOnly={readonly}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyPress}
          min={min}
          max={max}
          checked={checked}
        />
        {suffix && suffix}
      </div>
      {info && info}
      {isError && (
        <Typography variant="paragraph-xs" className="text-error font-light mt-1">{error}</Typography>
      )}
    </div>
  );
});

export default InputField;
