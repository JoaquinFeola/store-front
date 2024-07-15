import { Link } from "react-router-dom"
import { Button, TableCell, TableRow } from "../../ui/components"
import { Stock } from "../../interfaces/stock.interfaces"
import { useContext } from "react"
import { ModalsContext } from "../../context"



interface StockTableItemProps {
    stock: Stock
}

export const StockTableItem = ({ stock }: StockTableItemProps) => {
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
                    stock.product.barCodes?.length === 0
                        ? 'Sin códigos de barras'
                        : stock.product.barCodes?.slice(0, 2).map((bc, i) =>
                            <div key={`${bc.code}${i}`} className="bg-slate-100 px-2 py-1 rounded-md">
                                {bc.code}
                            </div>
                        )
                }
                {
                    (stock.product.barCodes !== undefined)
                    && (stock.product.barCodes.length > 2)
                    && <Link to={`product/${stock.product.id}`} className="text-blue-500 hover:underline">Ver mas...</Link>
                }
                </div>
            </TableCell>
            <TableCell align="left">
                {stock.quantity}
            </TableCell>
            <TableCell align="left">
                <Button className="rounded-sm">
                    <Link
                        to={`/products/edit/${stock.id}`}
                    >
                        <i className="bi bi-pencil-square"></i>
                    </Link>
                </Button>

            </TableCell>
        </TableRow >
    )
}
