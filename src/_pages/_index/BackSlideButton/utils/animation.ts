import gsap from 'gsap';

import { backSlideButtonId } from '@/shared/utils/consts';

export const backSlideButtonAnimation = {
  show() {
    const button = document.getElementById(backSlideButtonId);
    if (!button) return;
    gsap.fromTo(
      button,
      {
        opacity: 0,
        y: -20,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
      }
    );
  },
};
