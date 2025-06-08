const roles = ['admin', 'member'] as const;
const family = ['reyes', 'conklin', 'all'] as const;
const memory = ['photo', 'video', 'vhs', 'audio', 'music'] as const;

type RolesType = (typeof roles)[number];
type FamilyType = (typeof family)[number];
type MemoryType = (typeof memory)[number];

export { roles, family, memory }
export type { RolesType, FamilyType, MemoryType }