import React from 'react';

import { useTranslations } from 'next-intl';

import { backSlideButtonId } from '@/shared/utils/consts';

import s from './BackSlideButton.module.scss';

export const BackSlideButton = ({ onClick }: { onClick: () => void }) => {
  const t = useTranslations('HomePage');
  return (
    <button className={s.back} id={backSlideButtonId} onClick={onClick}>
      <div className={s.backText}>{t('Back')}</div>
    </button>
  );
};
