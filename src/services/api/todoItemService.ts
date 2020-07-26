import { TodoItem } from "@/models/TodoItem";

export async function addItem(item: TodoItem): Promise<TodoItem> {
  const response: Response = await fetch("/api/item", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
  return response.status === 201 ? await response.json() : {};
}

export async function deleteItem(id: string): Promise<TodoItem> {
  const response: Response = await fetch(`/api/item/${id}`, {
    method: "DELETE",
  });
  return response.status === 200 ? await response.json() : {};
}

export async function updateItem(
  id: string,
  item: TodoItem,
): Promise<TodoItem> {
  const response: Response = await fetch(`/api/item/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
  return response.status === 200 ? await response.json() : {};
}
