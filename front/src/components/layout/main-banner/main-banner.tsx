import React from 'react';
import { Header } from '../header/header';
import { Container } from 'components/common/container/container';
// import { ItemCard } from 'components/common/item-card/item-card';
import { Projects } from '../../common/projects/projects';

export const MainBanner: React.FC = () => {
  return (
    <div>
      <Header />
      <Container>
        <Projects />
      </Container>
    </div>
  );
};
