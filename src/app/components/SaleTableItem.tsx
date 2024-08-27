import { Sale } from "../../interfaces"
import { formatDate } from "../../plugins/momentFormat.plugin"
import { Button, TableCell, TableRow } from "../../ui/components"
import { formatCurrency } from "../../utils/currency.util"




export const SaleTableItem = ({ sale }: { sale: Sale }) => {

    const saleCreatedAt = sale?.salesDetail?.map(detail => formatDate(detail.created, 'DD-MM-YYYY HH:mm'));

    return (
        <TableRow className="border-b-[1px] last:border-b-transparent">
            <TableCell className="font-medium" align="left">{sale?.id}</TableCell>
            <TableCell align="center">{saleCreatedAt}</TableCell>
            <TableCell align="center">{formatCurrency(sale.total, 'ARS')}</TableCell>
            <TableCell align="center">{sale?.paymentType.name}</TableCell>
            <TableCell align="center">
                <Button className="rounded-full px-3 bg-transparent  hover:bg-slate-100 " >
                    <i style={{ color: 'black' }} className="bi bi-search text-inherit text-black"></i>
                </Button>
            </TableCell>
        </TableRow>
    )
}
