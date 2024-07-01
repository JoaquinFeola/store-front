import { HTMLAttributes, ReactNode } from "react"


interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement>{
}

export const TableBody = ({...attr}: TableBodyProps) => {
  return (
    <tbody  {...attr}></tbody>
  )
}
