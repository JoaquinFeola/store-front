import { ReactNode, TableHTMLAttributes } from "react"


interface TableProps extends TableHTMLAttributes<HTMLTableElement>{
    children: ReactNode;

}

export const Table = ({ children, ...tableAttr }: TableProps) => {
    return (
        <div className={` overflow-auto min-h-[500px] max-h-[calc(100vh-40vh)] rounded-md border border-gray-100 ${tableAttr.className}`}>
            <table {...tableAttr}  className="w-full relative "  >
                {
                    children
                }
            </table>
        </div>

    )
}
