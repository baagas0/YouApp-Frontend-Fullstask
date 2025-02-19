import React from 'react';
import classNames from 'classnames';

interface LineSeparatorProps {
  className?: string;
}

function LineSeparator(props: LineSeparatorProps): React.JSX.Element {
  const { className } = props;
  const lineStyles = classNames(
    'w-full h-[1px] bg-border-default',
    className,
  );

  return (
    <div className={lineStyles} />
  );
}

export default LineSeparator;
