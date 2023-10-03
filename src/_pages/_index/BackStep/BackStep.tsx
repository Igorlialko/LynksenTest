import React, { useEffect, useState } from 'react';

import { backStepAnimation } from '@/_pages/_index/BackStep/utils/animation';
import { backgroundStepAnimation } from '@/_pages/_index/BackgroundStep/utils/animation';

import { CatImage } from '@/entities/CatImage';

import { CatsBreed } from '@/shared/store/reducers/types';
import { useTypedSelector } from '@/shared/store/useTypedRedux';
import { backStepId } from '@/shared/utils/consts';

import s from './BackStep.module.scss';

export const BackStep = ({ breed, onClose }: { breed: CatsBreed; onClose: () => void }) => {
  const allImages = useTypedSelector((state) => state.catsReducer.images);
  const images = allImages[breed.id] || [];

  const [isLoaded, setIsLoaded] = useState<{ [a: string]: boolean }>({});

  useEffect(() => {
    if (images.length) {
      if (images.slice(0, 5).reduce((acc, image) => acc && isLoaded[image.id], true)) {
        backgroundStepAnimation.finish().then(() => {
          backStepAnimation.start()?.then(() => {
            setTimeout(() => {
              backStepAnimation.finish()?.then(() => {
                onClose();
              });
            }, 1500);
          });
        });
      }
    } else {
      backgroundStepAnimation.finish().then(() => {
        onClose();
      });
    }
  }, [isLoaded]);

  return (
    <div className={s.backStep}>
      {images.length ? (
        <div className={s.images} id={backStepId}>
          {images.slice(0, 5).map((image) => (
            <CatImage
              key={image.id}
              alt={breed.name}
              url={image.url}
              onLoad={() => {
                setIsLoaded((prevState) => ({
                  ...prevState,
                  [image.id]: true,
                }));
              }}
              onError={() => {
                setIsLoaded((prevState) => ({
                  ...prevState,
                  [image.id]: true,
                }));
              }}
            />
          ))}
        </div>
      ) : (
        <div className={s.images} id={backStepId}>
          <CatImage
            alt={breed.name}
            onLoad={() => {
              setIsLoaded((prevState) => ({
                ...prevState,
                errorCat: true,
              }));
            }}
            onError={() => {
              setIsLoaded((prevState) => ({
                ...prevState,
                errorCat: true,
              }));
            }}
          />
        </div>
      )}
    </div>
  );
};
