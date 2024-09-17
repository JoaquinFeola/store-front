import React, {  TdHTMLAttributes } from "react"

interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
    
}


export const TableCell = React.memo(({ className, ...attr }: TableCellProps) => {
  return (
    <td {...attr} className={`${className} p-4 whitespace-nowrap text-ellipsis`}></td>
  )
})
