import React from 'react';

//styles
import './rombic-button.style.scss';

interface RombicButtonProps {
  iconComponent: React.ReactNode;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

export const RombicButton: React.FC<RombicButtonProps> = ({
  iconComponent,
  href,
  onClick,
  className,
}) => {
  return !href ? (
    <button className={`rombBtn ${className}`} onClick={onClick}>
      {iconComponent}
    </button>
  ) : (
    <a className={`rombBtn ${className}`} href={href}>
      {iconComponent}
    </a>
  );
};
