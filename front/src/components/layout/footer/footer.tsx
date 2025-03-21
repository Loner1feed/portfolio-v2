import { Container } from 'components/common/container/container';
import { Title } from 'components/common/title/title';
import { InfoRow } from 'components/ui/info-row/info-row';
import React, { useEffect, useState } from 'react';

//styles
import './footer.style.scss';
import { ContactsService } from 'services/contacts.service';
import { Contact } from 'utils/types/contacts.types';
import { toast } from 'components/common/toast';

export const Footer: React.FC = () => {
  const [data, setData] = useState<Contact[] | null>(null);

  useEffect(() => {
    ContactsService.getAll()
      .then(res => {
        setData(res.data);
      })
      .catch(e => {
        console.log(e.message);
        toast.error('Failed to load contacts');
      });
  }, []);

  return (
    <footer className="footer">
      <Container>
        <Title label="Contacts" />
        {data?.map((contact, i) => (
          <InfoRow label={contact.label} key={i}>
            {contact.href ? (
              <a href={contact.href}>{contact.body}</a>
            ) : (
              <span>{contact.body}</span>
            )}
          </InfoRow>
        ))}
      </Container>
    </footer>
  );
};
