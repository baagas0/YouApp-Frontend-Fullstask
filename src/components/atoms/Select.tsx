import React, {
  useEffect, useRef, useState,
} from 'react';
import classNames from 'classnames';
import Loading from '@/components/atoms/Loading';
import Typography from '@/components/atoms/Typography';
import ChevronDownIcon from '@/components/atoms/icons/ChevronDownIcon';
import LineSeparator from '@/components/atoms/LineSeparator';
import { useFreshCallback } from '@/hooks/utils';
import {
  filter, find, lowerCase, noop,
} from 'lodash';
import SearchInput from '@/components/molecules/SearchInput';

export interface SelectValue {
  target: {
    value: string | number;
    name?: string;
  };
}

interface SelectProps {
  loading?: boolean;
  searchable?: boolean;
  placeholder?: string | undefined;
  className?: string;
  disabled?: boolean;
  name?: string;
  value?: string | readonly string[] | number | undefined;
  onChange: (e: SelectValue) => void;
  testID: string;
  options: { label: string; value: string | number; disabled?: boolean }[];
}

function Select(props: SelectProps): React.JSX.Element {
  const {
    loading = false,
    searchable = false,
    className = '',
    disabled = false,
    value,
    name,
    onChange,
    placeholder,
    testID,
    options = [],
  } = props;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string | undefined>(undefined);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    if (disabled) return;
    setIsOpen(!isOpen);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleChange = useFreshCallback((val: string | number) => {
    onChange({
      target: {
        value: val,
        name,
      },
    });
    setIsOpen(false);
  });

  const computedClasses = classNames(
    'relative flex items-center w-full min-h-7',
    {
      '!bg-gray-100': disabled,
    },
    className,
  );

  useEffect(() => {
    if (!isOpen) {
      setSearch(undefined);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const text = find(options, (option) => option.value === value)?.label;

  const filteredOptions = filter(options, (option) => lowerCase(option.label).includes(lowerCase(search)));

  return (
    <div ref={menuRef} data-testid={testID} className={computedClasses}>
      <div className={`w-full pl-4 pr-10 py-2 ${disabled ? 'cursor-default' : 'cursor-pointer'}`} onClick={disabled ? noop : toggleDropdown}>
        {!text ? (
          <Typography variant="paragraph" className="font-semibold text-text-secondary opacity-50">{placeholder}</Typography>
        ) : (
          <Typography variant="paragraph" className="font-semibold text-text-gray line-clamp-1">{text}</Typography>
        )}
      </div>
      <div className="absolute right-4 flex items-center" onClick={toggleDropdown}>
        {loading ? <Loading className="!w-4 !h-4" /> : <ChevronDownIcon className='fill-gray-500 h-2 w-2' containerClassName='h-3 w-3' />}
      </div>
      {isOpen && (
        <div
          className="flex flex-col gap-2 absolute z-10 left-0 top-0 mt-12 w-full bg-[#0e191f] border border-border-default border-white/20 rounded-md py-2 px-1"
        >
          {searchable && <SearchInput testID="search-select" value={search} onChange={handleSearch} />}
          <div className="flex flex-col max-h-52 overflow-y-scroll">
            {filteredOptions.map((option, index) => (
              <div key={`option-${option.value}`}>
                {index !== 0 && <LineSeparator />}
                <div className="p-2 hover:bg-white cursor-pointer" onClick={() => handleChange(option.value)}>
                  <Typography className="text-text-gray">{option.label}</Typography>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Select;
