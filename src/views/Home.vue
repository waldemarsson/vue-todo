<template>
  <section class="main">
    <NewListButtonComponent @update-all="updateAll" />
    <section class="container" v-if="!isLoading">
      <article class="list-container" v-for="list in todoLists" :key="list._id">
        <TodoListComponent :todoList="list" @update-all="updateAll" />
      </article>
    </section>
    <section class="loading" v-else>
      <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </section>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import TodoListComponent from "@/components/TodoList.vue";
import NewListButtonComponent from "@/components/NewListButton.vue";
import { TodoList } from "@/models/TodoList";
import * as ListService from "@/services/api/todoListService";

@Component({
  components: {
    TodoListComponent,
    NewListButtonComponent,
  },
})
export default class Home extends Vue {
  lists: TodoList[] | null = null;
  loading = true;

  get todoLists(): TodoList[] | null {
    return this.lists;
  }

  get isLoading(): boolean {
    return this.loading;
  }

  async updateAll(): Promise<void> {
    this.lists = await ListService.getAllLists();
  }

  mounted(): void {
    this.updateAll();
    this.loading = false;
  }
}
</script>

<style lang="less" scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  max-width: 100vw;

  .list-container {
    width: 100%;
    margin: 1rem 0 0.5rem;
    @media screen and (min-width: 415px) {
      margin: 1rem;
      max-width: 350px;
    }
    @media screen and (min-width: 769px) {
      max-width: calc(50vw - 3rem);
    }
    @media screen and (min-width: 1025px) {
      max-width: 400px;
    }
  }
}
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  .lds-ring {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }
  .lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 128px;
    height: 128px;
    margin: 8px;
    border: 8px solid #666;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #666 transparent transparent transparent;
  }
  .lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
  }
  .lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
  }
  .lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
