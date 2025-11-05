import { Router } from 'express';
import { TodoController } from '../controller/todo.controller';

const todoRouter = Router();

// GET /api/v1/todo - Get all todos
todoRouter.get('/', TodoController.getAllTodos);

// GET /api/v1/todo/:id - Get todo by ID
todoRouter.get('/:id', TodoController.getTodoById);

// POST /api/v1/todo - Create new todo
todoRouter.post('/', TodoController.createTodo);

// PUT /api/v1/todo/:id - Update todo
todoRouter.put('/:id', TodoController.updateTodo);

// DELETE /api/v1/todo/:id - Delete todo
todoRouter.delete('/:id', TodoController.deleteTodo);

export default todoRouter;