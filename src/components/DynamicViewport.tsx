'use client';

import { useEffect } from 'react';

function DynamicViewport() {
  useEffect(() => {
    const isPWA = window.matchMedia('(display-mode: standalone)').matches
      || (window.navigator as unknown as { standalone?: boolean }).standalone === true
      || document.referrer.includes('android-app://');

    const viewportMeta = document.querySelector(`meta[name='viewport']`);

    if (viewportMeta) {
      const userScalable = isPWA ? 'no' : 'yes';
      const viewportContent = `width=device-width, initial-scale=1, maximum-scale=5, user-scalable=${userScalable}, viewport-fit=contain`;
      viewportMeta.setAttribute('content', viewportContent);
    }
  }, []);

  return null;
};

export { DynamicViewport };