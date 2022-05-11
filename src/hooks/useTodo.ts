export interface TodoMethods {
  deleteTodo: (id: Number) => void;
  clickCkb: (id: Number) => void;
  clickChangeBtn: (id: Number) => void;
  changeTodoTitle: (id: Number, title: string) => void;
}
