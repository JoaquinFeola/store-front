import { AdjustmentStock } from "../../interfaces";
import { TableCell, TableRow } from "../../ui/components"


interface Props {
    adjustmentStock: AdjustmentStock;
}

export const AdjustmentSotckTableItem = ({ adjustmentStock }: Props) => {
    return (
        <TableRow>
            <TableCell align="left">
            </TableCell>
        </TableRow>
    )
}
