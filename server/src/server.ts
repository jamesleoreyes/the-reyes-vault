import app from './app';
import appConfig from './configs/config';
import { isEnvValid, requiredEnvVars } from './utils/env.utils';

const { port, env } = appConfig;

const startServer = (): void => {
	try {
		if (!isEnvValid(requiredEnvVars)) process.exit(1);

		app.listen(port, () => {
			console.log(
				`Express app is listening on port [${port.toFixed(0)}] in [${env}]`,
			);
		});
	} catch (error) {
		console.error('Failed to start the server:', error);
		process.exit(1);
	}
};

startServer();
