import React, { useRef } from 'react';
import Marquee from 'react-fast-marquee';
//styles
import './profile-image.style.scss';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export const ProfileImage = () => {
  const profileImageRef = useRef<HTMLDivElement>(null);

  const onLoad = () => {
    if (profileImageRef.current) {
      profileImageRef.current.classList.add('loaded');
    }
  };

  return (
    <div className="profileImage" ref={profileImageRef}>
      <div className="profileImage__img">
        <LazyLoadImage
          src="https://res.cloudinary.com/dacid8lii/image/upload/v1714836717/cld-sample.jpg"
          effect="opacity"
          onLoad={onLoad}
        />
        6
      </div>
      <div className="profileImage__quote">
        <Marquee>Open for work! Open for work! </Marquee>
      </div>
    </div>
  );
};
