import { useNavigate } from "react-router-dom"
import { Sale } from "../../interfaces"
import { formatDate } from "../../plugins/momentFormat.plugin"
import { Button, TableCell, TableRow } from "../../ui/components"
import { formatCurrency } from "../../utils/currency.util"




export const SaleTableItem = ({ sale }: { sale: Sale }) => {

    const navigate = useNavigate()
    return (
        <TableRow className="border-b-[1px] last:border-b-transparent">
            <TableCell className="font-medium" align="left">{sale?.id}</TableCell>
            <TableCell align="center">{formatDate(sale.created, 'DD-MM-YYYY hh:mm')}</TableCell>
            <TableCell align="center">{formatCurrency(sale.total, 'ARS')}</TableCell>
            <TableCell align="center">{sale?.paymentType.name}</TableCell>
            <TableCell align="center" >
                <span className={`${sale?.isActive ? 'text-green-600' : 'text-red-600'}`}>{sale?.isActive ? 'Activo' : 'Inactivo'}</span>
                {/* <div className={`${category.isActive ? 'bg-green-400' : 'bg-red-400'} w-[15px] shadow-md h-[15px] rounded-full `}></div> */}
            </TableCell>
            <TableCell align="center">
                <Button onClick={() => navigate(`${sale.id}`)} className="rounded-full px-3 bg-transparent  hover:bg-slate-100 " >
                    <i style={{ color: 'black' }} className="bi bi-search text-inherit text-black"></i>
                </Button>
            </TableCell>
        </TableRow>
    )
}
