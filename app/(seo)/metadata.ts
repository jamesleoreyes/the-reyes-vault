import { Metadata } from 'next';
import { assets, urlConfig } from '@src/configs/app';

interface Meta {
  title: string;
  description: string;
  siteName: string;
  creator: string;
};

const meta: Meta = {
  title: 'The Reyes Vault',
  description: 'A digital vault for preserving family memories. Forever, searchable, and safe in the cloud.',
  siteName: 'The Reyes Vault',
  creator: 'James Reyes'
};

const defaultUrl = urlConfig.app
  ? `https://${urlConfig.app}`
  : 'http://localhost:3000';

const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: {
    template: `%s | ${meta.title}`,
    default: meta.title
  },
  description: meta.description,
  applicationName: meta.siteName,
  creator: meta.creator,
  openGraph: {
    type: 'website',
    title: {
      template: `%s | ${meta.title}`,
      default: meta.title
    },
    siteName: meta.siteName,
    description: meta.description,
    url: defaultUrl,
  },
  twitter: {
    card: 'summary_large_image',
    title: {
      template: `%s | ${meta.title}`,
      default: meta.title
    },
    description: meta.description,
  },
  appleWebApp: {
    capable: true,
    title: meta.title,
    statusBarStyle: 'default',
    startupImage: assets.branding.icons['192']
  },
  icons: {
    icon: assets.branding.favicon,
    apple: assets.branding.icons.appleTouch,
  }
};

export { metadata };