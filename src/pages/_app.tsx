import { NextIntlProvider } from 'next-intl';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import { CommonInclusions } from '@/_app/layouts/CommonInclusions';
import '@/_app/styles/globals.scss';

import { store } from '@/shared/store/store';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextIntlProvider messages={pageProps.messages}>
      <Provider store={store}>
        <CommonInclusions>
          <Component {...pageProps} />
        </CommonInclusions>
      </Provider>
    </NextIntlProvider>
  );
}
