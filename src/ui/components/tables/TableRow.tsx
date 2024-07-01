import {  ReactNode, ThHTMLAttributes } from "react"


interface TableRowProps extends ThHTMLAttributes<HTMLTableRowElement>{
    children: ReactNode;
    
}

export const TableRow = ({ children, className, ...attr }: TableRowProps) => {
  return (
    <tr className={`${className} hover:bg-slate-200 transition-all duration-200`} {...attr}>
        {children}
    </tr>
  )
}
