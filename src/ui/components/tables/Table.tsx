import React, { ReactNode, TableHTMLAttributes } from "react"


interface TableProps extends TableHTMLAttributes<HTMLTableElement>{
    children: ReactNode;
    autoHeight?: boolean;

}

export const Table = React.memo(({ children, autoHeight=true, ...tableAttr }: TableProps) => {
    return (
        <div className={`${!autoHeight ? tableAttr.className : 'min-h-[500px] ' + tableAttr.className}  overflow-auto  max-h-[calc(100vh-40vh)]  rounded-md border border-gray-100  `}>
            <table {...tableAttr}  className="w-full relative "  >
                {
                    children
                }
            </table>
        </div>

    )
})
