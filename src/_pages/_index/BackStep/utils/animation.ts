import gsap from 'gsap';

import { backStepId } from '@/shared/utils/consts';

export const backStepAnimation = {
  start() {
    const images = document.getElementById(backStepId);
    if (!images) return;
    gsap.set(images, { opacity: 1 });
    return gsap.fromTo(
      //@ts-ignore
      [...images.children].reverse(),
      {
        x: -images.clientWidth,
        rotate: -15,
        // scale: 2.5,
      },
      {
        // scale: 1,
        x: 0,
        duration: 1,
        stagger: 0.05,
        rotate: 0,
      }
    );
  },
  finish() {
    const images = document.getElementById(backStepId);
    if (!images) return;
    return gsap.fromTo(
      // @ts-ignore
      [...images.children].reverse(),
      {
        x: 0,
        rotate: 0,
      },
      {
        x: images.clientWidth,
        duration: 1,
        stagger: 0.05,
        rotate: 15,
      }
    );
  },
};
