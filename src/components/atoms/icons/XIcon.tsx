import React from 'react';
import classNames from 'classnames';
import { IconProps } from '@/components/atoms/icons/type';

function XIcon(props: IconProps): React.JSX.Element {
  const { className = '', containerClassName } = props;
  const computedClassNames = classNames(
    'fill-icon-gray',
    className,
  );

  return (
    <svg className={containerClassName} width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="Group 1000005847">
        <path className={computedClassNames} id="Vector 872" d="M10.9601 3.53552L3.53552 10.9601" stroke="white" strokeLinecap="round"/>
        <path className={computedClassNames} id="Vector 873" d="M3.71234 3.71228L11.137 11.1369" stroke="white" strokeLinecap="round"/>
      </g>
    </svg>
    
  );
}

export default XIcon;
