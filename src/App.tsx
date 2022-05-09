import React, { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";
import Template from "./components/Template";
import TodoInsert from "./components/TodoInsert";
import TodoList from "./components/TodoList";
import { database } from "./model/database";
import { todo } from "./model/todoState";
import { getLocation } from "./model/util";
function App() {
  const [todos, setTodos] = useState<todo[] | []>(database.load());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  let nextId = useMemo(() => {
    try {
      return parseInt(todos[todos.length - 1].id) + 1;
    } catch (err) {
      //todos가 없을 때
      return 0;
    }
  }, [todos]);

  useEffect(() => {
    database.save(todos);
  }, [todos]);

  const addTodo = useCallback(async (title: string) => {
    let location;
    setIsLoading(true);
    try {
      location = await getLocation();
    } catch (err) {
      location = "장소를 알 수 없습니다.";
      setIsLoading(false);
    }

    const todo: todo = {
      id: nextId.toString(),
      title,
      location,
      checked: false,
      isChanging: false,
    };

    setIsLoading(false);
    setTodos((todos) => (todos as todo[]).concat(todo));
    nextId += 1;
  }, []);

  const deleteTodo = useCallback((id: Number) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== String(id)));
  }, []);

  const clickCkb = useCallback((id: Number) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === String(id) ? { ...todo, checked: !todo.checked } : todo
      )
    );
  }, []);

  const clickChangeBtn = useCallback((id: Number) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === String(id)
          ? { ...todo, isChanging: !todo.isChanging }
          : todo
      )
    );
  }, []);

  const changeTodoTitle = useCallback((id: Number, title: string) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === String(id) ? { ...todo, title, isChanging: false } : todo
      )
    );
  }, []);

  return (
    <Template>
      <TodoInsert addTodo={addTodo} isLoading={isLoading} />
      <TodoList
        todos={todos}
        deleteTodo={deleteTodo}
        clickCkb={clickCkb}
        clickChangeBtn={clickChangeBtn}
        changeTodoTitle={changeTodoTitle}
      />
    </Template>
  );
}

export default App;
