import dotenv from 'dotenv';
import mongoose from 'mongoose';
import createApp from './app';

dotenv.config();

function startServer() {
	const app = createApp();

	const port = process.env.PORT;

	app.listen(port, () => {
		console.log('app starting...');

		const DB = process.env.DB;
		mongoose.set('strictQuery', false);
		mongoose.connect(DB, { keepAlive: true, ignoreUndefined: true }, (e) => {
			if (e) {
				console.error(e);
			} else {
				console.log('connected 🚀');
				console.log('http://localhost:' + port);
			}
		});
	});
}

startServer();
