import {DoneTextProps} from "../../../types/props.types"

export function DoneText({onClick, item}: DoneTextProps) {
    return <p

        className="line-through py-3 border border-gray-200 pl-3 text-lg text-green-500 w-11/12"
        onClick={onClick}
    >
        {item.message}
    </p>
}