import React from 'react';
import Image from 'next/image';
import Input from '@/components/atoms/Input';
import classNames from 'classnames';

interface SearchInputProps {
  placeholder?: string | undefined;
  value?: string | readonly string[] | number | undefined;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void | undefined;
  testID: string;
  name?: string;
  containerClassName?: string;
  className?: string;
}

function SearchInput(props: SearchInputProps): React.JSX.Element {
  const {
    placeholder,
    testID,
    name,
    value,
    onChange,
    containerClassName,
    className,
  } = props;

  const containerStyle = classNames(
    'flex py-2 px-4 rounded-md border border-[#D9D9D9] bg-white',
    containerClassName,
  );

  return (
    <div className="flex flex-col w-full">
      <div className={containerStyle}>
        <Image src="/icons/magnifying-glass.svg" alt="search-icon" width={16} height={16} className="mr-4" />
        <Input
          testID={testID}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          className={className}
        />
      </div>
    </div>
  );
}

export default SearchInput;
