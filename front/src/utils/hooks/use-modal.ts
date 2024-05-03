import { ModalContext } from 'context/modal.context';
import { useContext } from 'react';

export const useModal = () => {
  const modalContext = useContext(ModalContext);

  if (!modalContext)
    throw new Error('useModal must be used under ModalContextProvider');

  return modalContext;
};
