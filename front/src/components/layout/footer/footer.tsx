import { Container } from 'components/common/container/container';
import { Title } from 'components/common/title/title';
import { InfoRow } from 'components/ui/info-row/info-row';
import React from 'react';

//styles
import './footer.style.scss';

// TODO: remove hardcode and display items dynamically from server

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <Container>
        <Title label="Contacts" />
        <InfoRow label="E-Mail">
          <a href="mailto:lfeedwork05@gmail.com">lfeedwork05@gmail.com</a>
        </InfoRow>
        <InfoRow label="Phone">
          <a href="#">+31630772800</a>
        </InfoRow>
      </Container>
    </footer>
  );
};
