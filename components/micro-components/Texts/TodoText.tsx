import {TodoTextProps} from "../../../types/props.types"

export function TodoText({onClick, item}: TodoTextProps) {
    return <p

        className="py-3 border border-gray-200 pl-3 text-lg "
        onClick={onClick}
    >
        {item.message}
    </p>
}