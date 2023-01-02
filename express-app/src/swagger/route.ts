import dotenv from 'dotenv';
import path from 'path';
import { Router, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import jsdoc from 'swagger-jsdoc';
import { adminEndpoints, customerEndpoints, riderEndpoints } from './options';

dotenv.config();

const route = Router();

const uiOptions = {
	customer: {
		explorer: true,
		swaggerOptions: {
			url: `http://localhost:${process.env.PORT}/customer/file/api-docs.json`,
		},
	},
	rider: {
		explorer: true,
		swaggerOptions: {
			url: `http://localhost:${process.env.PORT}/rider/file/api-docs.json`,
		},
	},
	admin: {
		explorer: true,
		swaggerOptions: {
			url: `http://localhost:${process.env.PORT}/admin/file/api-docs.json`,
		},
	},
};

route.get('/', (req: Request, res: Response) => {
	res.sendFile(path.join(__dirname, '/index.html'));
});

// retrieve swagger artifacts
const customerDocs = jsdoc(customerEndpoints);
route.get('/customer/file/api-docs.json', (req: Request, res: Response) => {
	res.setHeader('Content-Type', 'application/json');
	res.send(customerDocs);
});

const riderDocs = jsdoc(riderEndpoints);
route.get('/rider/file/api-docs.json', (req: Request, res: Response) => {
	res.setHeader('Content-Type', 'application/json');
	res.send(riderDocs);
});

const adminDocs = jsdoc(adminEndpoints);
route.get('/admin/file/api-docs.json', (req: Request, res: Response) => {
	res.setHeader('Content-Type', 'application/json');
	res.send(adminDocs);
});

// docs
route.use(
	'/docs/customer/index.html',
	swaggerUi.serveFiles(
		uiOptions.customer.swaggerOptions.url as any,
		uiOptions.customer
	),
	swaggerUi.setup(uiOptions.customer.swaggerOptions.url as any)
);
route.get(
	'/docs/customer/index.html',
	swaggerUi.setup(null, uiOptions.customer)
);

// rider
route.use(
	'/docs/rider/index.html',
	swaggerUi.serveFiles(
		uiOptions.rider.swaggerOptions.url as any,
		uiOptions.rider
	),
	swaggerUi.setup(uiOptions.rider.swaggerOptions.url as any)
);
route.get('/docs/rider/index.html', swaggerUi.setup(null, uiOptions.rider));

// admin
route.use(
	'/docs/admin/index.html',
	swaggerUi.serveFiles(
		uiOptions.admin.swaggerOptions.url as any,
		uiOptions.admin
	),
	swaggerUi.setup(uiOptions.admin.swaggerOptions.url as any)
);
route.get('/docs/admin/index.html', swaggerUi.setup(null, uiOptions.admin));

export default route;
