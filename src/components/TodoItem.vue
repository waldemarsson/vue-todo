<template>
  <li class="item">
    <input type="checkbox" :checked="checked" @click="setChecked" />
    <div class="item__name">{{ name }}</div>
    <button class="btn btn--delete" type="button" @click="deleteItem">
      X
    </button>
  </li>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import Component from "vue-class-component";
import { TodoItem } from "@/models/TodoItem";
import * as ItemService from "@/services/api/todoItemService";

const TodoItemProps = Vue.extend({
  props: {
    todoItem: Object as PropType<TodoItem>,
  },
});

@Component
export default class TodoItemComponent extends TodoItemProps {
  item: TodoItem = this.todoItem;
  get checked(): boolean {
    return this.item.checked;
  }
  get name(): string {
    return this.item.name;
  }

  async setChecked(): Promise<void> {
    if (this.item._id) {
      const result: TodoItem = await ItemService.updateItem(this.item._id, {
        ...this.item,
        checked: !this.item.checked,
      });
      if (result) {
        this.item = result;
      }
    }
  }

  async deleteItem(): Promise<void> {
    if (this.item._id) {
      const deletedItem = await ItemService.deleteItem(this.item._id);
      if (deletedItem) {
        this.$emit("update-list");
      }
    }
  }
}
</script>

<style lang="less" scoped>
.item {
  list-style: none;
  display: flex;
  justify-content: space-between;
  padding: 1rem 0.5rem;
  border-bottom: 0.0625rem solid black;

  &__name {
    text-align: left;
    flex-flow: 1;
    width: 100%;
    padding-left: 0.5rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
}
</style>
