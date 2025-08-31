import { appConfig } from '@src/configs/app';
import { Profile } from '@src/types';
/**
 * Generates a consistent demo profile to enable application demonstration without requiring
 * database setup, user registration, or authentication infrastructure.
 * 
 * This function serves multiple critical purposes:
 * - Allows potential users to experience the application immediately without barriers
 * - Provides a sandbox environment for showcasing features
 * - Maintains consistent demo experiences across sessions by deterministically mapping
 *   user IDs to specific demo personas
 * 
 * The demo names are inspired by the TV show "Severance" to create memorable,
 * distinct personas that help differentiate between different demo user sessions
 * while maintaining a cohesive thematic experience.
 * 
 * @param {string} [userId] - Optional user ID for consistent persona mapping
 * @returns {Profile} A complete demo profile with deterministic persona assignment
 */
function generateDemoProfile(userId?: string): Profile {
  const demoNames: Pick<Profile, 'first_name' | 'last_name'>[] = [
    { first_name: 'Mark', last_name: 'S' },
    { first_name: 'Gemma', last_name: 'Scout' },
    { first_name: 'Ms.', last_name: 'Casey' },
    { first_name: 'Dylan', last_name: 'G' },
    { first_name: 'Helena', last_name: 'Eagan' },
    { first_name: 'Helly', last_name: 'R' },
    { first_name: 'Irving', last_name: 'B' },
    { first_name: 'Eustice', last_name: 'Huang' },
    { first_name: 'Harmony', last_name: 'Cobel' },
    { first_name: 'Mr.', last_name: 'Drummond' },
    { first_name: 'Seth', last_name: 'Milkshake' },
    { first_name: 'Natalie', last_name: 'Kalen' },
    { first_name: 'The', last_name: 'Board' },
  ];

  // Use userId to consistently generate the same persona for the same user
  const nameIndex = userId
    ? Math.abs(userId.split('').reduce((a, b) => a + b.charCodeAt(0), 0)) % demoNames.length
    : Math.floor(Math.random() * demoNames.length);

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
};

function isAdminFeaturesEnabled(): boolean {
  return !appConfig.isDemoMode;
};

export { generateDemoProfile, isAdminFeaturesEnabled };