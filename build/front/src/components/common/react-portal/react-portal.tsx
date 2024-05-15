import React, { ReactNode, useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { createPortalWrapper } from 'utils/helpers/create-portal-wrapper';

interface ReactPortalProps {
  children: ReactNode;
  wrapperId: string;
}

export const ReactPortal: React.FC<ReactPortalProps> = ({
  children,
  wrapperId = 'react-portal-wrapper',
}) => {
  const [wrapperEl, setWrapperEl] = useState<HTMLElement | null>(null);

  // check the element with "wrapperId". Create new one if not found
  useLayoutEffect(() => {
    let element = document.getElementById(wrapperId);
    let created = false;

    if (!element) {
      element = createPortalWrapper(wrapperId);
      created = true;
    }

    setWrapperEl(element);

    // cleanup
    return () => {
      if (created && element && element.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, [wrapperId]);

  // return element if we have one
  if (!wrapperEl) return null;
  else return createPortal(children, wrapperEl);
};
