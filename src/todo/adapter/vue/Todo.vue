<!-- eslint-disable vue/multi-word-component-names -->
<script>

import { InMemoryTodoRepository } from '../in.memory.todo.repository';
import { TodoUsecaseFactory } from '../../usecase/usecase'

export default {
  data: () => {
    const repo = new InMemoryTodoRepository();
    const factory = TodoUsecaseFactory(repo);
    const { todos } = factory.listTodo.execute();

    return {
      factory,
      todos,
      visibility: 'all',
      editedTodo: null,
    };
  },

  mounted() {
    window.addEventListener('hashchange', this.onHashChange)
    this.onHashChange()
  },

  computed: {
    total() {
      if (this.visibility === 'all') {
        return this.todos.length;
      }

      return this.total;
    },

    remaining() {
      if (this.visibility !== 'completed') {
        return this.todos.filter(t => !t.completed).length;
      }

      return this.remaining;
    },
  },

  methods: {
    toggleAll(e) {
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
      console.log(todos);
      this.todos = todos;
    },

    addTodo(e) {
      const input = {
        desc: e.target.value.trim(),
      };
      this.factory.createTodo.execute(input);

      e.target.value = ''

      this.loadTodos();
    },

    removeTodo(todo) {
      this.factory.removeTodo.execute({ id: todo.id });
      this.loadTodos();
    },

    updateStatus(todo) {
      if (!todo.completed) {
        this.factory.completeTodo.execute({ id: todo.id });
      } else {
        this.factory.activateTodo.execute({ id: todo.id });
      }

      this.loadTodos();
    },

    editTodo(todo) {
      this.beforeEditCache = todo.title
      this.editedTodo = todo
    },

    doneEdit(todo) {
      if (!this.editedTodo) {
        return
      }

      this.editedTodo = null
      const title = todo.title.trim()

      if (title) {
        this.factory.updateTodoDesc.execute({ id: todo.id, desc: title });
      } else {
        this.factory.removeTodo.execute({ id: todo.id });
      }

      this.loadTodos();
    },

    cancelEdit(todo) {
      this.editedTodo = null
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
}
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
            <button class="destroy" @click="removeTodo(todo)">X</button>
          </div>
          <input
            v-if="todo === editedTodo"
            class="edit"
            type="text"
            v-model="todo.title"
            @vnode-mounted="({ el }) => el.focus()"
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
      <button class="clear-completed" @click="removeCompleted" v-show="total > remaining & visibility !== 'active'">
        Clear completed
      </button>
    </footer>
  </section>
</template>

<style>
@import "https://unpkg.com/todomvc-app-css@2.4.1/index.css";
</style>