import React from 'react';

export const Dots = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg">
      <pattern id="p" width="70" height="70" patternUnits="userSpaceOnUse">
        <circle fill="#000FFF" cx="70" cy="70" r="3" />
        <circle r="3" fill="#000FFF" />
        <circle cx="70" r="3" fill="#000FFF" />
        <circle cy="70" r="3" fill="#000FFF" />
      </pattern>
      <rect fill="url(#p)" width="100%" height="100%" />
    </svg>
  );
};
