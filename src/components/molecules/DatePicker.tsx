import React, { useState } from 'react';
import RNDatePicker, { ReactDatePickerProps } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { isArray, isEmpty } from 'lodash';
import classNames from 'classnames';
import Typography from '@/components/atoms/Typography';
import Switch from '@/components/atoms/Switch';

interface DatePickerProps extends ReactDatePickerProps {
  label?: string | undefined;
  affix?: React.ReactNode | undefined;
  suffix?: React.ReactNode | undefined;
  action?: React.ReactNode | undefined;
  required?: boolean;
  valid?: boolean;
  error?: string;
  containerClassName?: string;
  inputClassName?: string;
  className?: string;
  testID: string;
  variant?: 'default' | 'plain';
  range?: boolean;
  dateFormat?: string;
  switchText?: string;
  defaultSelectRange?: boolean;
  onChangeDate: (value: { startDate: Date; endDate: Date | undefined }) => void;
}

function DatePicker(props: DatePickerProps): React.JSX.Element {
  const {
    label,
    affix,
    suffix,
    action,
    required,
    valid,
    error,
    testID,
    variant = 'default',
    containerClassName = '',
    inputClassName = '',
    className = '',
    onChangeDate,
    startDate,
    endDate,
    range = false,
    dateFormat = 'dd/MM/yyyy',
    defaultSelectRange = false,
    disabled = false,
    switchText = 'Libur Panjang',
    ...others
  } = props;

  const [isSelectsRange, setIsSelectsRange] = useState(defaultSelectRange !== undefined ? defaultSelectRange : (startDate !== endDate));

  const handleDateChange = (dates: Date) => {
    if (isArray(dates)) {
      const [start] = dates;
      let [, end] = dates;

      // Logic to handle if start and end date is the same
      if (start && end) {
        start.setHours(0, 0, 0, 0);
        end.setHours(0, 0, 0, 0);
        if (start.getTime() === end.getTime()) {
          end = undefined;
          setIsSelectsRange(false);
        }
      }
      onChangeDate({ startDate: start, endDate: end });
    } else {
      onChangeDate({ startDate: dates, endDate: undefined });
    }
  };

  const toggleRange = () => {
    const newSelectRange = !isSelectsRange;
    setIsSelectsRange(newSelectRange);

    if (!newSelectRange) {
      handleDateChange(startDate || new Date());
    } else {
      handleDateChange([startDate || new Date(), null] as any);
    }
  };

  const isError = !isEmpty(error);

  const variants = {
    default: 'bg-white p-4 rounded-2xl border border-black border-opacity-10',
    plain: '',
  };

  const labelComputedClasses = classNames(
    'text-base text-[#1E1E1E] mb-4',
    {
      'text-valid': valid,
      'text-error': isError,
    },
  );

  const inputComputedClasses = classNames(
    'flex py-2 px-4 rounded-lg border border-white/10 bg-white/5',
    {
      'border-valid': valid,
      'border-error': isError,
      '!bg-black-5': disabled,
    },
    inputClassName,
  );

  const computedClasses = classNames(
    'flex flex-col',
    variants[variant],
    containerClassName,
  );

  const computedInputClasses = classNames(
    'outline-none w-full text-base bg-white/0 font-medium placeholder-[#868D9D] placeholder-opacity-50',
    className,
  );

  return (
    <div className={computedClasses}>
      <div className="flex flex-col">
        {(!isEmpty(label) || !isEmpty(action)) && (
          <div className="flex justify-between">
            {!isEmpty(label) && (
              <label className={labelComputedClasses} htmlFor={label}>
                {label}
                {required && <span className="text-required">*</span>}
              </label>
            )}
            {range && (
              <div className="flex items-center gap-[10px] mb-4">
                <Typography className="opacity-50">{switchText}</Typography>
                <Switch enabled={isSelectsRange} onClick={toggleRange} />
              </div>
            )}
            {action && <div className="mb-4">{action}</div>}
          </div>
        )}
        <div className={inputComputedClasses} data-testid={testID}>
          {affix && affix}
          <RNDatePicker
            {...others}
            showMonthDropdown
            showYearDropdown
            disabled={disabled}
            className={computedInputClasses}
            selected={startDate}
            onChange={handleDateChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange={isSelectsRange}
            dateFormat={dateFormat}
          />
          {suffix && suffix}
        </div>
      </div>
      {isError && (
        <Typography className="text-error font-light mt-1">{error}</Typography>
      )}
    </div>
  );
}

export default DatePicker;
