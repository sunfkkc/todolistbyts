import React, { useEffect, useMemo, useRef, useState } from "react";
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

  const addTodo = async (title: string) => {
    //const location: any = await getLocation();
    setIsLoading(true);
    const todo: todo = {
      id: nextId.toString(),
      title,
      location: await getLocation(),
      checked: false,
      isChanging: false,
    };
    setIsLoading(false);
    /**
     * setTodos([...todos],todo) //오류 발생 왜??
     */
    const newTodos: todo[] = [];
    setTodos(newTodos.concat(todos).concat(todo));
    nextId += 1;
  };

  return (
    <Template>
      <TodoInsert addTodo={addTodo} isLoading={isLoading} />
      <TodoList />
    </Template>
  );
}

export default App;
