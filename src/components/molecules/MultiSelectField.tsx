import React from 'react';
import { isEmpty } from 'lodash';
import classNames from 'classnames';
import Typography from '@/components/atoms/Typography';
import MultiSelect, { MultiSelectValue } from '../atoms/MultiSelect';

export interface SelectProps { label: string; value: string | number; disabled?: boolean }

interface Props {
  loading?: boolean;
  searchable?: boolean;
  label?: string | undefined;
  affix?: React.ReactNode | undefined;
  info?: React.ReactNode | undefined;
  required?: boolean;
  valid?: boolean;
  error?: string;
  placeholder?: string | undefined;
  value?: (string | number)[] | undefined;
  onChange: (e: MultiSelectValue) => void;
  testID: string;
  name?: string;
  options: SelectProps[];
  variant?: 'default' | 'plain';
  className?: string;
  inputClassName?: string;
  disabled?: boolean;
  information?: any;
  labelClassName?: string;
}

function MultiSelectField(props: Props): React.JSX.Element {
  const {
    loading = false,
    searchable = false,
    label,
    affix,
    info,
    required,
    valid,
    error,
    placeholder,
    value,
    onChange,
    testID,
    name,
    options = [],
    variant = 'default',
    className,
    inputClassName,
    disabled = false,
    information,
    labelClassName,
  } = props;

  const isError = !isEmpty(error);

  const variants = {
    default: 'bg-white p-4 rounded-2xl border border-black border-opacity-10',
    plain: '',
  };

  const labelComputedClasses = classNames(
    'text-base text-text-gray',
    {
      'text-valid': valid,
      'text-error': isError,
    },
  );

  const inputComputedClasses = classNames(
    'relative flex rounded-lg border border-[#D9D9D9] bg-white/5',
    {
      'border-valid': valid,
      'border-error': isError,
      'bg-gray-100': disabled,
    },
    className,
  );

  const computedClasses = classNames(
    'flex flex-col w-full',
    variants[variant],
  );

  return (
    <div className={computedClasses}>
      {(!isEmpty(label) || !isEmpty(information)) && (
        <div className={`w-full flex justify-between items-center mb-4 ${labelClassName}`}>
          {!isEmpty(label) && (
            <label className={labelComputedClasses} htmlFor={label}>
              {label}
              {required && <span className="text-required">*</span>}
            </label>
          )}
          {information && (
            <div className="w-fit">{information}</div>
          )}
        </div>
      )}
      <div className={inputComputedClasses}>
        {affix && affix}
        <MultiSelect
          className={inputClassName}
          loading={loading}
          searchable={searchable}
          testID={testID}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          options={options}
          disabled={disabled}
        />
      </div>
      {isError && (
        <Typography className="text-error font-light mt-1">{error}</Typography>
      )}
      {info && info}
    </div>
  );
}

export default MultiSelectField;
