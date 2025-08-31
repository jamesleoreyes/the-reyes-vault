import { assets } from "@src/configs/app";
import type { MetadataRoute } from "next";

function manifest(): MetadataRoute.Manifest {
  return {
    name: 'The Reyes Vault',
    short_name: 'The Reyes Vault',
    description: 'A digital vault for preserving family memories. Forever, searchable, and safe in the cloud.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    icons: [
      {
        src: assets.branding.icons['192'],
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: assets.branding.icons['512'],
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
};

export default manifest;