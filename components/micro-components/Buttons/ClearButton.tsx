import {ClearButtonProps} from "../../../types/props.types"

export function ClearButton({onClick}: ClearButtonProps) {
    return <button
        className="bg-purple-200 px-2 py-1 text-md mt-1"
        onClick={onClick}
    >
        Clear all
    </button>
}