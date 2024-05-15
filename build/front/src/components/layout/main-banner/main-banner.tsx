import React from 'react';
import { Header } from '../header/header';
import { Container } from 'components/common/container/container';
import { SplitBg } from 'components/ui/split-bg/split-bg';
import { Title } from 'components/common/title/title';
import { ProfileImage } from 'components/ui/profile-image/profile-image';
// import { ItemCard } from 'components/common/item-card/item-card';

//style
import './main-banner.style.scss';
import { ScrollButton } from 'components/common/button/scroll-button';

export const MainBanner: React.FC = () => {
  return (
    <div
      className="mainBanner"
      style={{ position: 'relative', minHeight: '100vh' }}
    >
      <SplitBg />
      <Header />
      <Container>
        <div className="mainBanner__profile">
          <ProfileImage />

          <div className="mainBanner__content">
            <Title label="Hello" tag="h1" />
            <p>
              My name is <b>Yevhenii</b>, I'm a Front-end developer. Ready to
              make your project better and more interesting.
            </p>
            <div className="mainBanner__buttons">
              <ScrollButton label="Learn More" />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
