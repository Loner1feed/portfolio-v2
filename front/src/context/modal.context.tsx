import React, { useState } from 'react';
import { Modal } from '../components/common/modal/modal';
import { Item } from 'utils/types/item.types';

// types
interface ModalContextProviderProps {
  children: React.ReactNode;
}

interface ModalContextValue {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setModalData: React.Dispatch<React.SetStateAction<Item | null>>;
}

// context
export const ModalContext = React.createContext<ModalContextValue | null>(null);

// provider
export const ModalContextProvider: React.FC<ModalContextProviderProps> = ({
  children,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<Item | null>(null);

  const providerValue = { setIsModalOpen, setModalData };

  return (
    <ModalContext.Provider value={providerValue}>
      <Modal
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        data={modalData}
      />
      {children}
    </ModalContext.Provider>
  );
};
