import { TodoItem } from "./TodoItem"

export interface TodoList {
  _id?: string;
  items: TodoItem[];
  name: string;
}