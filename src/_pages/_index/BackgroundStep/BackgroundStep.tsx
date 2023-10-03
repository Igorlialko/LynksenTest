import React from 'react';

import { backgroundStepId } from '@/shared/utils/consts';

import s from './BackgroundStep.module.scss';

export const BackgroundStep = () => {
  return <div className={s.backgroundStep} id={backgroundStepId} />;
};
