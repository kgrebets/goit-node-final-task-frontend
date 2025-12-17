import React from 'react';

const arrowUpRight = ({ width = '18', height = '18', ...props }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 18 18"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5.25 12.75L12.75 5.25"
        stroke="#050505"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.25 5.25H12.75V12.75"
        stroke="#050505"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default arrowUpRight;
