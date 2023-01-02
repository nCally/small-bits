import express, { Application } from 'express';
import swaggerRoute from './swagger/route';

function createApp() {
	const app: Application = express();

	app.disable('x-powered-by');

	app.use(express.json({ limit: '10mb' }));
	app.use(express.urlencoded({ extended: true, limit: '20mb' }));

	app.use('/', swaggerRoute);

	return app;
}

export default createApp;
