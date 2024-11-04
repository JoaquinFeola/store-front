import { Stock } from "@/interfaces"
import { TableRow, TableCell } from "@/ui/components"
import { Link } from "react-router-dom"




interface Props {
    stock: Stock
}


export const StockTableItem = ({ stock }: Props) => {
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
                        && <Link to={`/products/${stock.product.id}`} className="text-blue-500 hover:underline">Ver mas...</Link>
                    }
                </div>
            </TableCell>
            <TableCell align="left">
                {stock.quantity}
            </TableCell>
        </TableRow >
    )
}
