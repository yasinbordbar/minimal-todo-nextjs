import {TitleProps} from "../../types/props.types"

export const Title = ({text}: TitleProps) =>
    <div className="pt-12">
        <p className="text-3xl">{text}</p>
    </div>