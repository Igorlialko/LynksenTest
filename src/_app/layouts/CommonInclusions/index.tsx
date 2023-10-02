import React, { ReactElement, ReactNode, useEffect } from 'react';

import Head from 'next/head';
import { isAndroid } from 'react-device-detect';

import { versions } from '@/shared/utils/version';

import { Fonts } from './Fonts';

export const CommonInclusions = ({
  children,
}: {
  children: ReactNode | ReactElement | JSX.Element | string;
}) => {
  useEffect(() => {
    const setAppHeightProperty = () => {
      const windowVisibleHeight = isAndroid
        ? Math.min(
            window.innerHeight,
            window.outerHeight,
            window.innerHeight * window.devicePixelRatio
          )
        : window.innerHeight;

      document.documentElement.style.setProperty('--app-height', `${windowVisibleHeight}px`);
      document.documentElement.style.setProperty('--app-height-number', `${windowVisibleHeight}`);
    };

    setAppHeightProperty();

    window.addEventListener('resize', setAppHeightProperty);
    window.addEventListener('orientationchange', setAppHeightProperty);

    return () => {
      window.removeEventListener('resize', setAppHeightProperty);
      window.removeEventListener('orientationchange', setAppHeightProperty);
    };
  }, []);

  return (
    <>
      <Head>
        {process.env.NEXT_PUBLIC_ENV === 'development' && (
          <meta name='robots' content='noindex, nofollow' />
        )}
        <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0' />
        <link rel='icon' href={versions('/favicon.png')} />
      </Head>
      <Fonts>{children}</Fonts>
    </>
  );
};
