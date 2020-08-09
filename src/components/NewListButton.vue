<template>
  <button type="button" class="btn btn--add" @click="addNewList">
    New list
  </button>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import * as ListService from "@/services/api/todoListService";

@Component
export default class NewListButtonComponent extends Vue {
  async addNewList() {
    await ListService.addList();
    this.$emit("update-all");
  }
}
</script>
