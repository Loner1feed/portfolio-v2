import React from 'react';
import { Container } from 'components/common/container/container';
import { Logo } from 'components/common/logo/logo';
import { RombicButton } from 'components/common/rombic-button/rombic-button';

// style
import './header.style.scss';

// icons
import { GithubIcon, LinkedinIcon, TelegramIcon } from 'components/icons';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <Container noPadding>
        <div className="header__inner">
          <Logo />
          <div className="header__socials">
            <RombicButton iconComponent={<TelegramIcon />} />
            <RombicButton iconComponent={<LinkedinIcon />} />
            <RombicButton iconComponent={<GithubIcon />} />
          </div>
        </div>
      </Container>
    </header>
  );
};
