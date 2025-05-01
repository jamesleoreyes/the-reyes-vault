import { getEnvVar } from "../utils/env";

const appConfig = {
  port: getEnvVar('PORT'),
  env: getEnvVar('NODE_ENV'),
};

export default appConfig;