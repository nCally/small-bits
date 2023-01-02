const swaggerOptions = {
	swaggerDefinition: {
		openapi: '3.0.1',
		info: {
			version: '1.0.0',
			title: 'grexn api documentation',
			description: 'api endpoints',
			contact: {
				email: 'support@grexn.com',
				name: 'dev support',
			},
		},
		servers: [
			{ description: 'staging', url: `https://staging.grexn.com/` },
			{ description: 'live', url: `https://live.grexn.com/` },
		],
		security: [
			{
				bearerAuth: [],
			},
		],
		components: {
			securitySchemes: {
				bearerAuth: {
					type: 'http',
					scheme: 'bearer',
					bearerFormat: 'JWT',
				},
			},
		},
	},
};

export const customerEndpoints = {
	...swaggerOptions,
	apis: [`${process.cwd()}/src/endpoints/customers/**/*.ts`],
};

export const riderEndpoints = {
	...swaggerOptions,
	apis: [`${process.cwd()}/src/endpoints/riders/**/*.ts`],
};

export const adminEndpoints = {
	...swaggerOptions,
	apis: [`${process.cwd()}/src/endpoints/admin/**/*.ts`],
};
