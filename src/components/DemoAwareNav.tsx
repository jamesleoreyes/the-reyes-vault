'use client';

import { isAdminFeaturesEnabled } from '@/utils/demo';

interface DemoAwareNavProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

function DemoAwareNav({ children, adminOnly = false }: DemoAwareNavProps) {
  if (adminOnly && !isAdminFeaturesEnabled()) return null;
  return <>{children}</>;
};

export { DemoAwareNav };