import { appConfig } from '@/lib/config';
import { Profile } from '@/types/Profiles';
import { Family, Role } from '@/types/enums';

interface DemoName {
  first: string;
  last: string;
}

export function generateDemoProfile(userId?: string): Profile {
  const demoNames: DemoName[] = [
    { first: 'Alex', last: 'Demo' },
    { first: 'Jordan', last: 'Visitor' },
    { first: 'Casey', last: 'Guest' },
    { first: 'Taylor', last: 'Explorer' },
    { first: 'Morgan', last: 'User' },
  ];

  // Use userId to consistently generate the same name for the same user
  const nameIndex = userId ?
    Math.abs(userId.split('').reduce((a, b) => a + b.charCodeAt(0), 0)) % demoNames.length :
    Math.floor(Math.random() * demoNames.length);

  // Ensure we always have a valid name with fallback
  const selectedName = demoNames[nameIndex] || demoNames[0] as DemoName;

  return {
    id: userId || 'demo-user',
    first_name: selectedName.first,
    last_name: selectedName.last,
    role: Role.MEMBER,
    family: Family.ALL,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

export function isAdminFeaturesEnabled(): boolean {
  return !appConfig.isDemoMode;
}