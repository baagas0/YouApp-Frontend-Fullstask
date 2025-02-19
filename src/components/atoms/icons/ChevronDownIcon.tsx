import React from 'react';
import classNames from 'classnames';
import { IconProps } from '@/components/atoms/icons/type';

function ChevronDownIcon(props: IconProps): React.JSX.Element {
  const { className = '', containerClassName } = props;
  const computedClassNames = classNames(
    'fill-icon-gray',
    className,
  );

  return (
    <svg className={containerClassName} width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path className={computedClassNames} d="M17.6914 6.28929L9.72901 13.8352C9.46235 14.0578 9.21235 14.1484 8.99985 14.1484C8.78736 14.1484 8.50111 14.057 8.30861 13.8728L0.308717 6.28929C-0.0911107 5.91426 -0.104111 5.25074 0.278718 4.8922C0.658921 4.49553 1.29454 4.48263 1.69162 4.86258L8.99985 11.7911L16.3081 4.86747C16.7039 4.48753 17.3406 4.50043 17.721 4.89709C18.1039 5.25074 18.0914 5.91426 17.6914 6.28929Z" />
    </svg>
  );
}

export default ChevronDownIcon;
