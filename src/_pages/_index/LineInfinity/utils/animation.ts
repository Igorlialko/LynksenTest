import gsap from 'gsap';

import s from '@/_pages/_index/LineInfinity/LineInfinity.module.scss';

import { lineInfinityId } from '@/shared/utils/consts';
import { horizontalLoop } from '@/shared/utils/horizontalLoop';

let timelineInfinity: null | gsap.core.Timeline = null;

export const lineInfinityAnimation = {
  init() {
    const line = document.getElementById(lineInfinityId);
    if (!line) return;
    const links = line.querySelectorAll(`.${s.text}`);

    timelineInfinity = horizontalLoop(links, {
      repeat: -1,
      speed: 2,
    });
  },
  restart() {
    if (timelineInfinity) {
      timelineInfinity.restart();
    } else {
      const line = document.getElementById(lineInfinityId);
      if (!line) return;
      const links = line.querySelectorAll(`.${s.text}`);
      timelineInfinity = horizontalLoop(links, {
        repeat: -1,
        speed: 2,
      });
    }
    return timelineInfinity;
  },
  updateTimeScale(timeScale: number) {
    return () => {
      if (!timelineInfinity) return;
      gsap.to(timelineInfinity, { timeScale, overwrite: true });
    };
  },
  unShow() {
    if (timelineInfinity) {
      timelineInfinity.pause();
      const line = document.getElementById(lineInfinityId);
      if (!line) return Promise.resolve();
      return gsap.to(line, {
        y: line.offsetHeight,
        duration: 0.7,
      });
    }
    return Promise.resolve();
  },
  show() {
    const line = document.getElementById(lineInfinityId);
    if (!line) return;
    return gsap.fromTo(
      line,
      {
        y: line.offsetHeight,
        x: 400,
      },
      {
        y: 0,
        x: 0,
        duration: 0.7,
      }
    );
  },
};
