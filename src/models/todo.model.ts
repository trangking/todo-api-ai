export interface Todo {
  id: number;
  name: string;
  lastname: string;
  age: number;
}

export interface CreateTodoDto {
  name: string;
  lastname: string;
  age: number;
}

export interface UpdateTodoDto {
  name?: string;
  lastname?: string;
  age?: number;
}