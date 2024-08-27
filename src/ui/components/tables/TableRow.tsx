import { ReactNode, ThHTMLAttributes } from "react"


interface TableRowProps extends ThHTMLAttributes<HTMLTableRowElement> {
  children: ReactNode;
  size?: 'normal' | 'little'
}

export const TableRow = ({ children, className, size, ...attr }: TableRowProps) => {





  return (
    <tr className={`${className} hover:bg-slate-200 transition-all duration-200 ${(size === undefined) ? '' : '*:py-1 *:px-3'}`} {...attr}>
      {children}
    </tr>
  )
}
