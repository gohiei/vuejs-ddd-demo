import type { TodoRepository } from "../repository/todo.repository";

export interface ActivateTodoUsecaseInput {
  id: number;
}

export interface ActivateTodoUsecaseOutput {
  result: string;
}

export class ActivateTodoUsecase {
  private repo: TodoRepository;

  constructor(repo: TodoRepository) {
    this.repo = repo;
  }

  execute(input: ActivateTodoUsecaseInput): ActivateTodoUsecaseOutput {
    const todo = this.repo.getTodoBy(input.id);
    todo.setActive();

    this.repo.updateStatus(todo);

    return { result: 'ok' };
  }
}
