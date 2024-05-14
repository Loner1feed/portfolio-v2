import React from 'react';

// styles
import './container.style.scss';

interface ContainerProps {
  children?: React.ReactNode;
  noPadding?: boolean;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  noPadding,
}) => {
  return (
    <div className={noPadding ? 'container container--noPadding' : 'container'}>
      {children}
    </div>
  );
};
