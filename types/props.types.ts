import {Item, Items} from "./todo.types"

export type TodoListProps = {
    items: Items;
    handleDone: (id: number) => void;
    handleDragAndDrop: (e) => void;
    handleDelete: (id: number) => void;
}

export type TitleProps = {
    text: string;
}

export type InputProps = {
    value: string;
    onChange: (e) => void;
    onKeyDown: (e) => void;
}

export type DoneTextProps = {
    onClick: () => void;
    item: Item;
}

export type TodoTextProps = {
    onClick: () => void;
    item: Item;
}

export type ClearButtonProps = {
    onClick: () => void;
}

export type DeleteButtonProps = {
    onClick: () => void;
}

export type FooterProps = {
    text: string;
}

