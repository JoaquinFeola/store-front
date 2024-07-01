import { ReactNode } from "react"

interface TableHeadProps {
    children: ReactNode
}


export const TableHead = ({ children }: TableHeadProps) => {
    return (
        <thead className="*:font-bold relative *:text-lg *:border-b-[1px] hover:*:bg-white">
            {children}
        </thead>
    )
}
