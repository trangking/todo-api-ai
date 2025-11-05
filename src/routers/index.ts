import { Router } from 'express';
import todoRouter from './todo.router';

const apiRouter = Router();

// Mount todo routes at /todo
apiRouter.use('/todo', todoRouter);

// Health check endpoint
// apiRouter.get('/health', (req, res) => {
//   res.json({
//     success: true,
//     message: 'API is running',
//     timestamp: new Date().toISOString(),
//     version: '1.0.0'
//   });
// });

export default apiRouter;