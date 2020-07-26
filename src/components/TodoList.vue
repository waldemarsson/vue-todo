<template>
  <section class="list">
    <header>
      <div class="name-container" v-if="!isListNameEditable">
        <h2 @click="listNameEdit = !listNameEdit">
          {{ getName() }}
        </h2>
        <button type="button" class="delete-list" @click="deleteList">X</button>
      </div>
      <div class="input-container input-container--list-name" v-else>
        <input
          type="text"
          maxlength="64"
          minlength="1"
          :placeholder="getName()"
          v-on:keyup.enter="changeListName"
          v-model="listNameModel"
          v-on:keydown="(e) => preventWhitespace(e)"
        />
        <button type="button" @click="changeListName">Change</button>
      </div>
    </header>
    <hr />
    <ul v-for="item in items" :key="item._id">
      <TodoItemComponent :todoItem="item" @update-list="updateList" />
    </ul>
    <div class="input-container">
      <input
        type="text"
        maxlength="64"
        minlength="1"
        placeholder="New item?"
        v-model="newItemModel"
        v-on:keyup.enter="addItem"
        v-on:keydown="(e) => preventWhitespace(e)"
      />
      <button type="button" @click="addItem">Add</button>
    </div>
  </section>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import Component from "vue-class-component";
import TodoItemComponent from "@/components/TodoItem.vue";
import { TodoList } from "@/models/TodoList";
import { TodoItem } from "@/models/TodoItem";
import * as ItemService from "@/services/api/todoItemService";
import * as ListService from "@/services/api/todoListService";

const TodoListProps = Vue.extend({
  props: {
    todoList: Object as PropType<TodoList>,
  },
});

@Component({
  components: {
    TodoItemComponent,
  },
})
export default class TodoListComponent extends TodoListProps {
  newItemModel = "";
  list: TodoList = this.todoList;
  listNameEdit = false;
  listNameModel = this.todoList.name;

  get items(): TodoItem[] {
    return this.list.items;
  }
  get isListNameEditable() {
    return this.listNameEdit;
  }
  getName(): string {
    return this.list.name;
  }

  preventWhitespace(e: KeyboardEvent): void {
    if (
      (e.target as HTMLInputElement).value.endsWith(" ") &&
      e.code === "Space"
    ) {
      e.preventDefault();
    }
  }

  async addItem(): Promise<void> {
    if (this.newItemModel.length > 0 && this.todoList._id) {
      const newItem: TodoItem = await ItemService.addItem({
        list: this.todoList._id,
        name: this.newItemModel.trim(),
        checked: false,
      });
      if (newItem) {
        this.updateList();
        this.newItemModel = "";
      }
    }
  }

  async updateList(): Promise<void> {
    if (this.todoList._id) {
      const updatedList: TodoList = await ListService.getList(
        this.todoList._id,
      );
      if (updatedList) {
        this.list = updatedList;
      }
    }
  }
  async changeListName(): Promise<void> {
    if (this.listNameModel.length > 0 && this.todoList._id) {
      const updatedList: TodoList = await ListService.updateList(
        this.todoList._id,
        { ...this.list, name: this.listNameModel.trim() },
      );
      if (updatedList) {
        this.list.name = updatedList.name;
        this.listNameEdit = false;
      }
    }
  }
  async deleteList(): Promise<void> {
    if (this.todoList._id) {
      const result: TodoList = await ListService.deleteList(this.todoList._id);
      if (result) {
        this.$emit("update-all");
      }
    }
  }
}
</script>

<style lang="less" scoped>
.list {
  background-color: lightgray;
  border: 4px solid gray;
  padding: 1rem;
  border-radius: 10px;

  header {
    .name-container {
      display: flex;
      justify-content: center;
      position: relative;
      h2 {
        width: 100%;
        margin: 0.5rem;
        text-align: center;
        cursor: pointer;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      .delete-list {
        cursor: pointer;
        position: absolute;
        right: 0;
        border-radius: 5px;
        border: none;
        font-size: 2rem;
        font-weight: bold;
        color: red;
      }
    }
  }
  hr {
    margin-bottom: 0;
  }
  ul {
    margin: 0;
    padding: 0;
  }
  .input-container {
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 1.5rem;
    input {
      flex-grow: 1;
      height: 100%;
      width: 100%;
      border: 0;
      text-indent: 0.5rem;
      margin: 0;
      padding: 0;
    }
    button {
      height: 100%;
      width: 4rem;
      margin: 0;
      padding: 0;
      border: 0;
      color: white;
      background-color: darkslategray;
      cursor: pointer;

      &:hover {
        background-color: slategrey;
      }
    }
    &--list-name {
      padding: 1rem 0;
    }
  }
}
</style>
