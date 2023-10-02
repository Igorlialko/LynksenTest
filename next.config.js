const images = require('next-images');
const withPlugins = require('next-compose-plugins');
const shortid = require('shortid');

// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// });

const nextConfig = {
  env: {
    version: shortid.generate(),
  },
  swcMinify: true,
  reactStrictMode: false,
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // config.optimization.splitChunks = {
    //   chunks: 'async',
    //   minSize: 100000,
    //   maxSize: 200000,
    //   minRemainingSize: 0,
    //   minChunks: 1,
    //   maxAsyncRequests: 30,
    //   maxInitialRequests: 30,
    //   enforceSizeThreshold: 150000,
    //   cacheGroups: {
    //     defaultVendors: {
    //       test: /[\\/]node_modules[\\/]/,
    //       priority: -10,
    //       reuseExistingChunk: true,
    //     },
    //     default: {
    //       minChunks: 2,
    //       priority: -20,
    //       reuseExistingChunk: true,
    //     },
    //   },
    // };
    return config;
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Expect-CT header - is deprecated
          // {
          //   key: 'Expect-CT',
          //   value: 'enforce, max-age=86400',
          // },
          {
            key: 'Access-Control-Allow-Origin',
            value: 'no-cors',
          },
          // {
          //   key: 'Referrer-Policy',
          //   value: 'strict-origin-when-cross-origin',
          // },
          // {
          //   key: 'Strict-Transport-Security',
          //   value: 'max-age=63072000; includeSubDomains; preload',
          // },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Download-Options',
            value: 'noopen',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Permitted-Cross-Domain-Policies',
            value: 'none',
          },
          {
            key: 'X-UA-Compatible',
            value: 'IE=edge; chrome=1',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
      {
        source: '/(.*).(avif|jpg|jpeg|png|webp|gif|ico|woff2|svg|css|js|json|mp3|mp4)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=189216000, immutable',
          },
        ],
      },
    ];
  },
  images: {
    unoptimized: true,
    domains: [],
  },
};

module.exports = withPlugins(
  [
    [images],
    // [withBundleAnalyzer]
  ],
  nextConfig
);
