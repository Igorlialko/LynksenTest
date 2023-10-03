import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';

import { CatImage } from '@/entities/CatImage';

import { setBreeds, setImages } from '@/shared/store/reducers/catsReducer';
import {
  setIsLoadingPercentage,
  setIsShowContentPercentage,
} from '@/shared/store/reducers/commonReducer';
import { CatsBreed } from '@/shared/store/reducers/types';
import { useTypedDispatch, useTypedSelector } from '@/shared/store/useTypedRedux';
import { breadsListId } from '@/shared/utils/consts';

import s from './BreedsList.module.scss';

export const BreedsList = ({
  addActiveSlide,
}: {
  addActiveSlide: (activeSlide: CatsBreed) => void;
}) => {
  const dispatch = useTypedDispatch();
  const breeds = useTypedSelector((state) => state.catsReducer.breeds);

  useEffect(() => {
    if (!breeds.length) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/breeds`)
        .then((_) => _.json())
        .then((res) => {
          dispatch(setBreeds(res));
        });
    }
  }, []);

  const breedsArrays = useMemo(() => {
    return breeds.reduce(
      (acc, breed, index) => {
        if (index % 2 === 0) {
          acc[0].push(breed);
        } else {
          acc[1].push(breed);
        }
        return acc;
      },
      [[], []] as CatsBreed[][]
    );
  }, [breeds]);

  // Update Percentage loader after load breeds and images for 10 breeds

  const [countLoadedImages, setCountLoadedImages] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (breeds.length && countLoadedImages > 10 && !isLoaded) {
      setIsLoaded(true);
      dispatch(setIsLoadingPercentage(false));
      setTimeout(() => {
        dispatch(setIsShowContentPercentage(true));
      }, 1200);
    }
  }, [countLoadedImages, breeds]);

  return (
    <div id={breadsListId} className={s.breeds}>
      <div className={s.breedColLeft}>
        {breedsArrays[0].map((breed) => (
          <BreedSlide
            key={breed.id}
            breed={breed}
            setActiveSlide={addActiveSlide}
            setCountLoadedImages={setCountLoadedImages}
          />
        ))}
      </div>
      <div className={s.breedColRight}>
        {breedsArrays[1].map((breed) => (
          <BreedSlide
            key={breed.id}
            breed={breed}
            setActiveSlide={addActiveSlide}
            setCountLoadedImages={setCountLoadedImages}
          />
        ))}
      </div>
    </div>
  );
};

const BreedSlide = ({
  breed,
  setActiveSlide,
  setCountLoadedImages,
}: {
  breed: CatsBreed;
  setActiveSlide: (activeSlide: CatsBreed) => void;
  setCountLoadedImages: Dispatch<SetStateAction<number>>;
}) => {
  const allImages = useTypedSelector((state) => state.catsReducer.images);
  const images = allImages[breed.id] || [];
  const dispatch = useTypedDispatch();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/images/search?breed_ids=${breed.id}&limit=20`)
      .then((_) => _.json())
      .then((res) => {
        dispatch(setImages({ [breed.id]: res }));
        Promise.resolve().then(() => {
          setIsLoaded(true);
          setCountLoadedImages((prev) => prev + 1);
        });
      });
  }, []);

  return (
    <div
      className={s.breed}
      onClick={() => {
        setActiveSlide(breed);
      }}
    >
      {isLoaded ? (
        <CatImage alt={breed.name} url={images[0]?.url} />
      ) : (
        <div className={s.placeholder}>loading...</div>
      )}
    </div>
  );
};
