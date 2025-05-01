import dotenv from 'dotenv';
dotenv.config();

export const requiredEnvVars: string[] = [
  'PORT',
  'NODE_ENV'
];

export const getEnvVar = (envVar: string): string => {
  return process.env[envVar] || ''
};

export const isEnvValid = (requiredEnvVars: string[]): boolean => {
  const missingEnvVars = requiredEnvVars.filter((envVar => !process.env[envVar]));

  if (missingEnvVars.length > 0) {
    console.error(`Missing required environment variables:\n${missingEnvVars.join('\n')}`);
    return false;
  };

  console.success(`All required environment variables validated successfully`)
  return true;
}