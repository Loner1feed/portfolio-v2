import React, { ElementType, HTMLAttributes } from 'react';

// style
import './title.style.scss';

interface TitleProps extends HTMLAttributes<HTMLOrSVGElement> {
  tag?: ElementType;
  label?: string;
  className?: string;
}

export const Title: React.FC<TitleProps> = ({
  tag: Tag = 'h2',
  label,
  className,
}) => {
  return <Tag className={className}>{label}</Tag>;
};
