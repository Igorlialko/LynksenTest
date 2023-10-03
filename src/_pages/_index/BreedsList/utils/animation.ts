import gsap from 'gsap';

import { breadsListId } from '@/shared/utils/consts';

export const breadListAnimation = {
  show() {
    const breedsWrapper = document.getElementById(breadsListId);
    if (breedsWrapper && breedsWrapper.children?.[0]) {
      gsap.set(breedsWrapper.children[0], { x: 0 });
      gsap.set(breedsWrapper.children[1], { x: 0 });
      gsap.fromTo(
        breedsWrapper,
        { y: breedsWrapper.offsetHeight, x: '50%' },
        { y: 0, x: '-25%', duration: 1.2 }
      );
    }
  },
  unShow() {
    const breedsWrapper = document.getElementById(breadsListId);
    if (breedsWrapper && breedsWrapper.children?.[0]) {
      gsap.fromTo(
        breedsWrapper.children[0],
        { x: 0 },
        { x: -breedsWrapper.clientWidth / 2, duration: 1.2 }
      );
      gsap.fromTo(
        breedsWrapper.children[1],
        { x: 0 },
        { x: breedsWrapper.clientWidth / 2, duration: 1.2 }
      );
    }
  },
};
