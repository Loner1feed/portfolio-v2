import React, { useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { ReactPortal } from '../react-portal/react-portal';
import { Item } from 'utils/types/item.types';
import { ModalAnimatedImage } from './common/modal.animated-image';
import { ModalInfoBlock } from './common/modal.info-block';
import { ModalPaneGrid } from './common/modal.panes';
import { Button } from '../button/button';
import { RombicButton } from '../rombic-button/rombic-button';
import { CloseIcon, OpenIcon } from 'components/icons';

//styles
import './modal.style.scss';
import { CustomScroll } from 'react-custom-scroll';

interface ModalProps {
  open: boolean;
  handleClose: (e: React.MouseEvent | KeyboardEvent) => void;
  data: Item | null;
}

export const Modal: React.FC<ModalProps> = ({ open, handleClose, data }) => {
  const backdropRef = useRef(null);
  const modalRef = useRef(null);

  // close modal with escape key
  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) =>
      e.key === 'Escape' ? handleClose(e) : null;
    document.body.addEventListener('keydown', closeOnEscapeKey);
    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKey);
    };
  }, [handleClose]);

  return (
    <ReactPortal wrapperId="portal-modal-wrapper">
      <CSSTransition
        in={open}
        nodeRef={backdropRef}
        timeout={300}
        classNames="modal__backdrop"
        unmountOnExit
      >
        <div
          className="modal__backdrop"
          ref={backdropRef}
          onClick={handleClose}
        >
          <div
            className="modal"
            ref={modalRef}
            onClick={e => e.stopPropagation()}
          >
            <RombicButton
              iconComponent={<CloseIcon />}
              onClick={handleClose}
              className="modal__close"
            />
            {data?.imageUrl ? (
              <ModalAnimatedImage imageUrl={data?.imageUrl} />
            ) : (
              <div className="modal__image modal__image--placeholder" />
            )}
            <div className="modal__content">
              <h2>{data?.title}</h2>
              <ModalInfoBlock heading="stack">
                <ModalPaneGrid labels={data?.stack} />
              </ModalInfoBlock>
              <ModalInfoBlock heading="description">
                <CustomScroll>
                  <p>{data?.description}</p>
                </CustomScroll>
              </ModalInfoBlock>

              <div className="modal__buttons">
                {!!data?.websiteUrl && (
                  <Button
                    label="open"
                    icon={<OpenIcon />}
                    href={data?.websiteUrl}
                  />
                )}
                {!!data?.repoUrl && (
                  <Button label="view repository" href={data?.repoUrl} />
                )}
              </div>
            </div>
          </div>
        </div>
      </CSSTransition>
    </ReactPortal>
  );
};
