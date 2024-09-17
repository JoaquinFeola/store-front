import { Link } from "react-router-dom"
import { Button, TableCell, TableRow } from "../../ui/components"
import { Stock } from "../../interfaces/stock.interfaces"
import { FormEvent, useContext } from "react"
import { ModalsContext, StockContext } from "../../context"
import { InputLabel } from "../../ui/components/inputs/InputLabel"



interface StockTableItemProps {
    stock: Stock
}


const ModalFormInput = ({ state }: { state: number }) => {
    return (
        <>
            <InputLabel labelText="Cantidad" min={0} type="number" defaultValue={state} name="quantity" />
            <div className="flex gap-4 mt-3">
                <h3 className="font-medium">Positivo</h3>
                <input type="radio" name="incrementOrDecrement" value={1} defaultChecked />
                <h3 className="font-medium">Negativo</h3>
                <input type="radio" name="incrementOrDecrement" value={2} />

            </div>

        </>
    )
}
export const StockTableItem = ({ stock }: StockTableItemProps) => {
    const { newModal } = useContext(ModalsContext)
    const { adjustStock } = useContext(StockContext)


    const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newQuatity = formData.get('quantity')?.toString();
        const incrementOrDecrement = formData.get('incrementOrDecrement')?.toString();


        if (newQuatity!.length <= 0 || newQuatity === undefined) return;
        adjustStock({
            quantity: parseFloat(newQuatity),
            stockAdjustmentEnum: parseInt(incrementOrDecrement!) as 1 | 2,
            stockId: stock.id
        })
    };


    const handleEditModal = () => {
        newModal({
            title: 'Ajustar el stock',
            submitFunc: onFormSubmit,
            confirmLabel: 'Guardar',
            content: <ModalFormInput state={stock.quantity} />
        })
    }

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
                <Button className="rounded-full bg-transparent hover:bg-slate-100" onClick={handleEditModal}>
                    <i className="bi bi-wrench text-slate-800 text-2xl "></i>
                </Button>

            </TableCell>
        </TableRow >
    )
}
