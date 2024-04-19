import React from 'react';
import { MainPage } from 'components/pages/main-page';
import { TestImageUpload } from 'components/common/test-image-upoload/test-image-upload';

const App: React.FC = () => {
  return (
    <div>
      <MainPage />
      <TestImageUpload />
    </div>
  );
};

export default App;
