import React, { forwardRef } from 'react';
import classNames from 'classnames';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  testID: string;
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    testID,
    className = '',
    ...others
  } = props;

  const computedClasses = classNames(
    'outline-none w-full text-base font-medium placeholder-[#868D9D] placeholder-opacity-50 placeholder:text-sm',
    className,
    {
      '!bg-gray-100': props.disabled,
    },
  );

  return (
    <input
      {...others}
      ref={ref}
      maxLength={255}
      data-testid={testID}
      className={computedClasses}
      autoComplete="off"
      aria-autocomplete="none"
    />
  );
});

export default Input;
