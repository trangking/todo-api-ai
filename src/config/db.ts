import { Todo } from '../models/todo.model';

// In-memory storage for todos
let todos: Todo[] = [
  {
    id: 1,
    name: "John",
    lastname: "Doe",
    age: 25
  },
  {
    id: 2,
    name: "Jane",
    lastname: "Smith",
    age: 30
  },
  {
    id: 3,
    name: "Mike",
    lastname: "Johnson",
    age: 28
  }
];

let nextId = 4; // Track next available ID

export class TodoDB {
  static getAllTodos(): Todo[] {
    return todos;
  }

  static getTodoById(id: number): Todo | undefined {
    return todos.find(todo => todo.id === id);
  }

  static createTodo(todoData: Omit<Todo, 'id'>): Todo {
    const newTodo: Todo = {
      id: nextId++,
      ...todoData
    };
    todos.push(newTodo);
    return newTodo;
  }

  static updateTodo(id: number, updateData: Partial<Omit<Todo, 'id'>>): Todo | null {
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if (todoIndex === -1) {
      return null;
    }

    todos[todoIndex] = { ...todos[todoIndex], ...updateData };
    return todos[todoIndex];
  }

  static deleteTodo(id: number): boolean {
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if (todoIndex === -1) {
      return false;
    }

    todos.splice(todoIndex, 1);
    return true;
  }

  static getTodoCount(): number {
    return todos.length;
  }
}