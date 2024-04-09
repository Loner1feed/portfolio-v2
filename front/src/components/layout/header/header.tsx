import React from 'react';
import { Container } from 'components/common/container/container';
import { Logo } from 'components/common/logo/logo';
import { RombicButton } from 'components/common/rombic-button/rombic-button';

// style
import './header.style.scss';

// icons
import telegramIcon from 'assets/icons/telegram-icon.svg';
import linkedinIcon from 'assets/icons/linkedin-icon.svg';
import githubIcon from 'assets/icons/github-icon.svg';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <Container>
        <div className="header__inner">
          <Logo />
          <div className="header__socials">
            <RombicButton iconComponent={<img src={telegramIcon} />} />
            <RombicButton iconComponent={<img src={linkedinIcon} />} />
            <RombicButton iconComponent={<img src={githubIcon} />} />
          </div>
        </div>
      </Container>
    </header>
  );
};
