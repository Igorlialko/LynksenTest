import React from 'react';

import { pick } from '@/shared/utils/lodash';

function NotFound() {
  return <>404</>;
}

export default NotFound;

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      messages: pick((await import(`src/_app/intl/${locale}.js`)).default, []),
    },
  };
}
