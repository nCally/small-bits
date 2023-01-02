import { Router, Response, Request } from 'express';

const router = Router();

/**
 * @openapi
 * /health:
 *   get:
 *     tags: [Health]
 *     summary: Health check of api
 *     responses:
 *       200:
 *          description: alive
 *       500:
 *          description: server down
 * */
router.get('/health', (req: Request, res: Response) => {
	res.sendStatus(200);
});
