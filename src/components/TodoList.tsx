import React from "react";
import styled from "styled-components";
import { todo } from "../model/todoState";
import TodoItem from "./TodoItem";

const TodoListBlock = styled.div`
  width: 500px;
  height: 500px;
  margin: auto;
  margin-top: 50px;
  background: aliceblue;
  display: block;
  overflow: auto;
`;
interface Props {
  todos: todo[];
  deleteTodo: (id: Number) => void;
  clickCkb: (id: Number) => void;
  clickChangeBtn: (id: Number) => void;
  changeTodoTitle: (id: Number, title: string) => void;
}
function TodoList({
  todos,
  deleteTodo,
  clickCkb,
  clickChangeBtn,
  changeTodoTitle,
}: Props) {
  return (
    <TodoListBlock>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          deleteTodo={deleteTodo}
          clickCkb={clickCkb}
          clickChangeBtn={clickChangeBtn}
          changeTodoTitle={changeTodoTitle}
        />
      ))}
    </TodoListBlock>
  );
}

export default TodoList;
