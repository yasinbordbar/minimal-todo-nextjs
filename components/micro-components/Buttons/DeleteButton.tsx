import {DeleteButtonProps} from "../../../types/props.types"

export function DeleteButton({onClick}: DeleteButtonProps) {
    return <button
        className="bg-red-300  text-md w-1/12 sm:w-1/5 border border-gray-200 "
        onClick={onClick}
    >
        Delete
    </button>
}
