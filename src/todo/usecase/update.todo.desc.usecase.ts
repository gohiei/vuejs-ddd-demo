import type { TodoRepository } from "../repository/todo.repository";

export interface UpdateTodoDescUsecaseInput {
  id: number;
  desc: string;
}

export interface UpdateTodoDescUsecaseOutput {
  result: string;
}

export class UpdateTodoDescUsecase {
  private repo: TodoRepository;

  constructor(repo: TodoRepository) {
    this.repo = repo;
  }

  execute(input: UpdateTodoDescUsecaseInput): UpdateTodoDescUsecaseOutput {
    const todo = this.repo.getTodoBy(input.id);

    if (todo) {
      todo.updateDesc(input.desc);
      this.repo.updateDesc(todo);
    }

    return { result: 'ok' };
  }
}
