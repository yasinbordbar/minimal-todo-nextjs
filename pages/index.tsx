import Head from "next/head";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function Home() {
  const [todoItem, setTodoItem] = useState("");
  const [items, setItems] = useState([]);

  const handleEnter = (event) => {
    if (event.key === "Enter") {
      handleAdd();
    }
  };

  const handleAdd = () => {
    if (todoItem) {
      setItems([
        {
          id: uuidv4(),
          message: todoItem,
          done: false,
        },
        ...items,
      ]);
      setTodoItem("");
      saveTodoItemsToLocalStorage([
        {
          id: uuidv4(),
          message: todoItem,
          done: false,
        },
        ...items,
      ]);
    }
  };

  const handleDone = (id) => {
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

  const handleDelete = (id) => {
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
    var _items = localStorage.getItem("items");
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
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-1/2 sm:w-4/5 mx-auto">
        <div className="pt-12">
          <p className="text-3xl">Todo List</p>
        </div>

        <div className="pt-12">
          <input
            placeholder="What needs to be done?"
            type="text"
            value={todoItem}
            className="w-full rounded py-2 px-4 text-gray-900 py-3 border border-gray-300 text-lg"
            onChange={(e) => setTodoItem(e.target.value)}
            onKeyDown={handleEnter}
          />
        </div>

        {items !== null && items?.length !== 0 && (
          <button
            className="bg-purple-200 px-2 py-1 text-md mt-1"
            onClick={() => handleDeleteAll()}
          >
            Clear all
          </button>
        )}
        <ul className="pt-12">
          <DragDropContext onDragEnd={handleDragAndDrop}>
            <Droppable droppableId="to-dos">
              {(provided) => (
                <ul {...provided.droppableProps} ref={provided.innerRef}>
                  {items
                    // ?.filter(({ done }) => !done)
                    .map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id.toString()}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <li
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                            {...provided.dragHandleProps}
                            key={item.id}
                            className={
                              snapshot.isDragging ? "selected" : "not-selected"
                            }
                          >
                            {!item.done ? (
                              <p
                                key={item.id}
                                className="py-3 border border-gray-200 pl-3 text-lg "
                                onClick={() => handleDone(item.id)}
                              >
                                {item.message}
                              </p>
                            ) : (
                              <div className="flex flex-row">
                                <p
                                  key={item.id}
                                  className="line-through py-3 border border-gray-200 pl-3 text-lg text-green-500 w-11/12"
                                  onClick={() => handleDone(item.id)}
                                >
                                  {item.message}
                                </p>
                                <button
                                  className="bg-red-300  text-md w-1/12 sm:w-1/5 border border-gray-200 "
                                  onClick={() => handleDelete(item.id)}
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                          </li>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </ul>
      </div>

      <footer className="flex items-center justify-center w-4/5 h-24 border-t mt-12">
        <a
          className="flex items-center justify-center font-mono"
          href="https://github.com/yasinbordbar"
          target="_blank"
          rel="noopener noreferrer"
        >
          Made with ❤ by Yasin Br
        </a>
      </footer>
    </div>
  );
}
