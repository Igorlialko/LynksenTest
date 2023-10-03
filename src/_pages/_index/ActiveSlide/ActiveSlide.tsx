import React, { useEffect, useState } from 'react';

import { activeSlideAnimation } from '@/_pages/_index/ActiveSlide/utils/animation';
import { ReloadSlideButton } from '@/_pages/_index/ReloadSlideButton/ReloadSlideButton';

import { CatImage } from '@/entities/CatImage';

import { CatsBreed } from '@/shared/store/reducers/types';
import { useTypedSelector } from '@/shared/store/useTypedRedux';
import { activeSlideId } from '@/shared/utils/consts';

import s from './ActiveSlide.module.scss';

export const ActiveSlide = ({ breed }: { breed: CatsBreed }) => {
  const allImages = useTypedSelector((state) => state.catsReducer.images);
  const images = allImages[breed.id] || [];

  useEffect(() => {
    activeSlideAnimation.open();
  }, []);

  const [activeImage, setActiveImage] = useState(0);
  const [activeImageLoading, setActiveImageLoading] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  return (
    <>
      {images.length > 1 && (
        <ReloadSlideButton
          disable={activeImageLoading || isClicked}
          onClick={() => {
            setIsClicked(true);
            activeSlideAnimation.close().then(() => {
              if (activeImage + 1 >= images.length) {
                setActiveImage(0);
                setActiveImageLoading(true);
                setIsClicked(false);
                return;
              }
              setActiveImage(activeImage + 1);
              setActiveImageLoading(true);
              setIsClicked(false);
            });
          }}
        />
      )}
      <div className={s.activeSlide} id={activeSlideId}>
        <div className={s.animateActiveSlide}>
          <div className={s.images}>
            <CatImage
              alt={breed.name}
              url={images[activeImage]?.url}
              onLoad={() => {
                if (activeImageLoading) {
                  activeSlideAnimation.open().then(() => {
                    setActiveImageLoading(false);
                  });
                }
              }}
              onError={() => {
                if (activeImageLoading) {
                  activeSlideAnimation.open().then(() => {
                    setActiveImageLoading(false);
                  });
                }
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};
