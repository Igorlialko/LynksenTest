import { ReactNode, useEffect } from 'react';

import classNames from 'classnames';

import { lineInfinityAnimation } from '@/_pages/_index/LineInfinity/utils/animation';

import { lineInfinityId } from '@/shared/utils/consts';

import s from './LineInfinity.module.scss';

export const LineInfinity = ({ children }: { children?: ReactNode }) => {
  useEffect(() => {
    lineInfinityAnimation.init();
  }, []);

  return (
    <>
      <div className={s.wrapper}>
        <div
          id={lineInfinityId}
          className={s.container}
          onMouseEnter={lineInfinityAnimation.updateTimeScale(0.3)}
          onMouseLeave={lineInfinityAnimation.updateTimeScale(1)}
        >
          <div className={s.text}>{'cat breeds'}</div>
          <div className={classNames(s.text, s.none)}>{'-'}</div>
          <div className={s.text}>{'cat breeds'}</div>
          <div className={classNames(s.text, s.none)}>{'-'}</div>
          <div className={s.text}>{'cat breeds'}</div>
          <div className={classNames(s.text, s.none)}>{'-'}</div>
        </div>
        {children}
      </div>
    </>
  );
};
