import express, { type Response } from 'express';

const app = express();

app.get('/', (res: Response) => {
	res.status(200).json({
		success: true,
		message: 'Server is running!',
	});
});

export default app;
