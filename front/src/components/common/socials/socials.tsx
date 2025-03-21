import React, { ReactNode, useEffect, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { SocialItem } from 'utils/types/socials.types';
import { SocialsService } from 'services/socials.service';
import { RombicButton } from '../rombic-button/rombic-button';
import { toast } from '../toast';
import { useReadyState } from 'utils/hooks/use-ready-state';
import * as icons from '../../icons';
import './socials.style.scss';

export const Socials: React.FC = () => {
  const [data, setData] = useState<SocialItem[] | null>(null);

  // custom hooks
  const ready = useReadyState();

  // define icons for the rombic buttons
  const defineIconComponent = (iconName: string): ReactNode => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const iconComponent = iconName ? icons[iconName] : icons.TelegramIcon;
    return iconComponent();
  };

  // fetch socials data
  useEffect(() => {
    SocialsService.getAll()
      .then(res => {
        setData(res.data);
        document.documentElement.style.setProperty(
          '--socialsCount',
          res.data.length || 1,
        );
      })
      .catch(e => {
        console.log(e.message);
        toast.error('Failed to load socials');
      });
  }, []);

  return (
    <div className="socials">
      <TransitionGroup>
        {ready &&
          data?.map((el, i) => {
            const delay = Math.max(0, i * 100);
            return (
              <CSSTransition
                key={i}
                classNames={'socials'}
                timeout={500 + delay}
              >
                <div style={{ transitionDelay: `${delay}ms` }}>
                  <RombicButton
                    iconComponent={defineIconComponent(el.iconName)}
                    href={el.href}
                  />
                </div>
              </CSSTransition>
            );
          })}
      </TransitionGroup>
    </div>
  );
};
