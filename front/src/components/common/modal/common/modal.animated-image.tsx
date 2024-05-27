import { Spinner } from 'components/ui/spinner/spinner';
import React, { useRef } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { getModalImageRatio } from 'utils/helpers/getModalImageRatio';

export const ModalAnimatedImage: React.FC<{ imageUrl: string }> = ({
  imageUrl,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const checkImageHeight: React.ReactEventHandler<HTMLImageElement> = e => {
    if (ref.current) {
      const { clientHeightRatio, imageHeightRatio } = getModalImageRatio(
        ref.current,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        e.target,
      );
      if (clientHeightRatio > imageHeightRatio) {
        ref.current.classList.add('modal__image--height');
      } else {
        ref.current.classList.add('modal__image--width');
      }
    }
  };

  return (
    <div className="modal__image" ref={ref}>
      {/* <img src={imageUrl} /> */}
      <LazyLoadImage
        src={imageUrl}
        effect="opacity"
        onLoad={checkImageHeight}
      />
      <Spinner />
    </div>
  );
};
