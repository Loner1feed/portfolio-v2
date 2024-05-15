import React from 'react';

//styles
import './info-row.style.scss';

interface InfoRowProps {
  label: string;
  children: React.ReactNode;
}

export const InfoRow: React.FC<InfoRowProps> = ({ label, children }) => {
  return (
    <div className="infoRow">
      <span className="infoRow__heading">{label}</span>
      <div className="infoRow__content">{children}</div>
    </div>
  );
};
