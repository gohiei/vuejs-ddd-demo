import type { TodoRepository } from "../repository/todo.repository";

export interface RemoveTodoUsecaseInput {
  id: number;
}

export interface RemoveTodoUsecaseOutput {
  result: string;
}

export class RemoveTodoUsecase {
  private repo: TodoRepository;

  constructor(repo: TodoRepository) {
    this.repo = repo;
  }

  execute(input: RemoveTodoUsecaseInput): RemoveTodoUsecaseOutput {
    const todo = this.repo.getTodoBy(input.id);

    if (todo) {
      this.repo.remove(todo);
    }

    return { result: 'ok' };
  }
}
