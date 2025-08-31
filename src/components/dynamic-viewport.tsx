'use client';

import { useEffect } from 'react';
import { usePWAMode } from '@/src/hooks/use-pwa-mode';

function DynamicViewport() {
  const isPWA = usePWAMode();

  useEffect(() => {
    const viewportMeta = document.querySelector(`meta[name='viewport']`);
    let originalContent = '';

    if (viewportMeta) {
      originalContent = viewportMeta.getAttribute('content') || '';
      const userScalable = isPWA ? 'no' : 'yes';
      const viewportContent = `width=device-width, initial-scale=1, maximum-scale=5, user-scalable=${userScalable}, viewport-fit=cover`;
      viewportMeta.setAttribute('content', viewportContent);
    }

    const originalPwaData = document.body.dataset['pwa'];
    document.body.dataset['pwa'] = isPWA ? 'true' : 'false';

    return () => {
      try {
        if (viewportMeta && originalContent) {
          viewportMeta.setAttribute('content', originalContent);
        }
        if (originalPwaData !== undefined) {
          document.body.dataset['pwa'] = originalPwaData;
        } else {
          delete document.body.dataset['pwa'];
        }
      } catch (error) {
        console.warn('DynamicViewport cleanup error:', error);
      }
    };
  }, []);

  return null;
};

export { DynamicViewport };