import type { TodoRepository } from "../repository/todo.repository";
import { ActivateTodoUsecase } from "./activate.todo.usecase";
import { CompleteTodoUsecase } from "./complete.todo.usecase";
import { CreateTodoUsecase } from "./create.todo.usecase";
import { ListTodoUsecase } from "./list.todo.usecase";
import { RemoveTodoUsecase } from "./remove.todo.usecase";
import { UpdateTodoDescUsecase } from "./update.todo.desc.usecase";

export interface Usecase<I, O> {
  execute(i: I): O;
}

export abstract class TodoUsecase<I, O> implements Usecase<I, O> {
  protected repo: TodoRepository;

  constructor(repo: TodoRepository) {
    this.repo = repo;
  }

  abstract execute(i: I): O;
}

export function TodoUsecaseFactory(repo: TodoRepository) {
  return {
    activateTodo: new ActivateTodoUsecase(repo),
    completeTodo:  new CompleteTodoUsecase(repo),
    createTodo: new CreateTodoUsecase(repo),
    listTodo: new ListTodoUsecase(repo),
    removeTodo: new RemoveTodoUsecase(repo),
    updateTodoDesc: new UpdateTodoDescUsecase(repo),
  };
}
