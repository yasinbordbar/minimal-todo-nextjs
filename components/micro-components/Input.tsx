import {InputProps} from "../../types/props.types"

export function Input({value, onChange, onKeyDown}: InputProps) {
    return <div className="pt-12">
        <input
            placeholder="What needs to be done?"
            type="text"
            value={value}
            className="w-full rounded py-2 px-4 text-gray-900 py-3 border border-gray-300 text-lg"
            onChange={onChange}
            onKeyDown={onKeyDown}
        />
    </div>
}