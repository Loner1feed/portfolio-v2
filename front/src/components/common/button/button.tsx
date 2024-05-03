import React from 'react';

// styles
import './button.style.scss';

interface ButtonProps {
  label?: string;
  onClick?: React.MouseEventHandler;
  type?: 'primary' | 'outlined';
  className?: string;
  icon?: React.ReactNode;
  href?: string;
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
  icon,
  href,
}) => {
  return !href ? (
    <button
      className={`${defineClassNames(type)} ${className}`}
      onClick={onClick}
    >
      {label}
      {icon}
    </button>
  ) : (
    <a
      className={`${defineClassNames(type)} ${className}`}
      href={href}
      onClick={onClick}
      target="_blank"
    >
      {label}
      {icon}
    </a>
  );
};
