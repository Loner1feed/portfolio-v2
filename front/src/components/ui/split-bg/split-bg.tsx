import React from 'react';

//style
import './split-bg.style.scss';
import { Dots } from 'components/icons/dots';

export const SplitBg = () => {
  return (
    <div className="split">
      <div className="split__solid"></div>
      <div className="split__dots">
        <Dots />
      </div>
    </div>
  );
};
