import gsap from 'gsap';

import { activeSlideId } from '@/shared/utils/consts';

export const activeSlideAnimation = {
  open() {
    const wrapper = document.getElementById(activeSlideId);
    if (wrapper && wrapper.children?.[0] && wrapper.children[0].children?.[0]) {
      gsap.fromTo(wrapper.children[0], { width: 0 }, { width: wrapper.clientWidth, duration: 1 });
      return gsap.fromTo(
        wrapper.children[0].children[0],
        { rotate: -30, scale: 2.5, width: wrapper.clientWidth },
        { rotate: 0, scale: 1, duration: 1.4, width: wrapper.clientWidth }
      );
    }
    return Promise.resolve();
  },
  close() {
    const wrapper = document.getElementById(activeSlideId);
    if (wrapper && wrapper.children?.[0] && wrapper.children[0].children?.[0]) {
      gsap.fromTo(wrapper.children[0], { width: wrapper.clientWidth }, { width: 0, duration: 1 });
      return gsap.fromTo(
        wrapper.children[0].children[0],
        { rotate: 0, scale: 1, width: wrapper.clientWidth },
        { rotate: -30, scale: 2.5, duration: 1.4, width: wrapper.clientWidth }
      );
    }
    return Promise.resolve();
  },
};
