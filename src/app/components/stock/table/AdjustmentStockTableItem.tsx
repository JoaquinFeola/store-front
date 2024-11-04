import { AdjustmentStock, StockAdjustmentTypeId } from "@/interfaces";
import { TableRow, TableCell } from "@/ui/components";



interface Props {
    adjustmentStock: AdjustmentStock;
}

export const AdjustmentStockTableItem = ({ adjustmentStock }: Props) => {
    return (
        <TableRow>
            <TableCell align="left">
                {adjustmentStock.id}
            </TableCell>
            <TableCell align="left">
                {adjustmentStock.productId}
            </TableCell>
            <TableCell align="left">
                {StockAdjustmentTypeId[adjustmentStock.stockAdjustmentTypeId]}
            </TableCell>
            <TableCell align="left">
                {adjustmentStock.quantity}
            </TableCell>
            <TableCell align="left">
                {adjustmentStock.motive}
            </TableCell>
        </TableRow>
    )
}
