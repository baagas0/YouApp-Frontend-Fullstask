import React from 'react';
import classNames from 'classnames';
import { IconProps } from '@/components/atoms/icons/type';

function ChevronRightIcon(props: IconProps): React.JSX.Element {
  const { className = '', containerClassName } = props;
  const computedClassNames = classNames(
    'fill-icon-gray',
    className,
  );
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={containerClassName}>
      <path className={computedClassNames} d="M5.9221 0.308594L13.468 8.27099C13.6906 8.53765 13.7812 8.78765 13.7812 9.00015C13.7812 9.21264 13.6898 9.49889 13.5056 9.69139L5.9221 17.6913C5.54707 18.0911 4.88355 18.1041 4.52501 17.7213C4.12834 17.3411 4.11544 16.7055 4.49539 16.3084L11.4239 9.00015L4.50028 1.69191C4.12035 1.29608 4.13325 0.659422 4.5299 0.279011C4.88355 -0.103901 5.54707 -0.0914021 5.9221 0.308594Z" />
    </svg>
  );
}

export default ChevronRightIcon;
