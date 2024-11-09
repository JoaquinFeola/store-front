import {  Stock } from "@/interfaces"
import { TableRow, TableCell, Button, Tooltip } from "@/ui/components"
import { TextBadge } from "@/ui/components/alerts/TextBadge"
import {  useMemo } from 'react';




interface Props {
    stock: Stock
}




export const StockTableItem = ({ stock }: Props) => {

    const twoBarcodes = useMemo(() => stock.product.barCodes?.slice(0, 2), [stock]) || [];
    const restBarcodes = useMemo(() => stock.product.barCodes?.slice(2, stock.product.barCodes.length), [stock]) || [];

    const barcodes = stock.product.barCodes?.map((code) => code.code) || []

    return (
        <TableRow className="border-b-[1px] last:border-b-transparent max-h-20 h-20 min-h-20">
            <TableCell className="font-medium">
                {stock.id}
            </TableCell>
            <TableCell className="font-medium">
                {stock.product.id}
            </TableCell>
            <TableCell align="left">
                {stock.product.sku}
            </TableCell>
            <TableCell align="left">
                <div className="flex gap-3 items-center">
                    {
                        (stock.product.barCodes?.length === 0)
                            ? 'Sin códigos de barras'
                            : twoBarcodes.map((bc, i) =>
                                <TextBadge
                                    text={bc.code}
                                    key={i}
                                />
                            )
                    }
                    {
                        (stock.product.barCodes !== undefined && stock.product.barCodes.length > 2)
                        && (
                            <Tooltip title={barcodes.join(', ')}>
                                <Button  style={{ color: "#3b82f6" }} className="bg-transparent  hover:bg-transparent hover:underline">{restBarcodes.length} más...</Button>
                            </Tooltip>
                        )
                    }
                </div>
            </TableCell>
            <TableCell align="left">
                {stock.quantity}
            </TableCell>
        </TableRow >
    )
}
