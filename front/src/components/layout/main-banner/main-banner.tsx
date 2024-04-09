import React from 'react';
import { Header } from '../header/header';
import { Container } from 'components/common/container/container';

export const MainBanner: React.FC = () => {
  return (
    <div style={{ background: '#ccc' }}>
      <Header />
      <Container>
        <h1>content</h1>
      </Container>
    </div>
  );
};
