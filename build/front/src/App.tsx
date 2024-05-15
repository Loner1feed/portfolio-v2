import React from 'react';
import { MainPage } from 'components/pages/main-page';
import { ModalContextProvider } from 'context/modal.context';
import ToastContainer from 'components/common/toast';

const App: React.FC = () => {
  return (
    <ModalContextProvider>
      <MainPage />
      <ToastContainer />
    </ModalContextProvider>
  );
};

export default App;
