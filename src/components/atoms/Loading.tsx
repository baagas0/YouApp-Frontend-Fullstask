import React from 'react';
import classNames from 'classnames';

interface LoadingProps {
  className?: string;
}

function Loading(props: LoadingProps): React.JSX.Element {
  const { className } = props;
  const loadingStyles = classNames(
    'w-8 h-8 border-2 border-t-2 border-t-transparent border-primary rounded-full animate-spin',
    className,
  );

  return (
    <div className="flex items-center justify-center">
      <div className={loadingStyles} />
    </div>
  );
}

export default Loading;
