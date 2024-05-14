import React from 'react';
import { ShortItem } from 'utils/types/item.types';
import { ItemCard } from '../../common/item-card/item-card';

//styles
import './projects-grid.style.scss';

export const ProjectsGrid: React.FC<{
  data: ShortItem[];
}> = ({ data }) => {
  const isEven = !(data.length % 2);

  const defineClasses = () => {
    let className = 'projectsGrid ';

    if (isEven && !!data.length) className += 'projectsGrid--padding ';

    return className;
  };

  return (
    <div className={defineClasses()}>
      {data &&
        data.map(el => (
          <ItemCard
            id={el.id}
            imageUrl={el.imageUrl}
            title={el.title}
            key={el.id}
          />
        ))}
    </div>
  );
};
