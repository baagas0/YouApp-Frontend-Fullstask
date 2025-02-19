import React from 'react';
import classNames from 'classnames';
import { IconProps } from '@/components/atoms/icons/type';

function PencilIcon(props: IconProps): React.JSX.Element {
  const { className = '', containerClassName } = props;
  const computedClassNames = classNames(
    'fill-icon-gray',
    className,
  );

  return (
    <svg className={containerClassName} width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path className={computedClassNames} d="M9.39257 2.54987L3.57715 8.70528C3.35757 8.93903 3.14507 9.39945 3.10257 9.7182L2.84048 12.0132C2.7484 12.842 3.3434 13.4086 4.16507 13.267L6.4459 12.8774C6.76465 12.8207 7.2109 12.587 7.43048 12.3461L13.2459 6.1907C14.2517 5.1282 14.7051 3.91695 13.1397 2.43654C11.5813 0.970285 10.3984 1.48737 9.39257 2.54987Z" stroke="white" strokeWidth="1.0625" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
      <path className={computedClassNames} d="M8.42201 3.57715C8.72659 5.53215 10.3133 7.02673 12.2824 7.22506" stroke="white" strokeWidth="1.0625" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
      <path className={computedClassNames} d="M2.125 15.5833H14.875" stroke="white" strokeWidth="1.0625" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default PencilIcon;
