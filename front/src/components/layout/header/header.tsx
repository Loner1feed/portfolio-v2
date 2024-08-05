import React from 'react';
import { Container } from 'components/common/container/container';
import { Logo } from 'components/common/logo/logo';

// style
import './header.style.scss';

import { Socials } from 'components/common/socials/socials';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <Container noPadding>
        <div className="header__inner">
          <Logo />
          <Socials />
        </div>
      </Container>
    </header>
  );
};
