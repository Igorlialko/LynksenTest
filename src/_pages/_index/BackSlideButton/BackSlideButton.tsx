import React from 'react';

import { backSlideButtonId } from '@/shared/utils/consts';

import s from './BackSlideButton.module.scss';

export const BackSlideButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button className={s.back} id={backSlideButtonId} onClick={onClick}>
      <div className={s.backText}>Back</div>
    </button>
  );
};
