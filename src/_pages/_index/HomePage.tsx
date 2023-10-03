import { useState } from 'react';

import classNames from 'classnames';

import { setActiveSlide } from '@/shared/store/reducers/catsReducer';
import { CatsBreed } from '@/shared/store/reducers/types';
import { useTypedDispatch, useTypedSelector } from '@/shared/store/useTypedRedux';
import { descriptionSlideId } from '@/shared/utils/consts';

import { AboutContent, PositionSlide } from './AboutContent/AboutContent';
import { aboutContentAnimation, createSplitLines } from './AboutContent/utils/animation';
import { ActiveSlide } from './ActiveSlide/ActiveSlide';
import { BackSlideButton } from './BackSlideButton/BackSlideButton';
import { backSlideButtonAnimation } from './BackSlideButton/utils/animation';
import { BackStep } from './BackStep/BackStep';
import { BackgroundStep } from './BackgroundStep/BackgroundStep';
import { backgroundStepAnimation } from './BackgroundStep/utils/animation';
import { BreedsList } from './BreedsList/BreedsList';
import { breadListAnimation } from './BreedsList/utils/animation';
import { LineInfinity } from './LineInfinity/LineInfinity';
import { lineInfinityAnimation } from './LineInfinity/utils/animation';
import s from './homePage.module.scss';

export const HomePage = () => {
  const activeSlide = useTypedSelector((state) => state.catsReducer.activeSlide);
  const dispatch = useTypedDispatch();
  const [backStep, setBackStep] = useState<CatsBreed | null>(null);

  const handle = {
    addActiveSlide(activeSlide: CatsBreed) {
      dispatch(setActiveSlide(activeSlide));
      lineInfinityAnimation.unShow().then(() => {
        backSlideButtonAnimation.show();
        const descriptionSlide = document.getElementById(descriptionSlideId);
        createSplitLines(descriptionSlide, activeSlide.description).then(() => {
          aboutContentAnimation.start();
        });
      });
      breadListAnimation.unShow();
    },
    startCloseStep() {
      backgroundStepAnimation.start().then(() => {
        setBackStep(activeSlide);
        dispatch(setActiveSlide(null));
      });
    },
    finishCloseStep() {
      setBackStep(null);
      lineInfinityAnimation.restart();
      lineInfinityAnimation.show()?.then(() => {
        breadListAnimation.show();
      });
    },
  };
  const isShowContentPercentage = useTypedSelector(
    (state) => state.commonReducer.isShowContentPercentage
  );

  return (
    <main
      className={classNames(s.main, {
        [s.mainLoading]: !isShowContentPercentage,
      })}
    >
      <BackgroundStep />
      <LineInfinity>{activeSlide && <PositionSlide />}</LineInfinity>
      <BreedsList addActiveSlide={handle.addActiveSlide} />
      {backStep && <BackStep breed={backStep} onClose={handle.finishCloseStep} />}
      {activeSlide && (
        <>
          <BackSlideButton onClick={handle.startCloseStep} />
          <ActiveSlide breed={activeSlide} />
          <AboutContent />
        </>
      )}
    </main>
  );
};
