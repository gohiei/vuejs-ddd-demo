import { Todo } from '../entity/todo'

export interface TodoRepository {
  loadTodos(filter: string): Array<Todo>;
  getTodoBy(id: number): Todo;
  updateStatus(todo: Todo): void;
  save(todo: Todo): void;
  remove(todo: Todo): void;
  updateDesc(todo: Todo): void;
}
