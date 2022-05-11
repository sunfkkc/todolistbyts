import React, { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import { todo } from "../model/todoState";
import { TodoMethods } from "../hooks/useTodo";
const TodoBlock = styled.div`
  display: flex;
  .isDone {
    text-decoration: line-through;
    color: gray;
  }
  justify-content: center;
  align-items: center;
  padding: 1rem;

  & + & {
    border-top: 1px solid gray;
  }
`;
const DeleteBtn = styled.button`
  margin-left: 0.5rem;
`;
const CheckBox = styled.input``;
const TodoContent = styled.div``;
const ChangeBtn = styled.button`
  margin-left: 0.5rem;
`;
const ChangeInputBox = styled.input``;

interface Props extends TodoMethods {
  todo: todo;
}

function TodoItem({ todo, ...props }: Props) {
  const [newTitle, setNewTitle] = useState<string>(todo.title);
  const onChange = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(evt.target.value);
  }, []);
  return (
    <TodoBlock>
      <CheckBox
        type="checkbox"
        checked={todo.checked}
        onChange={(evt) => {
          props.clickCkb(Number(todo.id));
        }}
      />

      {todo.isChanging ? (
        <ChangeInputBox value={newTitle} onChange={onChange} autoFocus />
      ) : null}

      <TodoContent className={todo.checked ? "isDone" : ""}>
        {todo.isChanging ? "" : todo.title} - {todo.location}
      </TodoContent>

      <ChangeBtn
        onClick={(evt) => {
          if (todo.isChanging) {
            props.changeTodoTitle(Number(todo.id), newTitle);
          } else {
            props.clickChangeBtn(Number(todo.id));
          }
        }}
      >
        수정
      </ChangeBtn>

      <DeleteBtn
        onClick={(evt) => {
          props.deleteTodo(Number(todo.id));
        }}
      >
        삭제
      </DeleteBtn>
    </TodoBlock>
  );
}

export default React.memo(TodoItem);
