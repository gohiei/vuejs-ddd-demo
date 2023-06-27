import type { TodoRepository } from "../repository/todo.repository";

export interface CompleteTodoUsecaseInput {
  id: number;
}

export interface CompleteTodoUsecaseOutput {
  result: string;
}

export class CompleteTodoUsecase {
  private repo: TodoRepository;

  constructor(repo: TodoRepository) {
    this.repo = repo;
  }

  execute(input: CompleteTodoUsecaseInput): CompleteTodoUsecaseOutput {
    const todo = this.repo.getTodoBy(input.id);
    todo.setCompleted();

    this.repo.updateStatus(todo);

    return { result: 'ok' };
  }
}
