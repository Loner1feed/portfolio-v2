import { Spinner } from 'components/ui/spinner/spinner';
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export const ModalAnimatedImage: React.FC<{ imageUrl: string }> = ({
  imageUrl,
}) => {
  return (
    <div className="modal__image">
      {/* <img src={imageUrl} /> */}
      <LazyLoadImage src={imageUrl} effect="opacity" />
      <Spinner />
    </div>
  );
};
