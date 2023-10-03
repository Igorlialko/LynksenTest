import React, { useMemo } from 'react';

import classNames from 'classnames';

import { useTypedSelector } from '@/shared/store/useTypedRedux';
import { descriptionSlideId, positionSlideId, titleSlideId } from '@/shared/utils/consts';

import sp from '../LineInfinity/LineInfinity.module.scss';
import s from './AboutContent.module.scss';

export const AboutContent = () => {
  const activeSlide = useTypedSelector((state) => state.catsReducer.activeSlide);

  return (
    <div className={s.about}>
      <div className={s.titleContainer}>
        <div className={classNames(s.title, 'h1')} id={titleSlideId}>
          {activeSlide?.name}
        </div>
      </div>
      <div className={classNames(s.description, 'h2')} id={descriptionSlideId} />
    </div>
  );
};

export const PositionSlide = () => {
  const breeds = useTypedSelector((state) => state.catsReducer.breeds);
  const activeSlide = useTypedSelector((state) => state.catsReducer.activeSlide);

  const position = useMemo(() => {
    if (!activeSlide) return 0;
    const index = breeds.findIndex((el) => el.id === activeSlide.id);
    if (index < 0) return 0;
    return index + 1;
  }, [activeSlide, breeds]);

  return (
    <div className={classNames(sp.text, sp.position)} id={positionSlideId}>
      {position}
    </div>
  );
};
