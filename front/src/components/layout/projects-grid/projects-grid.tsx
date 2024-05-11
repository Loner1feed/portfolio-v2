import React, { useRef } from 'react';
import { ShortItem } from 'utils/types/item.types';
import { ItemCard } from '../../common/item-card/item-card';

//styles
import './projects-grid.style.scss';

export const ProjectsGrid: React.FC<{
  data: ShortItem[];
}> = ({ data }) => {
  const gridRef = useRef(null);

  const isEven = !(data.length % 2);

  return (
    <div
      className={
        isEven && !!data.length
          ? 'projectsGrid projectsGrid--padding'
          : 'projectsGrid'
      }
      ref={gridRef}
    >
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
