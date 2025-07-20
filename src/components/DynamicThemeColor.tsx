'use client';

import { useTheme } from 'next-themes';
import { useEffect } from 'react';

function DynamicThemeColor() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const existingThemeColor = document.querySelector(`meta[name='theme-color']`);
    if (existingThemeColor) existingThemeColor.remove();

    const meta = document.createElement('meta');
    meta.name = 'theme-color';

    if (resolvedTheme === 'dark') meta.content = '#09090b';
    else meta.content = '#ffffff';

    document.head.appendChild(meta);
  }, [resolvedTheme]);

  return null;
};

export { DynamicThemeColor };