import React from 'react';

interface ModalInfoBlockProps {
  heading: string;
  children: React.ReactNode;
}

export const ModalInfoBlock: React.FC<ModalInfoBlockProps> = ({
  heading,
  children,
}) => {
  return (
    <div className="modal__block">
      <h3 className="modal__heading">{heading}:</h3>
      {children}
    </div>
  );
};
