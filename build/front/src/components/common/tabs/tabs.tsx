import React from 'react';
import { Button } from '../button/button';

//styles
import './tabs.style.scss';

export interface SingleTab {
  label: string;
  value: string | number | boolean;
}

interface TabsProps {
  data: SingleTab[];
  onChange: (tab: SingleTab) => void;
  activeValue: string | number | boolean;
  disabled?: boolean;
}

export const Tabs: React.FC<TabsProps> = ({
  data,
  onChange,
  activeValue,
  disabled,
}) => {
  return (
    <div className={disabled ? 'tabs tabs--disabled' : 'tabs'}>
      {data &&
        data.map(tab => (
          <Button
            label={tab.label}
            onClick={() => onChange(tab)}
            key={tab.label}
            className={
              activeValue === tab.value
                ? 'tabs__tab tabs__tab--active'
                : 'tabs__tab'
            }
            size="small"
          />
        ))}
    </div>
  );
};
