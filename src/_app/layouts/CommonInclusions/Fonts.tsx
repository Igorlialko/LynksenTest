import React, { useEffect } from 'react';

import { Noto_Sans } from 'next/font/google';

const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--fontFamily',
});

export const Fonts = ({ children }: any) => {
  useEffect(() => {
    document.body.classList.add(notoSans.variable);
    document.body.style.fontFamily = 'var(--fontFamily)';
  }, []);

  return (
    <div id='root-fonts' style={{ fontFamily: 'var(--fontFamily)' }} className={notoSans.variable}>
      {children}
    </div>
  );
};
