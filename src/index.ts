import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import apiRouter from "./routers";

const app: Application = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
// app.use(requestLogger);

// API Routes
app.use("/api/v1", apiRouter);

// Root endpoint
// app.get("/", (req: Request, res: Response) => {
//   res.json({
//     success: true,
//     message: "Welcome to Todo API",
//     version: "1.0.0",
//     endpoints: {
//       health: "/api/v1/health",
//       todos: {
//         getAll: "GET /api/v1/todo",
//         getById: "GET /api/v1/todo/:id",
//         create: "POST /api/v1/todo",
//         update: "PUT /api/v1/todo/:id",
//         delete: "DELETE /api/v1/todo/:id",
//       },
//     },
//   });
// });

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.originalUrl,
  });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

// Error handling middleware (must be last)
// app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Todo API Server is running on port ${PORT}`);
  // console.log(`📍 API Documentation: http://localhost:${PORT}`);
  // console.log(`🔍 Health Check: http://localhost:${PORT}/api/v1/health`);
  console.log(`📝 Todos Endpoint: http://localhost:${PORT}/api/v1/todo`);
});

export default app;
