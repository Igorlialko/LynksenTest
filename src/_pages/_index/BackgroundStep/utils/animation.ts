import gsap from 'gsap';

import { backgroundStepId } from '@/shared/utils/consts';

export const backgroundStepAnimation = {
  start() {
    const background = document.getElementById(backgroundStepId);
    if (!background) return Promise.resolve();
    return gsap.fromTo(
      background,
      {
        y: '100%',
      },
      {
        y: 0,
        duration: 0.3,
      }
    );
  },
  finish() {
    const background = document.getElementById(backgroundStepId);
    if (!background) return Promise.resolve();
    return gsap.fromTo(
      background,
      {
        y: 0,
      },
      {
        y: '-100%',
        duration: 0.3,
      }
    );
  },
};
