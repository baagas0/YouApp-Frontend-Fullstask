import React from 'react';
import classNames from 'classnames';
import { IconProps } from '@/components/atoms/icons/type';

function ChevronUpIcon(props: IconProps): React.JSX.Element {
  const { className = '', containerClassName } = props;
  const computedClassNames = classNames(
    'fill-icon-gray',
    className,
  );

  return (
    <svg className={containerClassName} width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path className={computedClassNames} d="M0.308594 12.5779L8.27099 5.03196C8.53765 4.80942 8.78765 4.71875 9.00015 4.71875C9.21264 4.71875 9.49889 4.8102 9.69139 4.99438L17.6913 12.5779C18.0911 12.9529 18.1041 13.6164 17.7213 13.975C17.3411 14.3717 16.7055 14.3846 16.3084 14.0046L9.00015 7.07608L1.69191 13.9997C1.29608 14.3797 0.659422 14.3668 0.279011 13.9701C-0.103901 13.6164 -0.0914019 12.9529 0.308594 12.5779Z" />
    </svg>
  );
}

export default ChevronUpIcon;
