import gsap from 'gsap';

import { descriptionSlideId, positionSlideId, titleSlideId } from '@/shared/utils/consts';

export const aboutContentAnimation = {
  start() {
    const positionSlide = document.getElementById(positionSlideId);
    const titleSlide = document.getElementById(titleSlideId);
    const descriptionSlide = document.getElementById(descriptionSlideId);
    if (positionSlide && titleSlide && descriptionSlide?.children) {
      const timelineText = gsap.timeline();

      // @ts-ignore
      timelineText.set([...descriptionSlide.children].slice(3), {
        display: 'none',
      });
      timelineText.add(
        gsap.to(positionSlide, {
          y: 0,
          duration: 0.5,
        })
      );
      timelineText.add(
        gsap.to(titleSlide, {
          y: 0,
          duration: 0.5,
        }),
        '-=0.4'
      );

      timelineText.add(
        gsap.to(
          // @ts-ignore
          [...descriptionSlide.children].map((el) => el.children[0]),
          {
            y: 0,
            duration: 0.5,
            stagger: 0.1,
          }
        ),
        '-=0.4'
      );

      timelineText.add(
        // @ts-ignore
        gsap.set([...descriptionSlide.children].slice(3), {
          display: 'unset',
        })
      );
    }
  },
};

export const createSplitLines = (container: HTMLElement | HTMLDivElement | null, text?: string) =>
  new Promise((resolve) => {
    if (!container || !text) {
      resolve(false);
      return;
    }
    const maxParagraphWidth = container.offsetWidth;

    const tempSpan = document.createElement('p');
    tempSpan.style.display = 'inline-flex';
    tempSpan.style.visibility = 'hidden';
    tempSpan.style.whiteSpace = 'nowrap';
    tempSpan.className = 'h2';
    tempSpan.style.textTransform = 'uppercase';
    document.body.appendChild(tempSpan);

    const words = text.split('');

    const lines: string[] = [];
    let currentLine = '';
    for (const word of words) {
      tempSpan.textContent = `${currentLine}${word}`;
      if (tempSpan.offsetWidth > maxParagraphWidth) {
        lines.push(currentLine.slice(0, -1));
        tempSpan.textContent = '';
        currentLine = '';
      }
      currentLine += `${word}`;
    }
    document.body.removeChild(tempSpan);

    container.textContent = '';
    for (const line of lines) {
      const span = document.createElement('span');
      const span2 = document.createElement('span');
      span.textContent = line;
      span2.appendChild(span);
      container.appendChild(span2);
    }
    setTimeout(() => {
      resolve(true);
    }, 20);
  });
