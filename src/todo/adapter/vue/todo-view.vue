<script lang="ts">

import { defineComponent } from 'vue'
import { InMemoryTodoRepository } from '../in.memory.todo.repository';
import { TodoUsecaseFactory } from '../../usecase/usecase'
import type { TodoDto } from '../../usecase/list.todo.usecase'

const EmptyTodo: TodoDto = {
  id: 0,
  title: '',
  completed: false,
  visibility: false,
};

export default defineComponent({
  data: () => {
    const repo = new InMemoryTodoRepository();
    const factory = TodoUsecaseFactory(repo);

    return {
      factory,
      todos: new Array<TodoDto>(),
      visibility: 'all',
      editedTodo: EmptyTodo,
      beforeEditCache: '',
    };
  },

  mounted() {
    window.addEventListener('hashchange', this.onHashChange)
    this.onHashChange()

    this.loadTodos();
  },

  computed: {
    total(): number {
      if (this.visibility === 'all') {
        return this.todos.length;
      }

      return this.total;
    },

    remaining(): number {
      if (this.visibility !== 'completed') {
        return this.todos.filter(t => !t.completed).length;
      }

      return this.remaining;
    },
  },

  methods: {
    toggleAll(e: any): void {
      const isCompleted = !e.target.checked;
      const usecase = isCompleted ? 'activateTodo' : 'completeTodo';

      this.todos.forEach((todo) => {
        this.factory[usecase].execute({ id: todo.id });
      });

      this.loadTodos();
    },

    loadTodos() {
      const visibility = this.visibility;
      const { todos } = this.factory.listTodo.execute({ filter: visibility });
      this.todos = todos;
    },

    addTodo(e: any) {
      const input = {
        desc: e.target.value.trim(),
      };
      this.factory.createTodo.execute(input);

      e.target.value = ''

      this.loadTodos();
    },

    removeTodo(todo: TodoDto) {
      this.factory.removeTodo.execute({ id: todo.id });
      this.loadTodos();
    },

    updateStatus(todo: TodoDto) {
      if (!todo.completed) {
        this.factory.completeTodo.execute({ id: todo.id });
      } else {
        this.factory.activateTodo.execute({ id: todo.id });
      }

      this.loadTodos();
    },

    editTodo(todo: TodoDto) {
      this.beforeEditCache = todo.title
      this.editedTodo = todo
    },

    doneEdit(todo: TodoDto) {
      if (!this.editedTodo) {
        return
      }

      this.editedTodo = EmptyTodo
      const title = todo.title.trim()

      if (title) {
        this.factory.updateTodoDesc.execute({ id: todo.id, desc: title });
      } else {
        this.factory.removeTodo.execute({ id: todo.id });
      }

      this.loadTodos();
    },

    cancelEdit(todo: TodoDto) {
      this.editedTodo = EmptyTodo
      todo.title = this.beforeEditCache
    },

    removeCompleted() {
      this.todos
        .filter((todo) => todo.completed)
        .forEach((todo) => {
          this.factory.removeTodo.execute({ id: todo.id });
        });
      this.loadTodos();
    },

    onHashChange() {
      var visibility = window.location.hash.replace(/#\/?/, '')

      if (visibility) {
        this.visibility = visibility
      }

      this.loadTodos();
    }
  }
})

</script>
<template>
  <section class="todoapp">
    <header class="header">
      <h1>todos</h1>
      <input
        class="new-todo"
        autofocus
        placeholder="What needs to be done?"
        @keyup.enter="addTodo"
      >
    </header>
    <section class="main" v-show="total">
      <input
        id="toggle-all"
        class="toggle-all"
        type="checkbox"
        :checked="remaining === 0"
        @change="toggleAll"
      >
      <label for="toggle-all">Mark all as complete</label>
      <ul class="todo-list">
        <li
          v-for="todo in todos"
          class="todo"
          :key="todo.id"
          :class="{ completed: todo.completed, editing: todo === editedTodo }"
        >
          <div class="view">
            <input class="toggle" type="checkbox" :checked="todo.completed" @click="updateStatus(todo)">
            <label @dblclick="editTodo(todo)">{{ todo.title }}</label>
            <button class="destroy" @click="removeTodo(todo)"></button>
          </div>
          <input
            v-if="todo === editedTodo"
            class="edit"
            type="text"
            v-model="todo.title"
            @vnode-mounted="(node: any) => node.el.focus()"
            @blur="doneEdit(todo)"
            @keyup.enter="doneEdit(todo)"
            @keyup.escape="cancelEdit(todo)"
          >
        </li>
      </ul>
    </section>
    <footer class="footer" v-show="total">
      <span class="todo-count">
        <strong>{{ remaining }}</strong>
        <span>{{ remaining === 1 ? ' item' : ' items' }} left</span>
      </span>
      <ul class="filters">
        <li>
          <a href="#/all" :class="{ selected: visibility === 'all' }">All</a>
        </li>
        <li>
          <a href="#/active" :class="{ selected: visibility === 'active' }">Active</a>
        </li>
        <li>
          <a href="#/completed" :class="{ selected: visibility === 'completed' }">Completed</a>
        </li>
      </ul>
      <button class="clear-completed" @click="removeCompleted" v-show="total > remaining && visibility !== 'active'">
        Clear completed
      </button>
    </footer>
  </section>
</template>

<style>
@import "https://unpkg.com/todomvc-app-css@2.4.1/index.css";
</style>