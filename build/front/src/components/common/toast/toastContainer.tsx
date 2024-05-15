import { useEffect, useRef, useState } from 'react';
import { ToastMessage, toast } from './toast';
import { ReactPortal } from '../react-portal/react-portal';

// styles
import './toastContainer.style.scss';
import { CloseIcon } from 'components/icons';
import { CSSTransition } from 'react-transition-group';

const ToastContainer = () => {
  const toastRef = useRef(null);

  const [toastOptions, setToastOptions] = useState<ToastMessage | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const show = (options: ToastMessage | null) => {
      setToastOptions(options);
      setOpen(true);
      setTimeout(() => {
        handleClose();
      }, 10000);
    };
    toast.registerCallback(show);

    return () => toast.registerCallback(null);
  }, []);

  const getStyleClass = (type: string | undefined) => {
    switch (type) {
      case 'error':
        return 'toast--error';
      case 'info':
        return 'toast--info';
      default:
        return '';
    }
  };

  const getToastHeading = (type: string | undefined) => {
    switch (type) {
      case 'error':
        return 'Error';
      case 'info':
        return 'Info';
      default:
        return '';
    }
  };

  const handleClose = () => setOpen(false);

  const classes = getStyleClass(toastOptions?.type);

  const heading = getToastHeading(toastOptions?.type);

  return (
    <ReactPortal wrapperId="portal-toast-container">
      <CSSTransition
        in={open}
        timeout={300}
        classNames="toast"
        nodeRef={toastRef}
        unmountOnExit
        onExited={() => setToastOptions(null)}
      >
        <div className={`toast ${classes}`} role="alert" ref={toastRef}>
          <span className="toast__heading">{heading}</span>
          <span className="toast__message">{toastOptions?.message}</span>
          <button
            type="button"
            className="toast__close"
            aria-label="Close"
            onClick={handleClose}
          >
            <CloseIcon />
          </button>
        </div>
      </CSSTransition>
    </ReactPortal>
  );
};

export default ToastContainer;
