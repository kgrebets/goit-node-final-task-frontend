import React, { useState } from 'react';
import ChevronDown from '../icons/chevron-down.jsx';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

const Select = ({
  value = '',
  wrapperClassName,
  options = [],
  className = '',
  iconClassName = '',
  optionPlaceholderText = 'Select option',
  ...props
}) => {
  const [focused, setFocused] = useState(false);
  const [selectValue, setSelectValue] = useState(value);
  const isPlaceholder = selectValue === '' || selectValue == null;

  return (
    <div className={clsx('relative', wrapperClassName)}>
      <select
        {...props}
        value={selectValue}
        onChange={(e) => {
          setSelectValue(e.target.value);
          console.log(e.target.value);
          props.onChange?.(e);
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={twMerge(
          'w-full appearance-none pr-10 cursor-pointer',
          isPlaceholder ? 'text-tertiary' : 'text-primary',
          className
        )}
      >
        <option value=""  >
          {optionPlaceholderText}
        </option>

        {options.map((opt) => (
          <option key={opt.id} value={opt.id} disabled={opt.disabled}>
            {opt.name}
          </option>
        ))}
      </select>

      <span
        className={twMerge(
          'pointer-events-none absolute right-3 top-1/2 -translate-y-1/2',
          iconClassName
        )}
        aria-hidden="true"
      >
        {focused ? <ChevronDown className="rotate-180" /> : <ChevronDown />}
      </span>
    </div>
  );
};

export default Select;
