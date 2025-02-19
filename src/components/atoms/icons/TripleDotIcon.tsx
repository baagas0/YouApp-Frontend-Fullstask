import React from 'react';
import classNames from 'classnames';
import { IconProps } from '@/components/atoms/icons/type';

function TripleDotIcon(props: IconProps): React.JSX.Element {
  const { className = '', containerClassName } = props;
  const computedClassNames = classNames(
    'fill-icon-gray',
    className,
  );

  return (
    <svg className={containerClassName} width="22" height="7" viewBox="0 0 22 7" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect className={computedClassNames} y="3.20728" width="4.5358" height="4.5358" rx="1" transform="rotate(-45 0 3.20728)" fill="white"/>
      <rect className={computedClassNames} x="7.41504" y="3.20752" width="4.5358" height="4.5358" rx="1" transform="rotate(-45 7.41504 3.20752)" fill="white"/>
      <rect className={computedClassNames} x="14.8301" y="3.20752" width="4.5358" height="4.5358" rx="1" transform="rotate(-45 14.8301 3.20752)" fill="white"/>
    </svg>
  );
}

export default TripleDotIcon;
