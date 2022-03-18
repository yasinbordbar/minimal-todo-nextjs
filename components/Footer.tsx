import {FooterProps} from "../types/props.types"

export function Footer({text}: FooterProps) {
    return <footer className="flex items-center justify-center w-4/5 h-24 border-t mt-12">
        <a
            className="flex items-center justify-center font-mono"
            href="https://github.com/yasinbordbar"
            target="_blank"
            rel="noopener noreferrer"
        >
            {text}
        </a>
    </footer>
}