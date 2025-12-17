import React from 'react';
import Checkmark from '../icons/checkmark.jsx';

const Checkbox = ({ id, label, name, ...props }) => {
  return (
    <div role="button" className="inline-flex items-center rounded-md">
      <label
        htmlFor={id}
        className="flex w-full cursor-pointer items-center px-3 py-2"
      >
        <div className="inline-flex items-center">
          <label
            className="flex items-center cursor-pointer relative"
            htmlFor={id}
          >
            <input
              type="checkbox"
              className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-primary checked:border-primary"
              id={id}
              name={name}
              {...props}
            />
            <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Checkmark />
            </span>
          </label>
          <label
            className="cursor-pointer ml-2 text-primary text-sm"
            htmlFor={id}
          >
            {label}
          </label>
        </div>
      </label>
    </div>
  );
};

export default Checkbox;
