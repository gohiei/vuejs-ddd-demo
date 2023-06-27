export enum TODO_STATUS {
  ACTIVE = 1,
  COMPLETED = 2,
}

let id = 1;

export class Todo {
  private id = 0;
  private desc: string = '';
  private status: TODO_STATUS = TODO_STATUS.ACTIVE;

  constructor(desc: string) {
    this.id = id++;
    this.desc = desc;
  }

  getId(): number {
    return this.id;
  }

  getDesc(): string {
    return this.desc;
  }

  isActive(): boolean {
    return this.status === TODO_STATUS.ACTIVE;
  }

  isCompleted(): boolean {
    return this.status === TODO_STATUS.COMPLETED;
  }

  setActive() {
    if (this.isActive()) {
      return;
    }

    this.status = TODO_STATUS.ACTIVE;
  }

  setCompleted() {
    if (this.isCompleted()) {
      return;
    }

    this.status = TODO_STATUS.COMPLETED;
  }

  isStatus(status: number): boolean {
    return this.status === status;
  }

  updateDesc(desc: string) {
    this.desc = desc;
  }
}

// export class Todos {
//   private items: Array<Todo> = [];

//   addTodo(desc: string) {
//     this.items.push(new Todo(desc));
//   }

//   setActive(id: number) {
//     const todo = this.items.find((item) => item.getId() === id);

//     if (!todo) {
//       return;
//     }

//     todo.setActive();
//   }

//   setCompleted(id: number) {
//     const todo = this.items.find((item) => item.getId() === id);

//     if (!todo) {
//       return;
//     }

//     todo.setCompleted();
//   }

//   getActive(): Array<Todo> {
//     return this.items.filter((item) => item.isActive());
//   }

//   getCompleted(): Array<Todo> {
//     return this.items.filter((item) => item.isCompleted());
//   }

//   getAll(): Array<Todo> {
//     return this.items;
//   }

//   getBy(id: number): Todo | undefined {
//     return this.items.find((item) => item.getId() == id);
//   }
// }
