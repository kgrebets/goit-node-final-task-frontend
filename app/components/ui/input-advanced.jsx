import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';

const InputAdvanced = ({
  Icon,
  type = 'text',
  iconClasses,
  inputClasses,
  mainWrapperClasses,
  showMinMaxChars,
  maxChars,
  ...props
}) => {
  const [minChars, setMinChars] = useState(0);

  const onInput = (e) => {
    props.onInput?.(e);

    if (showMinMaxChars) {
      setMinChars(e.target.value.length);

      if (maxChars && e.target.value.length > maxChars) {
        e.target.value = e.target.value.slice(0, maxChars);
        setMinChars(maxChars); // Also update minChars to match the sliced value
      }
    }
  };

  return (
    <div className={twMerge('space-y-3', mainWrapperClasses)}>
      <div className="relative">
        <input
          type={type}
          className={twMerge(
            'custom peer py-2.5 sm:py-3 pe-0 block w-full bg-transparent font-medium placeholder:text-tertiary',
            'border-t-transparent border-x-transparent border-b-1 border-b-tertiary',
            'focus:border-t-transparent focus:border-x-transparent focus:border-b-primary',
            'invalid:border-b-error-primary invalid:text-error-primary',
            'focus:outline-0 focus:ring-0',
            'disabled:opacity-50 disabled:pointer-events-none',
            Icon && 'ps-8',
            showMinMaxChars && 'pe-24',
            inputClasses,
          )}
          onInput={onInput}
          {...props}
        />
        <div className="absolute inset-y-2.5 start-0 flex items-start pointer-events-none ps-2 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
          {Icon ? (
            <Icon className={twMerge('shrink-0', 'size-4', iconClasses)} />
          ) : null}
        </div>
        {showMinMaxChars ? (
          <div className="absolute inset-y-2.5 end-0 flex items-start pointer-events-none pe-2 peer-disabled:opacity-50 peer-disabled:pointer-events-none invalid:text-error-primary">
            {minChars}<span className="text-tertiary invalid:text-error-primary">/{maxChars}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default InputAdvanced;
