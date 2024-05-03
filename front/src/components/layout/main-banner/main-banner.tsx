import React from 'react';
import { Header } from '../header/header';
import { Container } from 'components/common/container/container';
import { ItemCard } from 'components/common/item-card/item-card';

export const MainBanner: React.FC = () => {
  return (
    <div>
      <Header />
      <Container>
        <h1>content</h1>
        <ItemCard
          title="title"
          imageUrl="https://res.cloudinary.com/dacid8lii/image/upload/v1713534201/xwpgnwmkq3vmx1pm8kjl.jpg"
          id="66226aec71e79f9f420d2c47"
        />

        <h1>content</h1>
      </Container>
    </div>
  );
};
