import { setupCustomLogging } from "./config/logger";
import app from "./app";
import appConfig from "./config/app";
import { isEnvValid, requiredEnvVars } from "./utils/env";

setupCustomLogging(appConfig.env === 'development');

const startServer = () => {
  if (!isEnvValid(requiredEnvVars)) process.exitCode = 1;

  app.listen(appConfig.port, () => {
    console.log(`Express app is listening on port [${appConfig.port}]`)
  })
};

startServer();