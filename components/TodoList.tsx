import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {TodoText} from "./micro-components/Texts/TodoText"
import {DoneText} from "./micro-components/Texts/DoneText"
import {DeleteButton} from "./micro-components/Buttons/DeleteButton"
import {TodoListProps} from "../types/props.types"

export const TodoList = ({ items, handleDone, handleDragAndDrop, handleDelete}: TodoListProps) =>
    <div className="pt-12">
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
                                                <TodoText key={item.id} onClick={() => handleDone(item.id)}
                                                          item={item}/>
                                            ) : (
                                                <div className="flex flex-row">
                                                    <DoneText key={item.id} onClick={() => handleDone(item.id)}
                                                              item={item}/>
                                                    <DeleteButton onClick={() => handleDelete(item.id)}/>
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
    </div>
