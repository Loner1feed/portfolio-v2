import React from "react";

interface IconProps {
  type: React.FunctionComponent<any>;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ type, className }) => {
  return <>{React.createElement(type, { className: className })}</>;
};

export default Icon;
