import { Todo } from "../models/todo.model";

// In-memory storage for todos
let todos: Todo[] = [
  {
    id: 1,
    name: "John",
    lastname: "Doe",
    age: 25,
  },
  {
    id: 2,
    name: "Jane",
    lastname: "Smith",
    age: 30,
  },
  {
    id: 3,
    name: "Mike",
    lastname: "Johnson",
    age: 28,
  },
];

// let nextId = 4;  Track next available ID

export class TodoDB {
  static getAllTodos(): Todo[] {
    // return todos;
    return [...todos];
  }

  static getTodoById(id: number): Todo | undefined {
    return todos.find((todo) => todo.id === id);
  }

  // static createTodo(todoData: Omit<Todo, "id">): Todo {
  //   const newTodo: Todo = {
  //     id: nextId++,
  //     ...todoData,
  //   };
  //   todos.push(newTodo);
  //   return newTodo;
  // }
  static createTodo(todoData: Omit<Todo, "id">): Todo {
    const newId =
      todos.length > 0 ? Math.max(...todos.map((t) => t.id)) + 1 : 1;

    const newTodo: Todo = {
      id: newId,
      ...todoData,
    };

    todos.push(newTodo);
    return newTodo;
  }

  static updateTodo(
    id: number,
    updateData: Partial<Omit<Todo, "id">>
  ): Todo | null {
    const todoIndex = todos.findIndex((todo) => todo.id === id);
    if (todoIndex === -1) {
      return null;
    }

    // todos[todoIndex] = { ...todos[todoIndex], ...updateData };
    const validData = Object.fromEntries(
      Object.entries(updateData).filter(([_, v]) => v !== undefined)
    );
    todos[todoIndex] = { ...todos[todoIndex], ...validData };
    return todos[todoIndex];
  }

  static deleteTodo(id: number): boolean {
    const todoIndex = todos.findIndex((todo) => todo.id === id);
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
