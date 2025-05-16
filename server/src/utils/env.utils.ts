import dotenv from 'dotenv';
import type { EnvironmentType } from 'src/types/Env';
dotenv.config();

const requiredEnvVars: string[] = ['PORT', 'NODE_ENV'];

const getEnvVar = (envVar: string): string => process.env[envVar] || '';
const getEnvironment = (): EnvironmentType =>
	getEnvVar('NODE_ENV') as EnvironmentType;

const isEnvValid = (requiredEnvVars: string[]): boolean => {
	const missingEnvVars = requiredEnvVars.filter(
		(envVar) => !process.env[envVar],
	);

	if (missingEnvVars.length > 0) {
		console.error(
			`Missing required environment variables:\n${missingEnvVars.join('\n')}`,
		);
		return false;
	}

	console.log('All required environment variables validated successfully');
	return true;
};

export { requiredEnvVars, getEnvVar, getEnvironment, isEnvValid };
