import React from 'react';

import classNames from 'classnames';
import Image from 'next/image';

import s from './ReloadSlideButton.module.scss';

export const ReloadSlideButton = ({
  onClick,
  disable,
}: {
  onClick: () => void;
  disable?: boolean;
}) => {
  return (
    <button
      className={classNames(s.reload, {
        [s.disable]: disable,
      })}
      onClick={onClick}
      disabled={disable}
    >
      <Image src={'/reloadW.webp'} alt={'reload'} width={24} height={24} />
    </button>
  );
};
