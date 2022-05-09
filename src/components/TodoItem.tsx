import React, { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import { todo } from "../model/todoState";

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

interface Props {
  todo: todo;
  deleteTodo: (id: Number) => void;
  clickCkb: (id: Number) => void;
  clickChangeBtn: (id: Number) => void;
  changeTodoTitle: (id: Number, title: string) => void;
}

function TodoItem({
  todo,
  deleteTodo,
  clickCkb,
  clickChangeBtn,
  changeTodoTitle,
}: Props) {
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
          clickCkb(Number(todo.id));
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
            changeTodoTitle(Number(todo.id), newTitle);
          } else {
            clickChangeBtn(Number(todo.id));
          }
        }}
      >
        수정
      </ChangeBtn>

      <DeleteBtn
        onClick={(evt) => {
          deleteTodo(Number(todo.id));
        }}
      >
        삭제
      </DeleteBtn>
    </TodoBlock>
  );
}

export default React.memo(TodoItem);
{
}
