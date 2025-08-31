import type { MetadataRoute } from 'next';
import { urlConfig } from '@src/configs/app';

function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      disallow: '/',
    },
    host: urlConfig.app,
    sitemap: urlConfig.sitemap,
  };
};

export default robots;