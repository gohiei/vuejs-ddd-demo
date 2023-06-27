import { Todo } from "../entity/todo";
import type { TodoRepository } from "../repository/todo.repository";

export interface CreateTodoUsecaseInput {
  desc: string;
}

export interface CreateTodoUsecaseOutput {
  id: number;
  desc: string;
}

export class CreateTodoUsecase {
  private repo: TodoRepository;

  constructor(repo: TodoRepository) {
    this.repo = repo;
  }

  execute(input: CreateTodoUsecaseInput): CreateTodoUsecaseOutput {

    const todo = new Todo(input.desc);
    this.repo.save(todo);

    return { id: todo.getId(), desc: todo.getDesc() };
  }
}
