import { todo } from "./todoState";
const API_KEY: string = "todos";

export class database {
  static load(): todo[] {
    return JSON.parse(localStorage.getItem(API_KEY) || JSON.stringify([]));
  }

  static save(todos: todo[]) {
    localStorage.setItem(API_KEY, JSON.stringify(todos));
  }
}
