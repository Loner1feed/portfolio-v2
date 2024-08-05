import React, { useRef, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { useModal } from 'utils/hooks/use-modal';
import { Spinner } from 'components/ui/spinner/spinner';
import { ItemsService } from 'services/items.service';
import { Item } from 'utils/types/item.types';
import { toast } from '../toast';
import placeholderImage from '../../../assets/images/placeholder-square.jpg';

// styles
import './item-card.style.scss';

interface ItemCardProps {
  title: string;
  imageUrl: string;
  id: string;
}

export const ItemCard: React.FC<ItemCardProps> = ({ title, imageUrl, id }) => {
  const itemRef = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState(false);

  // custom hooks
  const { setIsModalOpen, setModalData } = useModal();

  // get full item data and trigger modal
  const clickHandler = () => {
    setLoading(true);
    ItemsService.getItem(id)
      .then(res => {
        const data = res.data as Item;
        if (data) {
          setModalData(data);
          setIsModalOpen(true);
        }
      })
      .catch(e => {
        console.log(e);
        toast.error('some error lalalalalal');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const modifyImageUrl = (url: string) => {
    const split = url.split('/');
    const index = 7;

    return [
      ...split.slice(0, index - 1),
      'ar_1:1,c_crop',
      ...split.slice(index),
    ].join('/');
  };

  // fade-in component on image load
  const onLoad = () => {
    if (!itemRef.current) return;
    itemRef.current.className = 'itemCard itemCard__loaded';
  };

  return (
    <div className="itemCard" onClick={clickHandler} ref={itemRef}>
      <div className="itemCard__backdrop" />
      <div className="itemCard__content">
        <div
          className={
            loading ? 'itemCard__img itemCard__img--loading' : 'itemCard__img'
          }
        >
          <LazyLoadImage
            alt={title}
            src={imageUrl ? modifyImageUrl(imageUrl) : placeholderImage}
            onLoad={onLoad}
          />
          <Spinner />
        </div>
        <span>{title}</span>
      </div>
    </div>
  );
};
