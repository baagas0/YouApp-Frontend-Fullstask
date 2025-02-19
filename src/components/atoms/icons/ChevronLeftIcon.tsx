import React from 'react';
import classNames from 'classnames';
import { IconProps } from '@/components/atoms/icons/type';

function ChevronLeftIcon(props: IconProps): React.JSX.Element {
  const { className = '', containerClassName } = props;
  const computedClassNames = classNames(
    'fill-icon-gray',
    className,
  );
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={containerClassName}>
      <path className={computedClassNames} d="M12.0779 0.308594L4.53196 8.27099C4.30942 8.53765 4.21875 8.78765 4.21875 9.00015C4.21875 9.21264 4.3102 9.49889 4.49438 9.69139L12.0779 17.6913C12.4529 18.0911 13.1164 18.1041 13.475 17.7213C13.8717 17.3411 13.8846 16.7055 13.5046 16.3084L6.57608 9.00015L13.4997 1.69191C13.8797 1.29608 13.8668 0.659422 13.4701 0.279011C13.1164 -0.103901 12.4529 -0.0914021 12.0779 0.308594Z" />
    </svg>
  );
}

export default ChevronLeftIcon;
