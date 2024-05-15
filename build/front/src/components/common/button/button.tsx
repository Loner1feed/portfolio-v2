import React from 'react';

// styles
import './button.style.scss';

export interface ButtonProps {
  label?: string;
  onClick?: React.MouseEventHandler;
  type?: 'primary' | 'outlined';
  size?: 'small' | 'normal';
  className?: string;
  icon?: React.ReactNode;
  href?: string;
}

const defineClassNames = (
  type: ButtonProps['type'],
  size: ButtonProps['size'],
): string => {
  let classNames = 'btn ';
  switch (type) {
    case 'primary':
      classNames += 'btn--primary ';
      break;

    case 'outlined':
      classNames += 'btn--outlined ';
      break;
    default:
      break;
  }

  switch (size) {
    case 'normal':
      classNames += 'btn--normal ';
      break;
    case 'small':
      classNames += 'btn--small ';
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
  size = 'normal',
  className,
  icon,
  href,
}) => {
  return !href ? (
    <button
      className={`${defineClassNames(type, size)} ${className}`}
      onClick={onClick}
    >
      {label}
      {icon}
    </button>
  ) : (
    <a
      className={`${defineClassNames(type, size)} ${className}`}
      href={href}
      onClick={onClick}
      target="_blank"
    >
      {label}
      {icon}
    </a>
  );
};
