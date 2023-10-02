import { GetStaticProps } from 'next';
import { useTranslations } from 'next-intl';
import Head from 'next/head';

import { pick } from '@/shared/utils/lodash';

const Home = () => {
  const t = useTranslations('HomePage');

  return (
    <>
      <Head>
        <title>{t('meta.title')}</title>
        <meta name='description' content={t('meta.title')} />
      </Head>
      <main className='h1'>test font</main>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    messages: pick((await import(`LynksenTest/src/_app/intl/${locale}.js`)).default, ['HomePage']),
  },
});
