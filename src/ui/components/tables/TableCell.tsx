import {  TdHTMLAttributes } from "react"

interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
    
}


export const TableCell = ({ className, ...attr }: TableCellProps) => {
  return (
    <td {...attr} className={`${className} p-4 whitespace-nowrap text-ellipsis`}></td>
  )
}
