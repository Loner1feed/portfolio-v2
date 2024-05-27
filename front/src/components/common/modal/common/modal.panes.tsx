export const ModalPaneGrid: React.FC<{ labels?: string[] }> = ({ labels }) => {
  return (
    <div className="modal__paneGrid">
      {labels &&
        labels.map(label => <ModalPane key={label}>{label}</ModalPane>)}
    </div>
  );
};

export const ModalPane: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <span className="modal__pane">{children}</span>;
};
