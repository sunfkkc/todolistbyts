import React, { useCallback, useRef, useState } from "react";
import styled from "styled-components";

function TodoInsert({ addTodo, isLoading }: Props) {
  const [title, setTitle] = useState("");

  const onChange = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(evt.target.value);
  }, []);

  const onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    addTodo(title);
    setTitle("");
  };

  return (
    <TodoInsertContainer>
      <TodoInsertForm onSubmit={onSubmit}>
        <TodoInputBox
          placeholder={isLoading ? "Loading..." : "할 일을 입력하세요"}
          onChange={onChange}
          value={title}
          readOnly={isLoading}
        />
        <SubmitBtn type="submit">제출</SubmitBtn>
      </TodoInsertForm>
    </TodoInsertContainer>
  );
}

export default React.memo(TodoInsert);

const TodoInsertContainer = styled.div`
  width: 600px;
  height: 100px;
  background: aliceblue;
  display: flex;
`;

const TodoInsertForm = styled.form`
  width: 500px;
  height: 60px;
  margin: auto;
  display: flex;
`;

const TodoInputBox = styled.input`
  flex: 1;
`;
const SubmitBtn = styled.button`
  width: 60px;
`;

interface Props {
  addTodo: (title: string) => void;
  isLoading: boolean;
}
