import IntlMessage from "../util/intl-message";

interface PageHeaderProps {
  title?: string;
  display?: boolean;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, display }) => {
  return display ? (
    <div className="app-page-header">
      <h3 className="mb-0 mr-3 font-weight-semibold">
        <IntlMessage id={title ? title : "home"} />
      </h3>
    </div>
  ) : null;
};
