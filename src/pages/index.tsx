import { GetStaticProps } from 'next';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import Head from 'next/head';

// import { HomePage } from '@/_pages/_index';
import { PreloaderPercentage } from '@/shared/ui/atoms/PreloaderPercentage';

import { useTypedSelector } from '@/shared/store/useTypedRedux';
import { pick } from '@/shared/utils/lodash';

const HomePage = dynamic(() => import('@/_pages/_index').then((_) => _.HomePage));

const Home = () => {
  const t = useTranslations('HomePage');
  const isLoadingPercentage = useTypedSelector((state) => state.commonReducer.isLoadingPercentage);
  const isShowContentPercentage = useTypedSelector(
    (state) => state.commonReducer.isShowContentPercentage
  );

  return (
    <>
      <Head>
        <title>{t('meta.title')}</title>
        <meta name='description' content={t('meta.title')} />
      </Head>
      <HomePage />
      {!isShowContentPercentage && <PreloaderPercentage finishAnimation={!isLoadingPercentage} />}
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    messages: pick((await import(`src/_app/intl/${locale}.js`)).default, ['HomePage']),
  },
});
