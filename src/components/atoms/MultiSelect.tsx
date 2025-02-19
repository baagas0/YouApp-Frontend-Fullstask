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
import XIcon from './icons/XIcon';

export interface MultiSelectValue {
  target: {
    value: (string | number)[];
    name?: string;
  };
}

interface MultiSelectProps {
  loading?: boolean;
  searchable?: boolean;
  placeholder?: string | undefined;
  className?: string;
  disabled?: boolean;
  name?: string;
  value?: (string | number)[] | undefined;
  onChange: (e: MultiSelectValue) => void;
  testID: string;
  options: { label: string; value: string | number; disabled?: boolean }[];
}

function MultiSelect(props: MultiSelectProps): React.JSX.Element {
  const {
    loading = false,
    searchable = false,
    className = '',
    disabled = false,
    value = [],
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
    const newValue = value.includes(val) ? value.filter((v) => v !== val) : [...value, val];
    onChange({
      target: {
        value: newValue,
        name,
      },
    });
    setIsOpen(false);
  });

  const handleRemove = (val: string | number) => {
    const newValue = value.filter((v) => v !== val);
    onChange({
      target: {
        value: newValue,
        name,
      },
    });
  }

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

  // const text = find(options, (option) => option.value === value)?.label;

  const filteredOptions = filter(options, (option) => lowerCase(option.label).includes(lowerCase(search)));

  return (
    <div ref={menuRef} data-testid={testID} className={computedClasses}>
      <div className={`w-full flex gap-2 flex-wrap px-2 py-2 ${disabled ? 'cursor-default' : 'cursor-pointer'}`} onClick={disabled ? noop : toggleDropdown}>
        {!value?.length ? (
          <Typography variant="paragraph" className="font-semibold text-text-secondary opacity-50">{placeholder}</Typography>
        ) : (
          <>
            {value.map((val, index) => (
              <div key={`multi-${index}`} className="bg-white/10 w-fit px-3 py-2 rounded-lg flex items-center justify-between gap-2">
                <Typography key={index} variant="paragraph-xs" className="font-semibold text-text-gray line-clamp-1">
                  {val}
                </Typography>
                <button type="button" onClick={() => handleRemove(val)}>
                  <XIcon className="!w-3 !h-3 ml-1" />
                </button>
              </div>
            ))}
          </>
        )}
      </div>
      <div className="absolute right-4 flex items-center" onClick={toggleDropdown}>
        {loading && <Loading className="!w-4 !h-4" />}
      </div>
      {isOpen && (
        <div
          className="flex flex-col gap-2 absolute z-10 left-0 top-0 mt-12 w-full bg-[#0e191f] border border-border-default border-white/20 rounded-md py-2 px-1"
        >
          {searchable && <SearchInput testID="search-MultiSelect" value={search} onChange={handleSearch} />}
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

export default MultiSelect;
