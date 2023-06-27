import type { TodoRepository } from "../repository/todo.repository";

export type TodoDto = {
  id: number;
  title: string;
  completed: boolean;
  visibility: boolean;
}

export interface ListeUsecaseInput {
  filter: string;
}

export interface ListTodoUsecaseOutput {
  todos: Array<TodoDto>;
}

export class ListTodoUsecase {
  private repo: TodoRepository;

  constructor(repo: TodoRepository) {
    this.repo = repo;
  }

  execute(input: ListeUsecaseInput): ListTodoUsecaseOutput {
    const todos = this.repo.loadTodos(input?.filter);

    const output: Array<TodoDto> = todos.map((todo) => {
      return {
        id: todo.getId(),
        title: todo.getDesc(),
        visibility: todo.isActive(),
        completed: todo.isCompleted(),
      }
    });

    return { todos: output };
  }
}
