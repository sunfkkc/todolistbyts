const API_KEY: string = "todos";
export interface todo {
  id: string;
  title: string;
  location: string;
  checked: boolean;
  isChanging: boolean;
}
export class database {
  load() {
    return JSON.parse(localStorage.getItem(API_KEY) || "");
  }
  save(todos: todo[]) {
    localStorage.setItem(API_KEY, JSON.stringify(todos));
  }
}
