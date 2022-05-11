import React from "react";
import styled from "styled-components";
import { todo } from "../model/todoState";
import TodoItem from "./TodoItem";
import { TodoMethods } from "../hooks/useTodo";

const TodoListBlock = styled.div`
  width: 500px;
  height: 500px;
  margin: auto;
  margin-top: 50px;
  background: aliceblue;
  display: block;
  overflow: auto;
`;
interface Props extends TodoMethods {
  todos: todo[];
}

function TodoList({ todos, ...props }: Props) {
  return (
    <TodoListBlock>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} {...props} />
      ))}
    </TodoListBlock>
  );
}

export default TodoList;
