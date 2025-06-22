import { appConfig } from '@/lib/config';
import { Profile } from '@/types';

export function generateDemoProfile(userId?: string): Profile {
  const demoNames: Pick<Profile, 'first_name' | 'last_name' | 'avatar_url'>[] = [
    { first_name: 'Mark', last_name: 'S', avatar_url: '' },
    { first_name: 'Gemma', last_name: 'Scout', avatar_url: '' },
    { first_name: 'Ms.', last_name: 'Casey', avatar_url: '' },
    { first_name: 'Dylan', last_name: 'G', avatar_url: '' },
    { first_name: 'Helena', last_name: 'Eagan', avatar_url: '' },
    { first_name: 'Helly', last_name: 'R', avatar_url: '' },
    { first_name: 'Irving', last_name: 'B', avatar_url: '' },
    { first_name: 'Eustice', last_name: 'Huang', avatar_url: '' },
    { first_name: 'Harmony', last_name: 'Cobel', avatar_url: '' },
    { first_name: 'Mr.', last_name: 'Drummond', avatar_url: '' },
    { first_name: 'Seth', last_name: 'Milkshake', avatar_url: '' },
    { first_name: 'Natalie', last_name: 'Kalen', avatar_url: '' },
    { first_name: 'The', last_name: 'Board', avatar_url: '' },
  ];

  // Use userId to consistently generate the same name for the same user
  const nameIndex = userId ?
    Math.abs(userId.split('').reduce((a, b) => a + b.charCodeAt(0), 0)) % demoNames.length :
    Math.floor(Math.random() * demoNames.length);

  // Ensure we always have a valid name with fallback
  const selectedName = demoNames[nameIndex] || demoNames[0] as Pick<Profile, 'first_name' | 'last_name'>;

  return {
    id: userId || 'demo-user',
    first_name: selectedName.first_name,
    last_name: selectedName.last_name,
    role: 'demo',
    family: 'demo',
    avatar_url: `https://api.dicebear.com/9.x/fun-emoji/svg?seed=${userId}`,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

export function isAdminFeaturesEnabled(): boolean {
  return !appConfig.isDemoMode;
}