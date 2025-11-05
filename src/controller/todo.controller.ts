import { Request, Response } from 'express';
import { TodoDB } from '../config/db';
import { ResponseHelper } from '../view/response';
import { CreateTodoDto, UpdateTodoDto } from '../models/todo.model';

export class TodoController {
  // GET /api/v1/todo - Get all todos
  static getAllTodos(req: Request, res: Response): Response {
    try {
      const todos = TodoDB.getAllTodos();
      return ResponseHelper.success(res, 'Todos retrieved successfully', {
        todos,
        count: todos.length
      });
    } catch (error) {
      return ResponseHelper.serverError(res, 'Failed to retrieve todos', error instanceof Error ? error.message : 'Unknown error');
    }
  }

  // GET /api/v1/todo/:id - Get todo by ID
  static getTodoById(req: Request, res: Response): Response {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return ResponseHelper.error(res, 'Invalid todo ID provided');
      }

      const todo = TodoDB.getTodoById(id);
      
      if (!todo) {
        return ResponseHelper.notFound(res, `Todo with ID ${id} not found`);
      }

      return ResponseHelper.success(res, 'Todo retrieved successfully', todo);
    } catch (error) {
      return ResponseHelper.serverError(res, 'Failed to retrieve todo', error instanceof Error ? error.message : 'Unknown error');
    }
  }

  // POST /api/v1/todo - Create new todo
  static createTodo(req: Request, res: Response): Response {
    try {
      const { name, lastname, age }: CreateTodoDto = req.body;

      // Validation
      if (!name || !lastname || age === undefined) {
        return ResponseHelper.error(res, 'Missing required fields: name, lastname, and age are required');
      }

      if (typeof name !== 'string' || typeof lastname !== 'string' || typeof age !== 'number') {
        return ResponseHelper.error(res, 'Invalid data types: name and lastname must be strings, age must be a number');
      }

      if (age < 0 || age > 150) {
        return ResponseHelper.error(res, 'Age must be between 0 and 150');
      }

      const newTodo = TodoDB.createTodo({ name, lastname, age });
      
      return ResponseHelper.created(res, 'Todo created successfully', newTodo);
    } catch (error) {
      return ResponseHelper.serverError(res, 'Failed to create todo', error instanceof Error ? error.message : 'Unknown error');
    }
  }

  // PUT /api/v1/todo/:id - Update todo
  static updateTodo(req: Request, res: Response): Response {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return ResponseHelper.error(res, 'Invalid todo ID provided');
      }

      const { name, lastname, age }: UpdateTodoDto = req.body;

      // Validation for provided fields
      if (name !== undefined && typeof name !== 'string') {
        return ResponseHelper.error(res, 'Name must be a string');
      }

      if (lastname !== undefined && typeof lastname !== 'string') {
        return ResponseHelper.error(res, 'Lastname must be a string');
      }

      if (age !== undefined && (typeof age !== 'number' || age < 0 || age > 150)) {
        return ResponseHelper.error(res, 'Age must be a number between 0 and 150');
      }

      // Check if at least one field is provided for update
      if (name === undefined && lastname === undefined && age === undefined) {
        return ResponseHelper.error(res, 'At least one field (name, lastname, or age) must be provided for update');
      }

      const updatedTodo = TodoDB.updateTodo(id, { name, lastname, age });
      
      if (!updatedTodo) {
        return ResponseHelper.notFound(res, `Todo with ID ${id} not found`);
      }

      return ResponseHelper.success(res, 'Todo updated successfully', updatedTodo);
    } catch (error) {
      return ResponseHelper.serverError(res, 'Failed to update todo', error instanceof Error ? error.message : 'Unknown error');
    }
  }

  // DELETE /api/v1/todo/:id - Delete todo
  static deleteTodo(req: Request, res: Response): Response {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return ResponseHelper.error(res, 'Invalid todo ID provided');
      }

      const deleted = TodoDB.deleteTodo(id);
      
      if (!deleted) {
        return ResponseHelper.notFound(res, `Todo with ID ${id} not found`);
      }

      return ResponseHelper.success(res, 'Todo deleted successfully', { deletedId: id });
    } catch (error) {
      return ResponseHelper.serverError(res, 'Failed to delete todo', error instanceof Error ? error.message : 'Unknown error');
    }
  }
}