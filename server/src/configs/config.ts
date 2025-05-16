import type { IAppConfig } from '../types/Config';
import type { EnvironmentType } from '../types/Env';
import { getEnvVar } from '../utils/env.utils';

const appConfig: IAppConfig = {
	port: parseInt(getEnvVar('PORT')),
	env: getEnvVar('NODE_ENV') as EnvironmentType,
};

export default appConfig;
