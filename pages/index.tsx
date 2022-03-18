import Head from "next/head";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import {Footer} from "../components/Footer"
import {Item, Items} from "../types/todo.types"
import {TodoList} from "../components/TodoList"
import {Title} from "../components/micro-components/Title"
import {Input} from "../components/micro-components/Input"
import {ClearButton} from "../components/micro-components/Buttons/ClearButton"

const Home = () => {
  const [todoItem, setTodoItem] = useState<string>("");
  const [items, setItems] = useState<Items>([]);

  const handleEnter = (event) => {
    if (event.key === "Enter") {
      handleAdd();
    }
  };

  const handleAdd = () => {
    let item: Item = {
          id: uuidv4(),
          message: todoItem,
          done: false,
    };

    if (todoItem) {
      setItems([item,
        ...items,
      ]);
      setTodoItem("");
      saveTodoItemsToLocalStorage([
        item,
        ...items,
      ]);
    }
  };

  const handleDone = (id: number): void => {
    const _items = items.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          done: !item.done,
        };
      }

      return item;
    });

    setItems(_items);
    saveTodoItemsToLocalStorage(_items);
  };

  const handleDelete = (id: number): void => {
    const _items = items.filter((item) => item.id !== id);

    setItems(_items);
    saveTodoItemsToLocalStorage(_items);
  };

  const handleDeleteAll = () => {
    const _items = [];

    setItems(_items);
    saveTodoItemsToLocalStorage(_items);
  };

  const saveTodoItemsToLocalStorage = (data) =>
    localStorage.setItem("items", JSON.stringify(data));

  const getTodoItemsToLocalStorage = () => {
    let _items = localStorage.getItem("items");
    if (_items == null) {
      setItems([]);
    } else {
      setItems(JSON.parse(_items));
    }
  };

  const handleDragAndDrop = (result) => {
    if (!result.destination) return; //exit the function if null.

    const _items = [...items];
    const [reorderedItem] = _items.splice(result.source.index, 1);
    _items.splice(result.destination.index, 0, reorderedItem);
    setItems(_items);
    saveTodoItemsToLocalStorage(_items);
  };

  useEffect(() => {
    getTodoItemsToLocalStorage();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Minimal Todo App</title>
        <link rel="icon" href="../public/favicon.ico"/>
      </Head>

      <div className="w-1/2 sm:w-4/5 mx-auto">
        <Title text="Todo List"/>

        <Input value={todoItem} onChange={(e) => setTodoItem(e.target.value)} onKeyDown={handleEnter}/>

        {items !== null && items?.length !== 0 && (
            <ClearButton onClick={() => handleDeleteAll()}/>
        )}

        <TodoList handleDone={handleDone} items={items} handleDragAndDrop={handleDragAndDrop}
                  handleDelete={handleDelete}/>
      </div>

      <Footer text="Made with ❤ by Yasin Br"/>
    </div>
  );
}
export default Home;