export const doScroll = (element, duration, scrollContainer, endAnimation = () => {}) => {
  function getElementY(query, scroll) {
    return (
      scroll.scrollTop + query.getBoundingClientRect().top - scroll.getBoundingClientRect().top
      // (50 * window.innerHeight) / 100 +
      // query.offsetHeight / 2
    );
  }

  const startingY = scrollContainer.scrollTop;
  const elementY = getElementY(element, scrollContainer);
  const blockHeight = scrollContainer.offsetHeight; //- (50 * window.innerHeight) / 100;
  const targetY =
    scrollContainer.scrollHeight - elementY < blockHeight
      ? scrollContainer.scrollHeight - blockHeight
      : elementY;
  const diff = targetY - startingY;
  const easing = function (t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  };
  let start;
  if (!diff) return;
  window.requestAnimationFrame(function step(timestamp) {
    if (!start) start = timestamp;
    const time = timestamp - start;
    let percent = Math.min(time / duration, 1);
    percent = easing(percent);
    scrollContainer.scrollTo(0, startingY + diff * percent);
    if (time < duration) {
      window.requestAnimationFrame(step);
    } else {
      endAnimation();
    }
  });
};
