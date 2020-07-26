<template>
  <button type="button" class="new-list" @click="addNewList">
    New list
  </button>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import * as ListService from "@/services/api/todoListService";

@Component
export default class NewListButtonComponent extends Vue {
  addNewList() {
    ListService.addList();
    this.$emit("update-all");
  }
}
</script>

<style lang="less" scoped>
button {
  cursor: pointer;
  margin-top: 1rem;
  border: none;
  border-radius: 10px;
  font-size: 1.5rem;
  font-weight: bold;
  height: 50px;
  width: 350px;
  background-color: lightgreen;

  &:hover {
    background-color: rgb(104, 218, 104);
  }
}
</style>
