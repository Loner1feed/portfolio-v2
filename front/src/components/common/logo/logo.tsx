import React from 'react';

// styles
import './logo.style.scss';

export const Logo: React.FC = () => {
  return (
    <div className="logo">
      <a className="logo__inner">
        <div className="logo__img">
          <img src="https://avatars.githubusercontent.com/u/45013853?v=4" />
        </div>
      </a>
    </div>
  );
};
