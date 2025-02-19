import React, {
  ButtonHTMLAttributes,
  MouseEventHandler,
} from 'react';
import classNames from 'classnames';
import Loading from '@/components/atoms/Loading';

export type ButtonVariant = 'contained' | 'outline' | 'underline' | 'plain';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  testID: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  className?: string;
  variant?: ButtonVariant;
  rounded?: boolean;
  small?: boolean;
  loading?: boolean;
  disabled?: boolean;
}

function Button(props: ButtonProps): React.JSX.Element {
  const {
    testID,
    children,
    type = 'button',
    onClick,
    className = '',
    variant = 'contained',
    rounded = false,
    small = false,
    loading = false,
    disabled = false,
    ...others
  } = props;
  const baseStyles = 'px-4 py-2 rounded-md text-base font-medium';
  const smallStyles = '!px-2 !py-1';
  const roundedStyles = '!rounded-full';
  const variants = {
    contained: 'bg-button-blue text-white',
    outline: 'border border-border-default text-primary',
    underline: '!px-0 !py-0 text-primary border-b border-b-primary rounded-none',
    plain: '!px-0 !py-0 text-primary',
  };

  const loadingVariants = {
    contained: 'border-white',
    outline: 'border-primary',
    underline: 'border-primary',
    plain: 'border-primary',
  };

  const loadingStyles = classNames(
    'mr-2 !w-4 !h-4',
    loadingVariants[variant],
  );

  const computedClasses = classNames(
    baseStyles,
    {
      [smallStyles]: small,
      [roundedStyles]: rounded,
      'opacity-50 !bg-gray-600 !text-white': disabled,
    },
    variants[variant],
    className,
  );

  const contentStyles = classNames(
    'flex items-center',
    {
      'justify-center': variant !== 'plain',
    },
  );

  return (
    <button
      disabled={disabled || loading}
      data-testid={testID}
      type={type}
      onClick={onClick}
      className={computedClasses}
      {...others}
    >
      <div className={contentStyles}>
        {loading && <Loading className={loadingStyles} />}
        {children}
      </div>
    </button>
  );
}

export default Button;
