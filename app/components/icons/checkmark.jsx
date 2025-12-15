import React from 'react';

const Checkmark = ({ width = '10', height = '8', ...props }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 10 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0.557617 4.6792L3.55762 6.6792L9.05762 0.679199"
        stroke="white"
        strokeWidth="2.01011"
      />
    </svg>
  );
};

export default Checkmark;
