import React from 'react';

interface SwitchProps {
  enabled: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

function Switch(props: SwitchProps): React.JSX.Element {
  const { enabled, onClick, disabled = false } = props;
  return (
    <button
      disabled={disabled}
      aria-label="switch"
      className={`${
        enabled ? 'bg-primary' : 'bg-gray-200'
      } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none`}
      onClick={onClick}
    >
      <span
        className={`${
          enabled ? 'translate-x-6' : 'translate-x-1'
        } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
      />
    </button>
  );
}

export default Switch;
