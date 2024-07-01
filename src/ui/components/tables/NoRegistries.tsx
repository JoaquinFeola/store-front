import { TableCell } from "./TableCell"
import { TableRow } from "./TableRow"

export const NoRegistries = () => {
  return (
    <TableRow><TableCell className="font-medium uppercase text-center text-2xl " colSpan={40}>Sin Registros</TableCell></TableRow>
  )
}
