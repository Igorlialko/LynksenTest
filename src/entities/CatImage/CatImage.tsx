import React, { useEffect, useState } from 'react';

import Image from 'next/image';

import s from './CatImage.module.scss';

export const CatImage = ({
  alt,
  url,
  onError,
  onLoad,
}: {
  alt: string;
  url?: string;
  onError?: () => void;
  onLoad?: () => void;
}) => {
  const [src, setSrc] = useState(url || '/errorCat.webp');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (url) {
      setSrc(url);
    }
  }, [url]);

  return (
    <Image
      src={src}
      alt={alt}
      className={isLoading ? s.isLoading : ''}
      width={200}
      height={450}
      onLoad={() => {
        setIsLoading(false);
        onLoad?.();
      }}
      onError={() => {
        setSrc('/errorCat.webp');
        onError?.();
      }}
    />
  );
};
