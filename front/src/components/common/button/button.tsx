import React from 'react';

// styles
import './button.style.scss';

interface ButtonProps {
  label?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'primary' | 'outlined';
  className?: string;
}

const defineClassNames = (type: ButtonProps['type']): string => {
  let classNames = 'btn ';
  switch (type) {
    case 'primary':
      classNames += 'btn--primary';
      break;

    case 'outlined':
      classNames += 'btn--outlined';
      break;
    default:
      break;
  }
  return classNames + ' ';
};

export const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  type = 'primary',
  className,
}) => {
  return (
    <button
      className={`${defineClassNames(type)} ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
