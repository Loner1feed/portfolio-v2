import { Projects } from 'components/common/projects/projects';
import { Footer } from 'components/layout/footer/footer';
import { MainBanner } from 'components/layout/main-banner/main-banner';
import React from 'react';

export const MainPage: React.FC = () => {
  return (
    <>
      <MainBanner />
      <Projects />
      <Footer />
    </>
  );
};
