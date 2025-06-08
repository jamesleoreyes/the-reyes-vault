'use client';

import { isAdminFeaturesEnabled } from '@/utils/demo';

interface DemoAwareNavProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

export function DemoAwareNav({ children, adminOnly = false }: DemoAwareNavProps) {
  // Hide admin-only navigation items in demo mode
  if (adminOnly && !isAdminFeaturesEnabled()) {
    return null;
  }

  return <>{children}</>;
}