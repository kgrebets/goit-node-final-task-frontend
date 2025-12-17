import React from 'react';

const ArrowLeft = ({ width = '18', height = '18', ...props }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M14.3029 9.0005L3.6963 8.99935"
        stroke="#050505"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.99902 14.3032L3.6963 8.99935L9.00017 3.69662"
        stroke="#050505"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowLeft;
