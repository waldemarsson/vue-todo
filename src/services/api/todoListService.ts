import { TodoList } from "@/models/TodoList";

export async function getAllLists(): Promise<TodoList[]> {
  const response: Response = await fetch("/api/lists");
  return response.status === 200 ? await response.json() : [];
}

export async function getList(id: string): Promise<TodoList> {
  const response: Response = await fetch(`/api/list/${id}`);
  return response.status === 200 ? await response.json() : {};
}

export async function updateList(
  id: string,
  list: TodoList,
): Promise<TodoList> {
  const response: Response = await fetch(`/api/list/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(list),
  });
  return response.status === 200 ? await response.json() : {};
}

export async function deleteList(id: string): Promise<TodoList> {
  const response: Response = await fetch(`/api/list/${id}`, {
    method: "DELETE",
  });
  return response.status === 200 ? await response.json() : {};
}

export async function addList(): Promise<TodoList> {
  const defaultList: TodoList = { name: "List", items: [] };
  const response: Response = await fetch("/api/list", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(defaultList),
  });
  return response.status === 201 ? await response.json() : {};
}
