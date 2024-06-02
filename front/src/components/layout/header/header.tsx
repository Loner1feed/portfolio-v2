import React from 'react';
import { Container } from 'components/common/container/container';
import { Logo } from 'components/common/logo/logo';
import { RombicButton } from 'components/common/rombic-button/rombic-button';

// style
import './header.style.scss';

// icons
import { GithubIcon, LinkedinIcon, TelegramIcon } from 'components/icons';

//TODO: remove this stupid ass hardcode and make social buttons filled dynamically from server

export const Header: React.FC = () => {
  return (
    <header className="header">
      <Container noPadding>
        <div className="header__inner">
          <Logo />
          <div className="header__socials">
            <RombicButton
              iconComponent={<TelegramIcon />}
              href="https://t.me/fam_fam_fam_fam"
            />
            <RombicButton
              iconComponent={<LinkedinIcon />}
              href="https://www.linkedin.com/in/yevhenii-huriev-309035212/"
            />
            <RombicButton
              iconComponent={<GithubIcon />}
              href="https://github.com/Loner1feed"
            />
          </div>
        </div>
      </Container>
    </header>
  );
};
