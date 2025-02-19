import React from 'react';
import classNames from 'classnames';
import { IconProps } from '@/components/atoms/icons/type';

function CircleCheckIcon(props: IconProps): React.JSX.Element {
  const { className = '', containerClassName } = props;
  const computedClassNames = classNames(
    'fill-icon-gray',
    className,
  );
  return (
    <svg className={containerClassName} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="mask0_2767_4347" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16">
        <rect width="16" height="16" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_2767_4347)">
        <path className={computedClassNames} d="M8 0C3.58125 0 0 3.58125 0 8C0 12.4187 3.58125 16 8 16C12.4187 16 16 12.4187 16 8C16 3.58125 12.4187 0 8 0ZM11.6187 6.61875L7.61875 10.6187C7.44688 10.7906 7.225 10.875 7 10.875C6.775 10.875 6.55188 10.79 6.38094 10.6191L4.38094 8.61913C4.04 8.27725 4.04 7.72256 4.38094 7.38069C4.72281 7.03881 5.2775 7.03881 5.61938 7.38069L7 8.7625L10.3813 5.38125C10.7231 5.03937 11.2778 5.03937 11.6197 5.38125C11.9594 5.72187 11.9594 6.27813 11.6187 6.61875Z" />
      </g>
    </svg>
  );
}

export default CircleCheckIcon;
