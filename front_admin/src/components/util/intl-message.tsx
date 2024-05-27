import React from "react";
import { FormattedMessage, injectIntl } from "react-intl";

// @ts-ignore
const IntlMessage = (props) => <FormattedMessage {...props} />;
export default injectIntl(IntlMessage, {
  // @ts-ignore
  withRef: false,
});
