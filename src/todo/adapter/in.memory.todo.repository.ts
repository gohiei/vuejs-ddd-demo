import { Todo, TODO_STATUS } from '../entity/todo'
import type { TodoRepository } from '../repository/todo.repository'

export class InMemoryTodoRepository implements TodoRepository {
  private todos = new Map<number, Todo>();

  save(todo: Todo): void {
    this.todos.set(todo.getId(), todo);
  }

  loadTodos(filter: string): Array<Todo> {
    const status = filter === 'active'
      ? TODO_STATUS.ACTIVE
      : (filter === 'completed' ? TODO_STATUS.COMPLETED : 0);

    const t = new Array<Todo>();

    Array.from(this.todos.values())
      .filter((todo) => !status || todo.isStatus(status))
      .forEach((todo) => t.push(todo));

    return t;
  }

  getTodoBy(id: number): Todo {
    const todo = this.todos.get(id);

    if (!todo) {
      throw new Error(`Todo not found`);
    }

    return todo;
  }

  updateStatus(todo: Todo): void {
    this.todos.set(todo.getId(), todo);
  }

  remove(todo: Todo): void {
    this.todos.delete(todo.getId());
  }

  updateDesc(todo: Todo): void {
    this.todos.set(todo.getId(), todo);
  }
}
